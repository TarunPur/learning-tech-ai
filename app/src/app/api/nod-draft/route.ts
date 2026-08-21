import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateInitialDraft } from "@/lib/rubric/generate";
import { evaluate } from "@/lib/rubric/evaluate";
import type { ScenarioId } from "@/lib/flow";

type Body = {
  scenario: ScenarioId;
  recipientMasked: string;
  ask: string;
  contextMasked: string;
};

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

  const body = (await request.json()) as Body;
  if (!body.scenario) {
    return NextResponse.json({ error: "missing scenario" }, { status: 400 });
  }

  const { text, sample } = await generateInitialDraft(body.scenario, {
    recipientMasked: body.recipientMasked,
    ask: body.ask,
    contextMasked: body.contextMasked,
  });
  const check = await evaluate(text, body.scenario);

  return NextResponse.json({ draftMasked: text, sample, check });
}
