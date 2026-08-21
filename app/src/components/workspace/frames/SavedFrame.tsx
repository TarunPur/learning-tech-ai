"use client";

import { useEffect, useState } from "react";
import { fetchMessages, type SavedMessage } from "@/lib/api-client";
import { recallName } from "@/lib/name-map";
import { unmaskName } from "@/lib/masking";

function relativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

type SavedFrameProps = {
  savedMessageId: string | null;
  savedTextMasked: string;
  onReuse: (textMasked: string) => void;
  onStartNew: () => void;
};

export function SavedFrame({ savedMessageId, savedTextMasked, onReuse, onStartNew }: SavedFrameProps) {
  const [messages, setMessages] = useState<SavedMessage[] | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchMessages()
      .then(({ messages }) => setMessages(messages))
      .catch(() => setMessages([]));
  }, [savedMessageId]);

  function handleCopy() {
    if (!savedMessageId) return;
    const realName = recallName(savedMessageId);
    const toCopy = realName ? unmaskName(savedTextMasked, realName) : savedTextMasked;
    navigator.clipboard.writeText(toCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <h2 className="nod-f-title">
        Saved to your <em>history.</em>
      </h2>

      {savedTextMasked && (
        <>
          <div style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "26px 28px", marginBottom: 12 }}>
            {savedTextMasked.split("\n\n").map((p, i) => (
              <p key={i} style={{ margin: "0 0 15px", fontSize: "16.5px", lineHeight: 1.74 }}>
                {p}
              </p>
            ))}
          </div>
          <div className="nod-actions" style={{ marginTop: 0, marginBottom: 40 }}>
            <button className="nod-btn nod-ghost" type="button" onClick={handleCopy} style={{ paddingLeft: 4 }}>
              {copied ? "Copied — real name restored" : "Copy to send"}
            </button>
          </div>
        </>
      )}

      <div className="nod-saved">
        <h3
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
            marginBottom: 6,
          }}
        >
          Your saved messages
        </h3>
        {messages === null && <p className="nod-eg">Loading…</p>}
        {messages?.map((m) => (
          <div
            key={m.id}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 2px", borderTop: "1px solid var(--line)" }}
          >
            <span style={{ minWidth: 0, flex: 1 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--ink)" }}>{m.title}</span>
                {m.id === savedMessageId && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--blue-deep)",
                      background: "var(--blue-tint)",
                      padding: "3px 9px",
                    }}
                  >
                    just saved
                  </span>
                )}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "var(--ink-soft)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginTop: 2,
                }}
              >
                {m.text_masked}
              </span>
              {m.ask && (
                <span style={{ display: "block", fontSize: 12, color: "var(--ink-faint)", marginTop: 4 }}>
                  Asked for: {m.ask}
                </span>
              )}
            </span>
            <span style={{ fontSize: "12.5px", color: "var(--ink-faint)", flex: "none" }}>{relativeDate(m.created_at)}</span>
            <button
              type="button"
              onClick={() => onReuse(m.text_masked)}
              style={{ border: 0, background: "transparent", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "var(--blue)", cursor: "pointer", flex: "none", padding: "6px 2px" }}
            >
              Reuse →
            </button>
          </div>
        ))}
      </div>

      <div className="nod-secondary-path" style={{ marginTop: 40 }}>
        <p className="nod-sp-copy" style={{ marginBottom: 14 }}>
          Got another prospect who&rsquo;s gone quiet? Do the next one yourself — I&rsquo;ll jump in if you
          get stuck.
        </p>
        <button className="nod-sp-link" type="button" onClick={onStartNew}>
          Start the next one →
        </button>
      </div>
    </div>
  );
}
