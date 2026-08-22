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
    });
  } catch (e) {
    if (e instanceof UnmaskedPayloadError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }

  const { data, error, count } = await supabase
    .from("attempts")
    .update(body, { count: "exact" })
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
  // patches that happen earlier in the same attempt.
  if (body.completed_at) {
    const rubricPass = body.outcome !== "shipped-with-misses";
    const properties = { rubric_pass: rubricPass, revision_count: body.loops_to_clear ?? null };
    await logEvent(supabase, user.id, "draft_completed", id, properties);
    if (data.attempt_type === "unaided") {
      const timeToDoneMs =
        data.started_at && data.completed_at
          ? new Date(data.completed_at).getTime() - new Date(data.started_at).getTime()
          : null;
      // help_requests/ai_turns intentionally omitted — see events.ts.
      await logEvent(supabase, user.id, "unaided_completed", id, { ...properties, time_to_done: timeToDoneMs });
    }
  }

  return NextResponse.json({ ok: true });
}
