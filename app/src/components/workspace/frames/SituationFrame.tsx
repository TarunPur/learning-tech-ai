"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SITUATIONS, classifyTask, type ScenarioId } from "@/lib/flow";

const arrow = (size = 19) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M4 10h12M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type SituationFrameProps = {
  onPick: (scenario: ScenarioId, customText: string) => void;
  loading?: boolean;
};

export function SituationFrame({ onPick, loading = false }: SituationFrameProps) {
  const [showEscape, setShowEscape] = useState(false);
  const [text, setText] = useState("");
  const [warning, setWarning] = useState(false);
  const [refused, setRefused] = useState(false);

  function handleContinue() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const classification = classifyTask(trimmed);
    if (classification.kind === "abuse") {
      setRefused(true);
      setWarning(false);
      return;
    }
    setRefused(false);
    if (classification.kind === "outreach") {
      onPick("custom", trimmed);
      return;
    }
    setWarning(true);
  }

  return (
    <div>
      <h2 className="nod-f-title">
        What are you <em>working on?</em>
      </h2>
      <p className="nod-f-lede">Pick the situation closest to yours. You&rsquo;ll make it specific next.</p>

      {SITUATIONS.map((s) => (
        <Card
          as="button"
          key={s.id}
          className="nod-primary-path"
          style={{ padding: "26px 28px", marginBottom: 12 }}
          onClick={() => onPick(s.id, "")}
          disabled={loading}
        >
          <p className="nod-pp-k">Start here</p>
          <span className="nod-pp-row">
            <span className="nod-pp-title">{s.title}</span>
            <span className="nod-pp-arrow">{arrow()}</span>
          </span>
          <p className="nod-pp-sub">{s.desc}</p>
        </Card>
      ))}

      <div className="nod-secondary-path">
        <p className="nod-sp-q">Something else?</p>
        <p className="nod-sp-copy">
          A different outreach message that doesn&rsquo;t fit these four? Tell me in a line — I&rsquo;ll
          shape it into the same flow.
        </p>
        {!showEscape ? (
          <button className="nod-sp-link" type="button" onClick={() => setShowEscape(true)}>
            A different outreach message {arrow(16)}
          </button>
        ) : (
          <div style={{ marginTop: 16 }}>
            <div className="nod-field" style={{ marginBottom: 0 }}>
              <div className="nod-ipt">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. a thank-you note to a client who just renewed"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setWarning(false);
                    setRefused(false);
                  }}
                />
              </div>
            </div>
            {refused && (
              <div className="nod-recap" style={{ marginTop: 16 }}>
                <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: "13.5px", color: "var(--ink-2)" }}>
                  I can&rsquo;t help with that one
                </p>
                <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>
                  Try describing the outreach message you actually want to write.
                </p>
              </div>
            )}
            {warning && (
              <div className="nod-recap" style={{ marginTop: 16 }}>
                <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: "13.5px", color: "var(--ink-2)" }}>
                  That reads bigger than a message
                </p>
                <p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--ink-soft)" }}>
                  NOD coaches short outreach — emails, follow-ups, intros — not documents like proposals
                  or decks. If it&rsquo;s really an outreach message, we can shape it as one.
                </p>
                <Button onClick={() => onPick("custom", text.trim())} disabled={loading}>
                  Shape it as a message anyway {arrow(16)}
                </Button>
              </div>
            )}
            <div className="nod-actions" style={{ marginTop: 18 }}>
              <Button onClick={handleContinue} disabled={text.trim() === "" || loading}>
                Continue {arrow()}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
