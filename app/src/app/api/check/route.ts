import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { evaluate } from "@/lib/rubric/evaluate";
import { assertMasked, UnmaskedPayloadError } from "@/lib/pii-guard";
import { ownsAttempt } from "@/lib/attempt-ownership";
import { checkDraftSchema, parseJson } from "@/lib/api-validation";
import { logEvent } from "@/lib/events";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = await parseJson(request, checkDraftSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // SEC-001: refuse to evaluate against (and later, write a checks row
  // against) an attempt that doesn't belong to the caller.
  if (!(await ownsAttempt(supabase, body.attemptId, user.id))) {
    return NextResponse.json({ error: "attempt not found" }, { status: 404 });
  }

  // Defense in depth: the server never receives the real recipient name (the
  // masking invariant — ERD.md), so it can't check against a "known" token.
  // Instead it refuses payloads that still look unmasked (an email address
  // or phone number slipping through client-side masking).
  try {
    assertMasked({ draftMasked: body.draftMasked });
  } catch (e) {
    if (e instanceof UnmaskedPayloadError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }

  const result = await evaluate(body.draftMasked, body.scenario);

  // ANALYTICS-001: feedback_acted fires when this check is itself a
  // revision (revisionIndex > 0, i.e. the user tightened and re-checked) —
  // {criterion, before, after} names the criterion the *previous* check
  // flagged and whether this new check now passes it.
  if (body.revisionIndex > 0) {
    const { data: prevCheck } = await supabase
      .from("checks")
      .select("top_misses")
      .eq("attempt_id", body.attemptId)
      .eq("revision_index", body.revisionIndex - 1)
      .maybeSingle();
    const prevCriterion = (prevCheck?.top_misses as { criterion?: string }[] | null)?.[0]?.criterion;
    if (prevCriterion) {
      const named = (["b1", "b2", "b3", "b4", "b5"] as const).find((k) => k === prevCriterion);
      const after = named
        ? result.criteria[named].pass
        : result.criteria.personalized.find((p) => p.id === prevCriterion)?.pass;
      await logEvent(supabase, user.id, "feedback_acted", body.attemptId, {
        criterion: prevCriterion,
        before: false,
        after: after ?? null,
      });
    }
  }

  const { error: insertError } = await supabase.from("checks").insert({
    attempt_id: body.attemptId,
    user_id: user.id,
    revision_index: body.revisionIndex ?? 0,
    draft_text_masked: body.draftMasked,
    core_pass: result.core_pass,
    criteria: result.criteria,
    top_misses: result.top_misses,
    deterministic: result.deterministic,
    model: result.model,
    latency_ms: result.latency_ms,
  });
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(result);
}
