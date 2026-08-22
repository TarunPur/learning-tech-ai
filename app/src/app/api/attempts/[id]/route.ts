import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { assertMasked, UnmaskedPayloadError } from "@/lib/pii-guard";
import { parseJson, patchAttemptSchema } from "@/lib/api-validation";
import { logEvent } from "@/lib/events";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = await parseJson(request, patchAttemptSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    assertMasked({
      recipient_masked: body.recipient_masked,
      ask: body.ask,
      context_masked: body.context_masked,
      draft_text_masked: body.draft_text_masked,
      custom_task_masked: body.custom_task_masked,
    });
  } catch (e) {
    if (e instanceof UnmaskedPayloadError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }

  // help_requests/ai_turns are event-only (ANALYTICS-001) — the attempts
  // table has no such columns, so they must never reach .update().
  const { help_requests, ai_turns, ...attemptColumns } = body;

  const { data, error, count } = await supabase
    .from("attempts")
    .update(attemptColumns, { count: "exact" })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("attempt_type, started_at, completed_at")
    .maybeSingle();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!count || !data) {
    return NextResponse.json({ error: "attempt not found" }, { status: 404 });
  }

  // ANALYTICS-001 (PRD §14): this PATCH is "completion" exactly when it's
  // the one that sets completed_at (handleSave() in the client) — never
  // fire draft_completed/unaided_completed for the intermediate detail/path
  // patches that happen earlier in the same attempt. Round 3: a Save retry
  // can call this same PATCH twice (with a new completed_at timestamp each
  // time) if the message insert already succeeded but a later step failed —
  // check for an existing event of each name first so a retry can't
  // double-log either one.
  if (body.completed_at) {
    const alreadyLogged = async (name: "draft_completed" | "unaided_completed") => {
      const { data: existing } = await supabase
        .from("events")
        .select("id")
        .eq("attempt_id", id)
        .eq("name", name)
        .maybeSingle();
      return !!existing;
    };

    const rubricPass = body.outcome !== "shipped-with-misses";
    const properties = { rubric_pass: rubricPass, revision_count: body.loops_to_clear ?? null };

    if (!(await alreadyLogged("draft_completed"))) {
      await logEvent(supabase, user.id, "draft_completed", id, properties);
    }
    if (data.attempt_type === "unaided" && !(await alreadyLogged("unaided_completed"))) {
      const timeToDoneMs =
        data.started_at && data.completed_at
          ? new Date(data.completed_at).getTime() - new Date(data.started_at).getTime()
          : null;
      await logEvent(supabase, user.id, "unaided_completed", id, {
        ...properties,
        time_to_done: timeToDoneMs,
        help_requests: help_requests ?? null,
        ai_turns: ai_turns ?? null,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
