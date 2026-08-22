"use client";

import { Button } from "@/components/ui/Button";
import type { DraftState } from "../types";

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
};

// ⑤ — the rejoin + the LOCKED coaching loop. journey.md §3 ⑤.
export function FeedbackFrame({ draft, loading, onTighten, onSave }: FeedbackFrameProps) {
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
    // AI-001: NOD's own rewrite can itself fail to clear B1/B2/B4 (rare —
    // it gets two tries internally and keeps the stronger one) — that must
    // never be presented as "the version I'd send."
    if (!draft.rewriteCorePass) {
      return (
        <div>
          <h2 className="nod-f-title">
            Still <em>one gap left.</em>
          </h2>
          <p className="nod-f-lede">
            Even NOD&rsquo;s rewrite didn&rsquo;t fully clear the standard — here&rsquo;s the closest version,
            and what&rsquo;s still off.
          </p>
          <div style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "26px 28px", marginBottom: 18 }}>
            {draft.rewriteText.split("\n\n").map((p, i) => (
              <p key={i} style={{ margin: "0 0 15px", fontSize: "16.5px", lineHeight: 1.74 }}>
                {p}
              </p>
            ))}
          </div>
          {draft.rewriteTopMissWhy && (
            <p className="nod-f-lede" style={{ marginBottom: 20 }}>
              {draft.rewriteTopMissWhy}
            </p>
          )}
          <div className="nod-actions">
            <Button onClick={onSave} disabled={loading}>
              Save anyway
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
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "26px 28px", marginBottom: 18 }}>
          {draft.rewriteText.split("\n\n").map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? "0 0 15px" : "0 0 15px", fontSize: "16.5px", lineHeight: 1.74 }}>
              {p}
            </p>
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
      {miss?.quote && (
        <div className="nod-recap" style={{ marginBottom: 20 }}>
          <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Your line
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16, color: "var(--ink)" }}>
            &ldquo;{miss.quote}&rdquo;
          </p>
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
