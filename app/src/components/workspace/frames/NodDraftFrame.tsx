"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { DraftState } from "../types";

function splitSentences(text: string): string[] {
  return (text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]*/g) ?? []).map((s) => s.trim()).filter(Boolean);
}

const arrow = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 10h12M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type NodDraftFrameProps = {
  draft: DraftState;
  loading: boolean;
  onGenerate: () => void;
  onProceed: () => void;
};

// ④b — NOD drafts it, the user spots what's weak first. journey.md §3 ④b.
export function NodDraftFrame({ draft, loading, onGenerate, onProceed }: NodDraftFrameProps) {
  const [tapped, setTapped] = useState<number | null>(null);
  const [unsure, setUnsure] = useState(false);

  useEffect(() => {
    if (!draft.nodDraftText && !loading) onGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !draft.nodDraftText) {
    return (
      <div>
        <h2 className="nod-f-title">
          First, <em>spot what&rsquo;s weak.</em>
        </h2>
        <p className="nod-f-lede">Writing a first version from your notes…</p>
      </div>
    );
  }

  const lines = splitSentences(draft.nodDraftText);
  const weakQuote = draft.checkResult?.top_misses[0]?.quote ?? null;
  const weakIndex = weakQuote
    ? lines.findIndex((l) => l.toLowerCase().includes(weakQuote.toLowerCase().slice(0, 20)))
    : -1;
  const revealed = tapped !== null || unsure;

  function reveal(index: number, isUnsure: boolean) {
    if (revealed) return;
    setUnsure(isUnsure);
    setTapped(isUnsure ? null : index);
  }

  const why = draft.checkResult?.top_misses[0]?.why ?? "This draft reads clean by the standard — nice work.";

  return (
    <div>
      <h2 className="nod-f-title">
        First, <em>spot what&rsquo;s weak.</em>
      </h2>
      <p className="nod-f-lede">
        I wrote a version from your notes. Before I say a word — which one line would a busy reader trip
        on?
      </p>
      {draft.nodDraftSample && (
        <p className="nod-eg" style={{ marginBottom: 16 }}>
          A generic sample — you gave me no context to work from, so make it yours.
        </p>
      )}

      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-2)", marginBottom: 14 }}>
        Tap the line you&rsquo;d change.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
        {lines.map((line, i) => {
          const isWeak = revealed && i === weakIndex;
          const isPicked = revealed && i === tapped && i !== weakIndex;
          return (
            <button
              key={i}
              type="button"
              disabled={revealed}
              onClick={() => reveal(i, false)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                border: `1px solid ${isWeak ? "var(--ink-faint)" : "var(--line)"}`,
                background: isWeak || isPicked ? "rgba(124,124,115,0.08)" : "var(--card)",
                fontSize: "16.5px",
                lineHeight: 1.6,
                color: "var(--ink)",
                cursor: revealed ? "default" : "pointer",
                padding: "14px 16px",
                margin: 0,
              }}
            >
              {line}
            </button>
          );
        })}
      </div>

      {!revealed && (
        <button className="nod-secondary-path .nod-sp-link" type="button" onClick={() => reveal(-1, true)} style={{ border: 0, background: "transparent", fontSize: "13px", fontWeight: 600, color: "var(--ink-soft)", cursor: "pointer", padding: "6px 2px" }}>
          I&rsquo;m not sure — show me →
        </button>
      )}

      {revealed && (
        <div className="nod-recap" style={{ marginTop: 16, padding: "18px 20px" }}>
          <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: "12.5px", color: "var(--blue-deep)" }}>
            {unsure
              ? "No problem — here's the one I'd watch."
              : tapped === weakIndex
                ? "Nice — that's the one."
                : weakIndex === -1
                  ? "Good eye."
                  : "Good instinct — but here's the one that loses them."}
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>{why}</p>
        </div>
      )}

      {revealed && (
        <div className="nod-actions">
          <Button onClick={onProceed}>Check it against the standard {arrow}</Button>
        </div>
      )}
    </div>
  );
}
