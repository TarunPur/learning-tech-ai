"use client";

import { useState } from "react";
import { BrandHeader } from "@/components/ui/BrandHeader";
import type { ScenarioId } from "@/lib/flow";
import { SituationFrame } from "./frames/SituationFrame";
import { DetailsFrame } from "./frames/DetailsFrame";
import { ChooseFrame } from "./frames/ChooseFrame";
import { DraftFrame } from "./frames/DraftFrame";
import { Recap } from "./Recap";
import { FRAME_ORDER, INITIAL_DRAFT, resetFor, type DraftState, type FrameKey } from "./types";

export function Workspace() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [draft, setDraft] = useState<DraftState>(INITIAL_DRAFT);

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

  function editFrame(index: number) {
    setActiveIndex(index);
  }

  return (
    <div className="nod-stage">
      <BrandHeader />
      <div className="nod-cols">
        <div className="nod-col-prev">
          <Recap frameKey={prevKey} draft={draft} onEdit={() => editFrame(activeIndex - 1)} />
        </div>
        <div className="nod-col-active">
          {activeKey === "situation" && (
            <SituationFrame
              onPick={(scenario: ScenarioId, customText: string) => {
                commitFrame("situation", { scenario, customText });
                advance();
              }}
            />
          )}
          {activeKey === "details" && (
            <DetailsFrame
              initialWho={draft.who}
              initialAsk={draft.ask}
              initialCtx={draft.ctx}
              onContinue={(values) => {
                commitFrame("details", values);
                advance();
              }}
            />
          )}
          {activeKey === "choose" && (
            <ChooseFrame
              onPick={(path) => {
                commitFrame("choose", { path });
                advance();
              }}
            />
          )}
          {activeKey === "draft" && <DraftFrame draft={draft} />}
        </div>
      </div>
    </div>
  );
}
