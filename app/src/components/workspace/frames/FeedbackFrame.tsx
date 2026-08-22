"use client";

import { Button } from "@/components/ui/Button";
import type { DraftState } from "../types";

// Renders the draft with the flagged line wrapped in the neutral dotted
// marker (design.md: "the fix-target in the draft gets a neutral dotted
// marker") instead of pulling the line out into its own isolated box —
// the reader sees the miss in the sentence it actually lives in.
function DraftWithMark({ text, quote }: { text: string; quote: string | null }) {
  const paragraphs = text.split("\n\n");
  return (
    <div className="nod-draft-view">
      {paragraphs.map((p, i) => {
        const idx = quote ? p.toLowerCase().indexOf(quote.toLowerCase()) : -1;
        if (idx === -1) return <p key={i}>{p}</p>;
        const before = p.slice(0, idx);
        const match = p.slice(idx, idx + quote!.length);
        const after = p.slice(idx + quote!.length);
        return (
          <p key={i}>
            {before}
            <mark className="nod-mark-neutral">{match}</mark>
            {after}
          </p>
        );
      })}
    </div>
  );
}

// COPY-001: describe message quality, never a promised outcome — "gets a
// busy person to actually reply" claims a result NOD can't guarantee.
function cleanJudgement(wordCount: number): string {
  if (wordCount >= 40 && wordCount <= 125) {
    return "It's short enough to take in at a glance — the kind of length a busy reader actually finishes.";
  }
  return "You lead with your real reason instead of a throat-clearing opener — that's what keeps a reader going.";
}

type FeedbackFrameProps = {
  draft: DraftState;
  loading: boolean;
  onTighten: () => void;
  onSave: () => void;
  onEditRewrite: () => void;
};

// ⑤ — the rejoin + the LOCKED coaching loop. journey.md §3 ⑤.
export function FeedbackFrame({ draft, loading, onTighten, onSave, onEditRewrite }: FeedbackFrameProps) {
  if (loading) {
    return (
      <div>
        <h2 className="nod-f-title">
          Checking it against <em>the standard.</em>
        </h2>
      </div>
    );
  }

  // Third check still failed — NOD wrote a better version. The "we do" beat,
  // earned only after two self-edits.
  if (draft.rewriteText) {
    // AI-001 (round 3): NOD's own rewrite can itself fail to clear B1/B2/B4
    // (rare — it gets two tries internally and keeps the stronger one).
    // Round 1 fixed the dishonest "the version I'd send" framing but still
    // offered a one-click Save on content NOD's own check had just flagged
    // — undermining "coach, not generator." The coaching loop is capped at
    // three checks (locked product model), so this can't just run another
    // check; instead it requires the user to actually touch the text before
    // it can be saved, without spending a 4th evaluator call.
    if (!draft.rewriteCorePass) {
      return (
        <div>
          <h2 className="nod-f-title">
            Still <em>one gap left.</em>
          </h2>
          <p className="nod-f-lede">
            Even NOD&rsquo;s rewrite didn&rsquo;t fully clear the standard. Take a pass on it yourself
            before sending.
          </p>
          <div className="nod-draft-view" style={{ marginBottom: 18 }}>
            {draft.rewriteText.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {draft.rewriteTopMissWhy && (
            <p className="nod-f-lede" style={{ marginBottom: 20 }}>
              {draft.rewriteTopMissWhy}
            </p>
          )}
          <div className="nod-actions">
            <Button onClick={onEditRewrite} disabled={loading}>
              Edit it myself
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2 className="nod-f-title">
          Here&rsquo;s a tighter <em>version.</em>
        </h2>
        <p className="nod-f-lede">
          Two tries in, this is the version I&rsquo;d send — built from what you told me.
        </p>
        <div className="nod-draft-view" style={{ marginBottom: 18 }}>
          {draft.rewriteText.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", marginBottom: 20 }}>
          <b style={{ color: "var(--ink-2)" }}>The move to keep:</b> one clear ask, no soft opener, leads
          with the real reason.
        </p>
        <div className="nod-actions">
          <Button onClick={onSave} disabled={loading}>
            Save
          </Button>
        </div>
      </div>
    );
  }

  const result = draft.checkResult;
  if (!result) return null;

  if (result.core_pass) {
    return (
      <div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 700,
            color: "var(--blue-deep)",
            marginBottom: 12,
          }}
        >
          It&rsquo;s ready
        </span>
        <h2 className="nod-f-title">
          Here&rsquo;s what&rsquo;s <em>working.</em>
        </h2>
        <p className="nod-f-lede">{cleanJudgement(result.deterministic.word_count)}</p>
        <div className="nod-actions">
          <Button onClick={onSave} disabled={loading}>
            Save
          </Button>
        </div>
      </div>
    );
  }

  const miss = result.top_misses[0];
  const canTighten = draft.checkCount < 3;

  return (
    <div>
      <h2 className="nod-f-title">
        One thing <em>to tighten.</em>
      </h2>
      {draft.ownText && (
        <div style={{ marginBottom: 18 }}>
          <DraftWithMark text={draft.ownText} quote={miss?.quote ?? null} />
        </div>
      )}
      <p className="nod-f-lede">{miss?.why}</p>
      <div className="nod-actions">
        <Button onClick={onTighten} disabled={!canTighten}>
          Let me tighten it
        </Button>
      </div>
    </div>
  );
}
