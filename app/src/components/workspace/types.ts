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
  savedTextMasked: string;
  reuseSeed: string;
  attemptType: "guided" | "unaided";
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
  savedTextMasked: "",
  reuseSeed: "",
  attemptType: "guided",
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
    savedTextMasked: "",
  };
  if (frameKey === "situation") {
    // reuseSeed deliberately survives a situation commit — it's only
    // consumed once the draft frame mounts, and handleReuse() is the only
    // place that sets it, always immediately before a fresh situation pick.
    return { ...clearedDraft, who: "", ask: "", ctx: "", path: "own", attemptId: null };
  }
  if (frameKey === "details" || frameKey === "choose") {
    return clearedDraft;
  }
  if (frameKey === "draft") {
    return { checkResult: null, lastFixWhy: "", rewriteText: "", savedMessageId: null, savedTextMasked: "" };
  }
  return {};
}
