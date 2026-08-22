"use client";

import { useEffect, useRef, useState } from "react";
import { BrandHeader } from "@/components/ui/BrandHeader";
import { scenario, type ScenarioId } from "@/lib/flow";
import { buildMaskTokens, maskAllPII, scrubGenericPII } from "@/lib/masking";
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

// REL-001: every async workspace action funnels through here so a network,
// model, or database failure always produces a visible, human-readable,
// retryable state instead of a silent no-op. Retrying re-runs the exact
// same closure, so nothing the user typed has to be re-entered.
function friendlyErrorMessage(e: unknown): string {
  const message = e instanceof Error ? e.message : String(e);
  if (message.startsWith("401")) return "You've been signed out — sign in again to keep going.";
  if (message.startsWith("400")) return "That didn't go through as expected. Try again in a moment.";
  if (message.startsWith("404")) return "That message couldn't be found — it may have been removed.";
  return "Couldn't reach NOD's server. Check your connection and try again — nothing you wrote was lost.";
}

export function Workspace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [draft, setDraft] = useState<DraftState>(INITIAL_DRAFT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<(() => Promise<void>) | null>(null);
  const [pendingNudge, setPendingNudge] = useState<{ id: string; scenario: ScenarioId } | null>(null);
  // DATA-002: retrying a failed action re-invokes the exact closure that
  // failed, which closed over `draft` as it was on the render that created
  // it — a plain `draft.savedMessageId` read inside that closure would stay
  // stale even after a mid-flight setDraft() from that same attempt's
  // partial success. This ref is always current, so the retry's idempotency
  // check (see handleSave) sees the real latest state.
  const draftRef = useRef(draft);
  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  async function runAction(action: () => Promise<void>) {
    setLoading(true);
    setError(null);
    try {
      await action();
      setLastAction(null);
    } catch (e) {
      // Safe to log: every payload that reaches these actions has already
      // been through the masking boundary (PRIV-001) before it's sent.
      console.error("[NOD] action failed:", e);
      setError(friendlyErrorMessage(e));
      setLastAction(() => action);
    } finally {
      setLoading(false);
    }
  }

  function retryLastAction() {
    if (lastAction) runAction(lastAction);
  }

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

  const maskTokens = buildMaskTokens(draft.who);
  const maskedWho = maskAllPII(draft.who, maskTokens);
  const maskedAsk = maskAllPII(draft.ask, maskTokens);
  const maskedCtx = maskAllPII(draft.ctx, maskTokens);
  const effectiveScenario: ScenarioId = (draft.scenario || "quiet") as ScenarioId;

  function handlePickSituation(sc: ScenarioId, customText: string) {
    return runAction(async () => {
      // The recipient isn't known yet at this frame, so a name/company can't
      // be masked here — but a raw email or phone typed into the free-text
      // "something else" description must never reach the server either
      // (PRIV-001).
      const scrubbedCustomText = customText ? scrubGenericPII(customText) : undefined;
      const { id } = await createAttempt(sc, scrubbedCustomText);
      commitFrame("situation", { scenario: sc, customText, attemptId: id });
      advance();
    });
  }

  function handleDetailsContinue(values: { who: string; ask: string; ctx: string }) {
    const attemptId = draft.attemptId;
    if (!attemptId) return Promise.resolve();
    return runAction(async () => {
      const tokens = buildMaskTokens(values.who);
      const patch: Record<string, string> = {
        recipient_masked: maskAllPII(values.who, tokens),
        ask: maskAllPII(values.ask, tokens),
        context_masked: maskAllPII(values.ctx, tokens),
      };
      // PRIV-001 (round 3): the "something else" custom task was only PII-
      // scrubbed (email/phone), not name/company-masked, when it was first
      // sent in handlePickSituation — the recipient wasn't known yet. Now
      // that it is, re-mask and re-persist it before it's used as anything
      // else (e.g. the saved message's title).
      if (draft.scenario === "custom" && draft.customText) {
        patch.custom_task_masked = maskAllPII(draft.customText, tokens);
      }
      await patchAttempt(attemptId, patch);
      commitFrame("details", values);
      advance();
    });
  }

  function handleChoosePath(path: "own" | "nod") {
    const attemptId = draft.attemptId;
    if (!attemptId) return Promise.resolve();
    return runAction(async () => {
      await patchAttempt(attemptId, { path });
      commitFrame("choose", { path });
      advance();
    });
  }

  function runCheck(draftTextMasked: string, path: "own" | "nod") {
    const attemptId = draft.attemptId;
    if (!attemptId) return Promise.resolve();
    return runAction(async () => {
      const nextCheckCount = draft.checkCount + 1;
      const result = await checkDraft({
        attemptId,
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
        // RUBRIC-001 (round 3): first_pass_criteria was dropping the
        // personalized criterion entirely — first_pass_criteria is meant to
        // be "which criteria passed on the FIRST check" (ERD.md), and
        // personalized is a real 6th scored dimension, not just b1-b5.
        attemptPatch.first_pass_criteria = {
          b1: result.criteria.b1.pass,
          b2: result.criteria.b2.pass,
          b3: result.criteria.b3.pass,
          b4: result.criteria.b4.pass,
          b5: result.criteria.b5.pass,
          ...Object.fromEntries(result.criteria.personalized.map((p) => [p.id, p.pass])),
        };
      }
      await patchAttempt(attemptId, attemptPatch);

      if (!result.core_pass && nextCheckCount >= 3) {
        // Third check still fails — NOD writes a better version (journey.md §3 ⑤).
        const rewrite = await rewriteDraftRequest(attemptId, draftTextMasked, effectiveScenario);
        setDraft((prev) => ({
          ...prev,
          path,
          checkCount: nextCheckCount,
          checkResult: result,
          rewriteText: rewrite.text,
          rewriteCorePass: rewrite.corePass,
          rewriteTopMissWhy: rewrite.topMiss?.why ?? "",
          aiTurns: prev.aiTurns + 1,
        }));
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
    });
  }

  function handleGenerateNodDraft() {
    const attemptId = draft.attemptId;
    if (!attemptId) return Promise.resolve();
    return runAction(async () => {
      const { draftMasked, sample, check } = await generateNodDraft({
        attemptId,
        scenario: effectiveScenario,
        recipientMasked: maskedWho,
        ask: maskedAsk,
        contextMasked: maskedCtx,
      });
      setDraft((prev) => ({
        ...prev,
        nodDraftText: draftMasked,
        nodDraftSample: sample,
        checkResult: check,
        aiTurns: prev.aiTurns + 1,
      }));
    });
  }

  // ④b already has a checkResult (computed alongside generation) — this just
  // records the bookkeeping runCheck would otherwise do, without a second
  // /api/check call.
  function handleNodProceed() {
    const attemptId = draft.attemptId;
    const result = draft.checkResult;
    if (!attemptId || !result) return Promise.resolve();
    return runAction(async () => {
      await patchAttempt(attemptId, {
        draft_text_masked: draft.nodDraftText,
        check_count: 1,
        first_pass_criteria: {
          b1: result.criteria.b1.pass,
          b2: result.criteria.b2.pass,
          b3: result.criteria.b3.pass,
          b4: result.criteria.b4.pass,
          b5: result.criteria.b5.pass,
          ...Object.fromEntries(result.criteria.personalized.map((p) => [p.id, p.pass])),
        },
      });
      setDraft((prev) => ({ ...prev, checkCount: 1, lastFixWhy: result.top_misses[0]?.why ?? "" }));
      goTo("feedback");
    });
  }

  function handleTighten() {
    setDraft((prev) => ({
      ...prev,
      ownText: prev.ownText || prev.nodDraftText,
      checkResult: null,
      helpRequests: prev.helpRequests + 1,
    }));
    goTo("draft");
  }

  // AI-001 (round 3): NOD's own rewrite still failed the standard — route to
  // a final hand-edit instead of a one-click Save. draft.checkCount stays
  // at 3 (the loop cap), which DraftFrame's onSubmit below reads as
  // "finalizing" and skips straight to Save rather than another check.
  function handleEditRewrite() {
    setDraft((prev) => ({
      ...prev,
      ownText: prev.rewriteText,
      path: "own",
      rewriteText: "",
      rewriteCorePass: false,
      rewriteTopMissWhy: "",
      checkResult: null,
      helpRequests: prev.helpRequests + 1,
    }));
    goTo("draft");
  }

  // DATA-002: Save is three writes (message, attempt patch, nudge) with no
  // real cross-table transaction available from the client — Supabase-js
  // doesn't expose one, and a Postgres RPC function would be the properly
  // transactional fix (a schema/infra change left to the owner). What's
  // done here instead: each step is made idempotent, so retryLastAction()
  // re-running this whole closure after a partial failure can never create
  // a second message or nudge. The message insert is skipped once
  // draft.savedMessageId is set; nudge creation is deduped server-side by
  // attempt_id (src/app/api/nudges/route.ts).
  // `overrideOwnText` is used by the DraftFrame "finalizing" submit path
  // below — setDraft()'s ownText update wouldn't be visible yet inside this
  // same closure (React state updates aren't synchronous), so the freshly
  // typed text is passed straight through instead of read back off `draft`.
  function handleSave(overrideOwnText?: string) {
    const attemptId = draft.attemptId;
    if (!attemptId) return Promise.resolve();
    return runAction(async () => {
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
        finalMasked = overrideOwnText ?? maskAllPII(draft.ownText, maskTokens);
      }

      let messageId = draftRef.current.savedMessageId;
      if (!messageId) {
        const isCustom = draft.scenario === "custom";
        const sc = draft.scenario && draft.scenario !== "custom" ? scenario(draft.scenario) : null;
        // customText may still hold a raw name/company now that the
        // recipient is known (it was only PII-scrubbed, not name-masked,
        // when captured in handlePickSituation) — mask it again here before
        // it becomes a persisted title (PRIV-001).
        const title = isCustom
          ? maskAllPII(draft.customText, maskTokens) || "A different outreach message"
          : sc?.title ?? "Your message";

        const saved = await saveMessage({
          attemptId,
          title,
          scenario: effectiveScenario,
          textMasked: finalMasked,
          ask: maskedAsk,
          authored,
        });
        messageId = saved.id;
        setDraft((prev) => ({ ...prev, savedMessageId: saved.id, savedTextMasked: finalMasked }));
      }

      // PRODUCT-001: a rewrite that never cleared B1/B2/B4 is an honest
      // "shipped with misses", not "nod-rewrote" (which implies NOD's
      // version met the standard) — the outcome value the ERD already
      // reserves for exactly this case.
      const outcome = draft.rewriteText
        ? draft.rewriteCorePass
          ? "nod-rewrote"
          : "shipped-with-misses"
        : draft.checkCount > 1
          ? "tightened"
          : "clean";
      await patchAttempt(attemptId, {
        outcome,
        loops_to_clear: draft.checkCount,
        completed_at: new Date().toISOString(),
        // ANALYTICS-001: only meaningful for unaided_completed's capability
        // read, but harmless to send always — the route only uses these for
        // event properties, never as attempts columns.
        help_requests: draft.helpRequests,
        ai_turns: draft.aiTurns,
      });

      if (maskTokens.length > 0) rememberName(messageId, maskTokens);
      // The outcome-tied nudge (Decision 10) — one per completed attempt,
      // surfaced in-app on the next visit.
      await createNudge(attemptId, effectiveScenario);
      goTo("saved");
    });
  }

  function handleReuse(textMasked: string) {
    setDraft({ ...INITIAL_DRAFT, reuseSeed: textMasked });
    setActiveIndex(0);
  }

  function handleStartNew() {
    setDraft(INITIAL_DRAFT);
    setActiveIndex(0);
  }

  function handleAcceptNudge() {
    const nudge = pendingNudge;
    if (!nudge) return Promise.resolve();
    return runAction(async () => {
      await patchNudge(nudge.id, "clicked");
      const { id } = await createAttempt(nudge.scenario, undefined, "unaided");
      setDraft({ ...INITIAL_DRAFT, scenario: nudge.scenario, attemptId: id, attemptType: "unaided" });
      setPendingNudge(null);
      // Skip situation-picking — the nudge already carries the situation.
      setActiveIndex(FRAME_ORDER.indexOf("details"));
    });
  }

  function handleDismissNudge() {
    const nudge = pendingNudge;
    if (!nudge) return Promise.resolve();
    return runAction(async () => {
      await patchNudge(nudge.id, "dismissed");
      setPendingNudge(null);
    });
  }

  return (
    <div className="nod-stage">
      <BrandHeader />
      <div className="nod-cols">
        <div className="nod-col-prev">
          <Recap frameKey={prevKey} draft={draft} onEdit={() => editFrame(activeIndex - 1)} />
        </div>
        <div className="nod-col-active">
          {error && (
            <div className="nod-recap" style={{ marginBottom: 20, borderColor: "var(--ink-faint)" }}>
              <p style={{ margin: "0 0 10px", fontSize: 14, color: "var(--ink-soft)" }}>{error}</p>
              <button
                type="button"
                onClick={retryLastAction}
                disabled={loading || !lastAction}
                className="nod-btn nod-ghost"
                style={{ padding: "8px 4px" }}
              >
                {loading ? "Retrying…" : "Try again"}
              </button>
            </div>
          )}
          {activeKey === "situation" &&
            (pendingNudge ? (
              <NudgeBanner
                scenarioId={pendingNudge.scenario}
                loading={loading}
                onAccept={handleAcceptNudge}
                onDismiss={handleDismissNudge}
              />
            ) : (
              <SituationFrame onPick={handlePickSituation} loading={loading} />
            ))}
          {activeKey === "details" && (
            <DetailsFrame
              initialWho={draft.who}
              initialAsk={draft.ask}
              initialCtx={draft.ctx}
              onContinue={handleDetailsContinue}
              loading={loading}
            />
          )}
          {activeKey === "choose" && <ChooseFrame onPick={handleChoosePath} loading={loading} />}
          {activeKey === "draft" &&
            (draft.checkCount > 0 || draft.path === "own" ? (
              <DraftFrame
                draft={draft}
                loading={loading}
                onSubmit={(text) => {
                  setDraft((prev) => ({ ...prev, ownText: text }));
                  const masked = maskAllPII(text, maskTokens);
                  // The loop cap (3 checks) was already hit and NOD's own
                  // rewrite still didn't clear the standard — this is the
                  // user's final hand-edit, save it directly rather than
                  // spending a 4th evaluator call.
                  if (draft.checkCount >= 3) {
                    handleSave(masked);
                  } else {
                    runCheck(masked, "own");
                  }
                }}
                onStuck={() => setDraft((prev) => ({ ...prev, helpRequests: prev.helpRequests + 1 }))}
              />
            ) : (
              <NodDraftFrame
                draft={draft}
                loading={loading}
                onGenerate={handleGenerateNodDraft}
                onProceed={handleNodProceed}
                onUnsure={() => setDraft((prev) => ({ ...prev, helpRequests: prev.helpRequests + 1 }))}
              />
            ))}
          {activeKey === "feedback" && (
            <FeedbackFrame
              draft={draft}
              loading={loading}
              onTighten={handleTighten}
              onSave={handleSave}
              onEditRewrite={handleEditRewrite}
            />
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
