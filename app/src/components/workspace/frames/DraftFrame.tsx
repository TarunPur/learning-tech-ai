"use client";

import { scenario } from "@/lib/flow";
import type { DraftState } from "../types";

// Placeholder for Phase 4's DoD ("navigate ... to an empty draft frame").
// Phase 6 wires this up to the real evaluator and the coaching loop.
export function DraftFrame({ draft }: { draft: DraftState }) {
  const isCustom = draft.scenario === "custom";
  const sc = draft.scenario && draft.scenario !== "custom" ? scenario(draft.scenario) : null;
  const situationTitle = isCustom ? draft.customText || "A different outreach message" : sc?.title ?? "—";

  return (
    <div>
      <h2 className="nod-f-title">
        Write your first version — <em>in your words.</em>
      </h2>
      <p className="nod-f-lede">
        Rough is fine — your situation&rsquo;s right here. When you&rsquo;re ready, I&rsquo;ll check it.
      </p>

      <div style={{ marginBottom: 22, display: "grid", gap: 11 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ flex: "none", width: 78, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Situation
          </span>
          <span style={{ fontSize: "14.5px", color: "var(--ink-2)" }}>{situationTitle}</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ flex: "none", width: 78, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Writing to
          </span>
          <span style={{ fontSize: "14.5px", color: "var(--ink-2)" }}>{draft.who || "—"}</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ flex: "none", width: 78, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Your ask
          </span>
          <span style={{ fontSize: "14.5px", color: "var(--ink-2)" }}>{draft.ask || "—"}</span>
        </div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "20px 22px" }}>
        <textarea
          rows={5}
          placeholder="Start with “Hi …”, say why you're really reaching out, then make one clear ask."
          style={{ width: "100%", border: 0, background: "transparent", fontSize: "16.5px", lineHeight: 1.74, resize: "vertical", minHeight: 140, outline: "none" }}
        />
      </div>
      <p style={{ marginTop: 16, fontSize: "12.5px", color: "var(--ink-faint)" }}>
        The real check comes in Phase 5/6.
      </p>
    </div>
  );
}
