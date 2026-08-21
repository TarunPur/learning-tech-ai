import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { evaluate } from "@/lib/rubric/evaluate";
import type { ScenarioId } from "@/lib/flow";

type CheckBody = {
  attemptId: string;
  draftMasked: string;
  scenario: ScenarioId;
  path: "own" | "nod";
  revisionIndex: number;
};

// Defense in depth: the server never receives the real recipient name (the
// masking invariant — ERD.md), so it can't check against a "known" token.
// Instead it refuses payloads that still look unmasked (an email address or
// phone number slipping through client-side masking).
const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const PHONE_RE = /\b(?:\+?\d{1,3}[\s-]?)?\d{10}\b/;

function looksUnmasked(text: string): boolean {
  return EMAIL_RE.test(text) || PHONE_RE.test(text);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as CheckBody;
  if (!body.attemptId || !body.draftMasked || !body.scenario) {
    return NextResponse.json({ error: "missing required fields" }, { status: 400 });
  }
  if (looksUnmasked(body.draftMasked)) {
    return NextResponse.json({ error: "draft appears unmasked" }, { status: 400 });
  }

  const result = await evaluate(body.draftMasked, body.scenario);

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

  return NextResponse.json({
    core_pass: result.core_pass,
    top_misses: result.top_misses,
    criteria: result.criteria,
  });
}
