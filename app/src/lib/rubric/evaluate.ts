import type { ScenarioId } from "@/lib/flow";
import { evaluateB4 } from "./b4";
import { runAnchoredEvaluation, type Criterion } from "./llm";

export type TopMiss = { criterion: string; quote: string | null; why: string | null };

export type EvaluateResult = {
  core_pass: boolean;
  criteria: {
    b1: Criterion;
    b2: Criterion;
    b3: Criterion;
    b4: { pass: boolean; quote: null; why: string | null };
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

export async function evaluate(maskedDraft: string, scenario: ScenarioId): Promise<EvaluateResult> {
  const b4Result = evaluateB4(maskedDraft);
  const { output, model, latencyMs } = await runAnchoredEvaluation(maskedDraft, scenario);

  const b4 = { pass: b4Result.pass, quote: null, why: b4Result.why };
  const core_pass = output.b1.pass && output.b2.pass && b4.pass;

  const byKey: Record<(typeof MISS_ORDER)[number], Criterion | typeof b4> = {
    b1: output.b1,
    b2: output.b2,
    b4,
    b3: output.b3,
    b5: output.b5,
  };

  const top_misses: TopMiss[] = [];
  for (const key of MISS_ORDER) {
    if (top_misses.length >= 2) break;
    const c = byKey[key];
    if (!c.pass) top_misses.push({ criterion: key, quote: c.quote, why: c.why });
  }
  if (top_misses.length < 2) {
    for (const p of output.personalized) {
      if (top_misses.length >= 2) break;
      if (!p.pass) top_misses.push({ criterion: p.id, quote: p.quote, why: p.why });
    }
  }

  return {
    core_pass,
    criteria: { b1: output.b1, b2: output.b2, b3: output.b3, b4, b5: output.b5, personalized: output.personalized },
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
