import type { ScenarioId } from "@/lib/flow";
import { evaluateB4 } from "./b4";
import { runAnchoredEvaluation, type Criterion } from "./llm";

export type TopMiss = { criterion: string; quote: string | null; why: string | null };

type B4Criterion = {
  pass: boolean;
  quote: null;
  why: string | null;
  word_count: number;
  sentence_count: number;
  paragraph_count: number;
  reading_level: number;
};

export type EvaluateResult = {
  core_pass: boolean;
  criteria: {
    b1: Criterion;
    b2: Criterion;
    b3: Criterion;
    b4: B4Criterion;
    b5: Criterion;
    personalized: { id: string; pass: boolean; quote: string | null; why: string | null }[];
  };
  top_misses: TopMiss[];
  deterministic: { word_count: number; sentence_count: number; reading_level: number };
  model: string;
  latency_ms: number;
};

// The order top_misses is picked in: core criteria first, then advisory
// (implementation.md Phase 5 step 3).
const MISS_ORDER = ["b1", "b2", "b4", "b3", "b5"] as const;

// RUBRIC-001: the model is asked for the exact quote it reacted to, but
// nothing verified that before. A hallucinated quote breaks the "Your line"
// UI (it shows the reader a sentence they never wrote) and NodDraftFrame's
// weak-line matching. Anything that isn't a real substring of the draft is
// dropped rather than trusted. Takes the draft explicitly (not module
// state) so concurrent evaluate() calls in the same server process can
// never cross-check one request's quotes against another's draft.
function verifyQuote<C extends { pass: boolean; quote: string | null }>(criterion: C, maskedDraft: string): C {
  if (criterion.pass || !criterion.quote) return criterion;
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
  const found = normalize(maskedDraft).includes(normalize(criterion.quote));
  return found ? criterion : { ...criterion, quote: null };
}

export async function evaluate(maskedDraft: string, scenario: ScenarioId): Promise<EvaluateResult> {
  const b4Result = evaluateB4(maskedDraft);
  const { output, model, latencyMs } = await runAnchoredEvaluation(maskedDraft, scenario);

  const b1 = verifyQuote(output.b1, maskedDraft);
  const b2 = verifyQuote(output.b2, maskedDraft);
  const b3 = verifyQuote(output.b3, maskedDraft);
  const b5 = verifyQuote(output.b5, maskedDraft);
  const personalized = output.personalized.map((p) => verifyQuote(p, maskedDraft));

  const b4: B4Criterion = {
    pass: b4Result.pass,
    quote: null,
    why: b4Result.why,
    word_count: b4Result.word_count,
    sentence_count: b4Result.sentence_count,
    paragraph_count: b4Result.paragraph_count,
    reading_level: b4Result.reading_level,
  };
  const core_pass = b1.pass && b2.pass && b4.pass;

  const byKey: Record<(typeof MISS_ORDER)[number], Criterion | B4Criterion> = {
    b1,
    b2,
    b4,
    b3,
    b5,
  };

  const top_misses: TopMiss[] = [];
  for (const key of MISS_ORDER) {
    if (top_misses.length >= 2) break;
    const c = byKey[key];
    if (!c.pass) top_misses.push({ criterion: key, quote: c.quote, why: c.why });
  }
  if (top_misses.length < 2) {
    for (const p of personalized) {
      if (top_misses.length >= 2) break;
      if (!p.pass) top_misses.push({ criterion: p.id, quote: p.quote, why: p.why });
    }
  }

  return {
    core_pass,
    criteria: { b1, b2, b3, b4, b5, personalized },
    top_misses,
    deterministic: {
      word_count: b4Result.word_count,
      sentence_count: b4Result.sentence_count,
      reading_level: b4Result.reading_level,
    },
    model,
    latency_ms: latencyMs,
  };
}
