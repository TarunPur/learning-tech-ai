import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rewriteDraft } from "@/lib/rubric/rewrite";
import { assertMasked, UnmaskedPayloadError } from "@/lib/pii-guard";
import { ownsAttempt } from "@/lib/attempt-ownership";
import { parseJson, rewriteSchema } from "@/lib/api-validation";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = await parseJson(request, rewriteSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // SEC-001
  if (!(await ownsAttempt(supabase, body.attemptId, user.id))) {
    return NextResponse.json({ error: "attempt not found" }, { status: 404 });
  }

  try {
    assertMasked({ draftMasked: body.draftMasked });
  } catch (e) {
    if (e instanceof UnmaskedPayloadError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }

  const { text, corePass, check } = await rewriteDraft(body.draftMasked, body.scenario);

  // DATA-001 (same principle as the NOD-draft path): the rewrite is itself
  // an evaluator run and gets its own checks row, at revision_index 3 — the
  // coaching loop is capped at 3 checks, so this is always the 4th/final
  // evaluation for the attempt.
  await supabase.from("checks").insert({
    attempt_id: body.attemptId,
    user_id: user.id,
    revision_index: 3,
    draft_text_masked: text,
    core_pass: check.core_pass,
    criteria: check.criteria,
    top_misses: check.top_misses,
    deterministic: check.deterministic,
    model: check.model,
    latency_ms: check.latency_ms,
  });

  return NextResponse.json({ text, corePass, topMiss: check.top_misses[0] ?? null });
}
