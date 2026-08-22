import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { classifyTask } from "@/lib/flow";
import { assertMasked, UnmaskedPayloadError } from "@/lib/pii-guard";
import { createAttemptSchema, parseJson } from "@/lib/api-validation";
import { logEvent } from "@/lib/events";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = await parseJson(request, createAttemptSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // FUN-001: a "custom" free-text task is checked server-side too — the
  // client already refuses abuse/injection attempts, but a direct API call
  // must not be able to skip that check.
  let offscope = false;
  if (body.scenario === "custom" && body.customTaskMasked) {
    const classification = classifyTask(body.customTaskMasked);
    if (classification.kind === "abuse") {
      return NextResponse.json({ error: "request refused" }, { status: 400 });
    }
    offscope = classification.kind === "offscope";
  }

  try {
    assertMasked({ customTaskMasked: body.customTaskMasked });
  } catch (e) {
    if (e instanceof UnmaskedPayloadError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }

  const { data, error } = await supabase
    .from("attempts")
    .insert({
      user_id: user.id,
      scenario: body.scenario,
      custom_task_masked: body.customTaskMasked ?? null,
      attempt_type: body.attemptType ?? "guided",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // The user explicitly chose "shape it as a message anyway" past the
  // off-scope warning — capture that as a roadmap signal (ERD.md
  // roadmap_signals, PRD §13). Best-effort: never fail attempt creation
  // over this.
  if (offscope) {
    await supabase.from("roadmap_signals").insert({
      user_id: user.id,
      requested_masked: body.customTaskMasked,
    });
  }

  // ANALYTICS-001 (PRD §14)
  await logEvent(supabase, user.id, "attempt_started", data.id, { scenario: body.scenario });
  if (body.attemptType === "unaided") {
    await logEvent(supabase, user.id, "unaided_started", data.id, { scenario: body.scenario });
  }

  return NextResponse.json({ id: data.id });
}
