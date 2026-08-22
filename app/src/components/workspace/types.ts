import type { ScenarioId } from "@/lib/flow";
import type { EvaluateResult } from "@/lib/rubric/evaluate";

export const FRAME_ORDER = ["situation", "details", "choose", "draft", "feedback", "saved"] as const;
export type FrameKey = (typeof FRAME_ORDER)[number];

export type DraftState = {
  scenario: ScenarioId | "";
  customText: string;
  path: "own" | "nod";
  who: string;
  ask: string;
  ctx: string;
  ownText: string;
  checkCount: number;
  attemptId: string | null;
  checkResult: EvaluateResult | null;
  nodDraftText: string;
  nodDraftSample: boolean;
  lastFixWhy: string;
  rewriteText: string;
  rewriteCorePass: boolean;
  rewriteTopMissWhy: string;
  savedMessageId: string | null;
  savedTextMasked: string;
  reuseSeed: string;
  attemptType: "guided" | "unaided";
  // ANALYTICS-001 (round 3): the unaided_completed capability signal —
  // help_requests (tighten/edit-rewrite/NOD-draft "I'm not sure" taps) and
  // ai_turns (NOD draft generations + rewrite calls) for this attempt.
  // Reset only on a genuinely new attempt (situation reset), not on an
  // in-attempt edit.
  helpRequests: number;
  aiTurns: number;
};

export const INITIAL_DRAFT: DraftState = {
  scenario: "",
  customText: "",
  path: "own",
  who: "",
  ask: "",
  ctx: "",
  ownText: "",
  checkCount: 0,
  attemptId: null,
  checkResult: null,
  nodDraftText: "",
  nodDraftSample: false,
  lastFixWhy: "",
  rewriteText: "",
  rewriteCorePass: false,
  rewriteTopMissWhy: "",
  savedMessageId: null,
  savedTextMasked: "",
  reuseSeed: "",
  attemptType: "guided",
  helpRequests: 0,
  aiTurns: 0,
};

// Editing a prior frame must never leave contradictory downstream state —
// wipe everything derived from a frame before saving its new value.
export function resetFor(frameKey: FrameKey): Partial<DraftState> {
  const clearedDraft: Partial<DraftState> = {
    ownText: "",
    checkCount: 0,
    checkResult: null,
    nodDraftText: "",
    nodDraftSample: false,
    lastFixWhy: "",
    rewriteText: "",
    rewriteCorePass: false,
    rewriteTopMissWhy: "",
    savedMessageId: null,
    savedTextMasked: "",
  };
  if (frameKey === "situation") {
    // reuseSeed deliberately survives a situation commit — it's only
    // consumed once the draft frame mounts, and handleReuse() is the only
    // place that sets it, always immediately before a fresh situation pick.
    // helpRequests/aiTurns reset here too — this is a genuinely new attempt.
    return {
      ...clearedDraft,
      who: "",
      ask: "",
      ctx: "",
      path: "own",
      attemptId: null,
      helpRequests: 0,
      aiTurns: 0,
    };
  }
  if (frameKey === "details" || frameKey === "choose") {
    return clearedDraft;
  }
  if (frameKey === "draft") {
    return {
      checkResult: null,
      lastFixWhy: "",
      rewriteText: "",
      rewriteCorePass: false,
      rewriteTopMissWhy: "",
      savedMessageId: null,
      savedTextMasked: "",
    };
  }
  return {};
}
