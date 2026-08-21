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
  savedMessageId: string | null;
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
  savedMessageId: null,
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
    savedMessageId: null,
  };
  if (frameKey === "situation") {
    return { ...clearedDraft, who: "", ask: "", ctx: "", path: "own", attemptId: null };
  }
  if (frameKey === "details" || frameKey === "choose") {
    return clearedDraft;
  }
  if (frameKey === "draft") {
    return { checkResult: null, lastFixWhy: "", rewriteText: "", savedMessageId: null };
  }
  return {};
}
