"use client";

import { useState } from "react";
import { scenario } from "@/lib/flow";
import { Button } from "@/components/ui/Button";
import type { DraftState } from "../types";

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

type DraftFrameProps = {
  draft: DraftState;
  loading: boolean;
  onSubmit: (text: string) => void;
  onStuck?: () => void;
};

// ④a — write your own (the default path). journey.md §3 ④a.
export function DraftFrame({ draft, loading, onSubmit, onStuck }: DraftFrameProps) {
  const [text, setText] = useState(draft.ownText || draft.reuseSeed);
  const [stuckRevealed, setStuckRevealed] = useState(false);
  const reediting = draft.checkCount > 0;
  // The coaching loop is capped at three checks (locked product model) —
  // once NOD's own rewrite has also been generated (checkCount reaches 3),
  // this frame is a final hand-edit before Save, not another check.
  const finalizing = draft.checkCount >= 3;
  const unaided = draft.attemptType === "unaided" && !reediting;
  // Help fades on repeat visits (Decision 11 / journey.md §7): an unaided
  // attempt gets lighter scaffolding by default, with a quiet way back in.
  const light = reediting || unaided;

  const isCustom = draft.scenario === "custom";
  const sc = draft.scenario && draft.scenario !== "custom" ? scenario(draft.scenario) : null;
  const situationTitle = isCustom ? draft.customText || "A different outreach message" : sc?.title ?? "—";

  const title = finalizing ? (
    <>
      Make it yours — <em>then send.</em>
    </>
  ) : reediting ? (
    <>
      Tighten your version — <em>in your words.</em>
    </>
  ) : (
    <>
      Write your first version — <em>in your words.</em>
    </>
  );
  const lede = finalizing
    ? "This is NOD's closest attempt — edit it until it's something you'd actually send, then save it."
    : reediting
      ? "Tighten it in your own words, then check it against the standard again."
      : unaided
        ? "Your details are right here — take it from the top, in your own words."
        : "Rough is fine — your situation's right here. When you're ready, I'll check it.";
  const recipe = 'Start with "Hi …", say why you\'re really reaching out, then make one clear ask.';

  return (
    <div>
      <h2 className="nod-f-title">{title}</h2>
      <p className="nod-f-lede">{lede}</p>
      {!draft.ownText && draft.reuseSeed && !reediting && (
        <p className="nod-eg" style={{ marginTop: -20, marginBottom: 22 }}>
          Starting from a saved message — adapt it for this one.
        </p>
      )}

      <div style={{ marginBottom: 22, display: "grid", gap: 11 }}>
        <BriefRow label="Situation" value={situationTitle} />
        <BriefRow label="Writing to" value={draft.who || "—"} />
        {draft.ctx && <BriefRow label="Context" value={draft.ctx} />}
        <BriefRow label="Your ask" value={draft.ask || "—"} />
      </div>

      {reediting && draft.lastFixWhy && (
        <div className="nod-recap" style={{ marginBottom: 20, padding: "16px 20px" }}>
          <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "12.5px", color: "var(--blue-deep)" }}>
            One thing to tighten
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>{draft.lastFixWhy}</p>
        </div>
      )}

      <div style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "20px 22px" }}>
        <textarea
          rows={5}
          placeholder={light && !stuckRevealed ? "Write your message…" : recipe}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            border: 0,
            background: "transparent",
            fontSize: "16.5px",
            lineHeight: 1.74,
            resize: "vertical",
            minHeight: 140,
            outline: "none",
          }}
        />
      </div>

      <div className="nod-actions">
        <Button disabled={text.trim() === "" || loading} onClick={() => onSubmit(text.trim())}>
          {loading ? (finalizing ? "Saving…" : "Checking…") : finalizing ? "Save" : "Check it against the standard"}{" "}
          {!loading && !finalizing && arrow}
        </Button>
      </div>

      {unaided && !stuckRevealed && (
        <div style={{ marginTop: 16 }}>
          <button
            className="nod-linkbtn"
            type="button"
            onClick={() => {
              setStuckRevealed(true);
              onStuck?.();
            }}
            style={{ border: 0, background: "transparent", fontSize: 13, fontWeight: 600, color: "var(--ink-soft)", cursor: "pointer", padding: "6px 2px" }}
          >
            Stuck? Show me the starting moves
          </button>
        </div>
      )}
    </div>
  );
}

function BriefRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <span
        style={{
          flex: "none",
          width: 78,
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          color: "var(--ink-faint)",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "14.5px", color: "var(--ink-2)" }}>{value}</span>
    </div>
  );
}
