import type { ScenarioId } from "@/lib/flow";

// PRD §16 Appendix B — 1 curated (never invented) criterion per scenario.
// "custom" maps to the nearest curated situation via classifyTask, never a
// fresh criterion of its own.
export const PERSONALIZED_CRITERIA: Record<Exclude<ScenarioId, "custom">, { id: string; description: string }> = {
  quiet: {
    id: "fresh-reason-to-reply",
    description: "a graceful, low-pressure reason to reply now — a fresh hook, not just \"following up\"",
  },
  meeting: {
    id: "low-friction-next-step",
    description:
      "makes the meeting the obvious low-friction next step — specific, short, with a clear payoff for their time",
  },
  cold: {
    id: "fast-credibility",
    description: "establishes credibility fast — one relevant proof point, without bragging",
  },
  event: {
    id: "anchors-shared-context",
    description: "anchors to the shared context — references the specific event/conversation naturally",
  },
};

export function personalizedCriterionFor(scenario: Exclude<ScenarioId, "custom">) {
  return PERSONALIZED_CRITERIA[scenario];
}
