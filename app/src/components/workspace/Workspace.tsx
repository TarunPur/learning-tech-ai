"use client";

import { useEffect, useState } from "react";
import { BrandHeader } from "@/components/ui/BrandHeader";
import { firstName, scenario, type ScenarioId } from "@/lib/flow";
import { maskName } from "@/lib/masking";
import { rememberName } from "@/lib/name-map";
import {
  checkDraft,
  createAttempt,
  createNudge,
  fetchPendingNudge,
  generateNodDraft,
  patchAttempt,
  patchNudge,
  rewriteDraftRequest,
  saveMessage,
} from "@/lib/api-client";
import { SituationFrame } from "./frames/SituationFrame";
import { DetailsFrame } from "./frames/DetailsFrame";
import { ChooseFrame } from "./frames/ChooseFrame";
import { DraftFrame } from "./frames/DraftFrame";
import { NodDraftFrame } from "./frames/NodDraftFrame";
import { FeedbackFrame } from "./frames/FeedbackFrame";
import { SavedFrame } from "./frames/SavedFrame";
import { NudgeBanner } from "./frames/NudgeBanner";
import { Recap } from "./Recap";
import { FRAME_ORDER, INITIAL_DRAFT, resetFor, type DraftState, type FrameKey } from "./types";

export function Workspace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [draft, setDraft] = useState<DraftState>(INITIAL_DRAFT);
  const [loading, setLoading] = useState(false);
  const [pendingNudge, setPendingNudge] = useState<{ id: string; scenario: ScenarioId } | null>(null);

  useEffect(() => {
    fetchPendingNudge()
      .then(({ nudge }) => setPendingNudge(nudge))
      .catch(() => setPendingNudge(null));
  }, []);

  const activeKey = FRAME_ORDER[activeIndex] ?? "situation";
  const prevKey: FrameKey | null = activeIndex > 0 ? FRAME_ORDER[activeIndex - 1] ?? null : null;

  function commitFrame(frameKey: FrameKey, values: Partial<DraftState>) {
    setDraft((prev) => {
      const changed = Object.entries(values).some(
        ([k, v]) => String(prev[k as keyof DraftState] ?? "") !== String(v ?? "")
      );
      const base = changed ? { ...prev, ...resetFor(frameKey) } : prev;
      return { ...base, ...values };
    });
  }

  function advance() {
    setActiveIndex((i) => Math.min(i + 1, FRAME_ORDER.length - 1));
  }
  function goTo(key: FrameKey) {
    setActiveIndex(FRAME_ORDER.indexOf(key));
  }
  function editFrame(index: number) {
    setActiveIndex(index);
  }

  const name = firstName(draft.who);
  const maskedWho = maskName(draft.who, name);
  const maskedAsk = maskName(draft.ask, name);
  const maskedCtx = maskName(draft.ctx, name);
  const effectiveScenario: ScenarioId = (draft.scenario || "quiet") as ScenarioId;

  async function handlePickSituation(sc: ScenarioId, customText: string) {
    setLoading(true);
    try {
      const { id } = await createAttempt(sc, customText || undefined);
      commitFrame("situation", { scenario: sc, customText, attemptId: id });
      advance();
    } finally {
      setLoading(false);
    }
  }

  async function handleDetailsContinue(values: { who: string; ask: string; ctx: string }) {
    if (!draft.attemptId) return;
    setLoading(true);
    try {
      const nm = firstName(values.who);
      await patchAttempt(draft.attemptId, {
        recipient_masked: maskName(values.who, nm),
        ask: maskName(values.ask, nm),
        context_masked: maskName(values.ctx, nm),
      });
      commitFrame("details", values);
      advance();
    } finally {
      setLoading(false);
    }
  }

  async function handleChoosePath(path: "own" | "nod") {
    if (!draft.attemptId) return;
    setLoading(true);
    try {
      await patchAttempt(draft.attemptId, { path });
      commitFrame("choose", { path });
      advance();
    } finally {
      setLoading(false);
    }
  }

  async function runCheck(draftTextMasked: string, path: "own" | "nod") {
    if (!draft.attemptId) return;
    setLoading(true);
    try {
      const nextCheckCount = draft.checkCount + 1;
      const result = await checkDraft({
        attemptId: draft.attemptId,
        draftMasked: draftTextMasked,
        scenario: effectiveScenario,
        path,
        revisionIndex: draft.checkCount,
      });

      const attemptPatch: Record<string, unknown> = {
        draft_text_masked: draftTextMasked,
        check_count: nextCheckCount,
      };
      if (nextCheckCount === 1) {
        attemptPatch.first_pass_criteria = {
          b1: result.criteria.b1.pass,
          b2: result.criteria.b2.pass,
          b3: result.criteria.b3.pass,
          b4: result.criteria.b4.pass,
          b5: result.criteria.b5.pass,
        };
      }
      await patchAttempt(draft.attemptId, attemptPatch);

      if (!result.core_pass && nextCheckCount >= 3) {
        // Third check still fails — NOD writes a better version (journey.md §3 ⑤).
        const rewrite = await rewriteDraftRequest(draftTextMasked, effectiveScenario);
        setDraft((prev) => ({ ...prev, path, checkCount: nextCheckCount, checkResult: result, rewriteText: rewrite.text }));
      } else {
        // A DraftFrame submission (whether the text started blank or was
        // tightened from a NOD draft) is the user's own checked text from
        // here on — persist `path` so handleSave() saves what was actually
        // checked, not a stale draft.nodDraftText from before the edit.
        setDraft((prev) => ({
          ...prev,
          path,
          checkCount: nextCheckCount,
          checkResult: result,
          lastFixWhy: result.top_misses[0]?.why ?? "",
        }));
      }
      goTo("feedback");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateNodDraft() {
    setLoading(true);
    try {
      const { draftMasked, sample, check } = await generateNodDraft({
        scenario: effectiveScenario,
        recipientMasked: maskedWho,
        ask: maskedAsk,
        contextMasked: maskedCtx,
      });
      setDraft((prev) => ({ ...prev, nodDraftText: draftMasked, nodDraftSample: sample, checkResult: check }));
    } finally {
      setLoading(false);
    }
  }

  // ④b already has a checkResult (computed alongside generation) — this just
  // records the bookkeeping runCheck would otherwise do, without a second
  // /api/check call.
  async function handleNodProceed() {
    if (!draft.attemptId || !draft.checkResult) return;
    setLoading(true);
    try {
      const result = draft.checkResult;
      await patchAttempt(draft.attemptId, {
        draft_text_masked: draft.nodDraftText,
        check_count: 1,
        first_pass_criteria: {
          b1: result.criteria.b1.pass,
          b2: result.criteria.b2.pass,
          b3: result.criteria.b3.pass,
          b4: result.criteria.b4.pass,
          b5: result.criteria.b5.pass,
        },
      });
      setDraft((prev) => ({ ...prev, checkCount: 1, lastFixWhy: result.top_misses[0]?.why ?? "" }));
      goTo("feedback");
    } finally {
      setLoading(false);
    }
  }

  function handleTighten() {
    setDraft((prev) => ({
      ...prev,
      ownText: prev.ownText || prev.nodDraftText,
      checkResult: null,
    }));
    goTo("draft");
  }

  async function handleSave() {
    if (!draft.attemptId) return;
    setLoading(true);
    try {
      // Server-generated text (rewriteText, nodDraftText) is already masked;
      // the user's own typed text (ownText) is raw and must be masked here.
      let authored: "own" | "nod" | "nod-rewrote";
      let finalMasked: string;
      if (draft.rewriteText) {
        authored = "nod-rewrote";
        finalMasked = draft.rewriteText;
      } else if (draft.path === "nod") {
        authored = "nod";
        finalMasked = draft.nodDraftText;
      } else {
        authored = "own";
        finalMasked = maskName(draft.ownText, name);
      }
      const isCustom = draft.scenario === "custom";
      const sc = draft.scenario && draft.scenario !== "custom" ? scenario(draft.scenario) : null;
      const title = isCustom ? draft.customText || "A different outreach message" : sc?.title ?? "Your message";

      const { id } = await saveMessage({
        attemptId: draft.attemptId,
        title,
        scenario: effectiveScenario,
        textMasked: finalMasked,
        ask: maskedAsk,
        authored,
      });

      await patchAttempt(draft.attemptId, {
        outcome: draft.rewriteText ? "nod-rewrote" : draft.checkCount > 1 ? "tightened" : "clean",
        loops_to_clear: draft.checkCount,
        completed_at: new Date().toISOString(),
      });

      if (name !== "there") rememberName(id, name);
      // The outcome-tied nudge (Decision 10) — one per completed attempt,
      // surfaced in-app on the next visit.
      await createNudge(draft.attemptId, effectiveScenario);
      setDraft((prev) => ({ ...prev, savedMessageId: id, savedTextMasked: finalMasked }));
      goTo("saved");
    } finally {
      setLoading(false);
    }
  }

  function handleReuse(textMasked: string) {
    setDraft({ ...INITIAL_DRAFT, reuseSeed: textMasked });
    setActiveIndex(0);
  }

  function handleStartNew() {
    setDraft(INITIAL_DRAFT);
    setActiveIndex(0);
  }

  async function handleAcceptNudge() {
    if (!pendingNudge) return;
    setLoading(true);
    try {
      await patchNudge(pendingNudge.id, "clicked");
      const { id } = await createAttempt(pendingNudge.scenario, undefined, "unaided");
      setDraft({ ...INITIAL_DRAFT, scenario: pendingNudge.scenario, attemptId: id, attemptType: "unaided" });
      setPendingNudge(null);
      // Skip situation-picking — the nudge already carries the situation.
      setActiveIndex(FRAME_ORDER.indexOf("details"));
    } finally {
      setLoading(false);
    }
  }

  async function handleDismissNudge() {
    if (!pendingNudge) return;
    setLoading(true);
    try {
      await patchNudge(pendingNudge.id, "dismissed");
      setPendingNudge(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="nod-stage">
      <BrandHeader />
      <div className="nod-cols">
        <div className="nod-col-prev">
          <Recap frameKey={prevKey} draft={draft} onEdit={() => editFrame(activeIndex - 1)} />
        </div>
        <div className="nod-col-active">
          {activeKey === "situation" &&
            (pendingNudge ? (
              <NudgeBanner
                scenarioId={pendingNudge.scenario}
                loading={loading}
                onAccept={handleAcceptNudge}
                onDismiss={handleDismissNudge}
              />
            ) : (
              <SituationFrame onPick={handlePickSituation} />
            ))}
          {activeKey === "details" && (
            <DetailsFrame
              initialWho={draft.who}
              initialAsk={draft.ask}
              initialCtx={draft.ctx}
              onContinue={handleDetailsContinue}
            />
          )}
          {activeKey === "choose" && <ChooseFrame onPick={handleChoosePath} />}
          {activeKey === "draft" &&
            (draft.checkCount > 0 || draft.path === "own" ? (
              <DraftFrame
                draft={draft}
                loading={loading}
                onSubmit={(text) => {
                  setDraft((prev) => ({ ...prev, ownText: text }));
                  runCheck(maskName(text, name), "own");
                }}
              />
            ) : (
              <NodDraftFrame
                draft={draft}
                loading={loading}
                onGenerate={handleGenerateNodDraft}
                onProceed={handleNodProceed}
              />
            ))}
          {activeKey === "feedback" && (
            <FeedbackFrame draft={draft} loading={loading} onTighten={handleTighten} onSave={handleSave} />
          )}
          {activeKey === "saved" && (
            <SavedFrame
              savedMessageId={draft.savedMessageId}
              savedTextMasked={draft.savedTextMasked}
              onReuse={handleReuse}
              onStartNew={handleStartNew}
            />
          )}
        </div>
      </div>
    </div>
  );
}
