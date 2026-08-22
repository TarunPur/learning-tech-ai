import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateInitialDraft } from "@/lib/rubric/generate";
import { evaluate } from "@/lib/rubric/evaluate";
import { assertMasked, UnmaskedPayloadError } from "@/lib/pii-guard";
import { ownsAttempt } from "@/lib/attempt-ownership";
import { nodDraftSchema, parseJson } from "@/lib/api-validation";

// One round trip for the ④b fallback path: generate NOD's first version from
// the user's masked context, then evaluate it immediately so the weak line
// is already known when the user taps a sentence (journey.md §3 ④b — both
// paths share the same check, computed once here rather than twice).
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = await parseJson(request, nodDraftSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  // SEC-001
  if (!(await ownsAttempt(supabase, body.attemptId, user.id))) {
    return NextResponse.json({ error: "attempt not found" }, { status: 404 });
  }

  try {
    assertMasked({ recipientMasked: body.recipientMasked, ask: body.ask, contextMasked: body.contextMasked });
  } catch (e) {
    if (e instanceof UnmaskedPayloadError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }

  const { text, sample } = await generateInitialDraft(body.scenario, {
    recipientMasked: body.recipientMasked,
    ask: body.ask,
    contextMasked: body.contextMasked,
  });
  const check = await evaluate(text, body.scenario);

  // DATA-001: NOD's first-draft evaluation is the same "revision 0" audit
  // event the write-your-own path gets from /api/check — it must not be
  // dropped just because it happened alongside generation instead of a
  // separate check call.
  await supabase.from("checks").insert({
    attempt_id: body.attemptId,
    user_id: user.id,
    revision_index: 0,
    draft_text_masked: text,
    core_pass: check.core_pass,
    criteria: check.criteria,
    top_misses: check.top_misses,
    deterministic: check.deterministic,
    model: check.model,
    latency_ms: check.latency_ms,
  });

  return NextResponse.json({ draftMasked: text, sample, check });
}
