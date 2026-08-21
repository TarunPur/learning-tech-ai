"use client";

import { Button } from "@/components/ui/Button";
import type { ScenarioId } from "@/lib/flow";

// A question phrased around the same situation, matching journey.md §7's
// example line ("Got another prospect who's gone quiet?").
const NUDGE_PROMPT: Record<ScenarioId, string> = {
  quiet: "Got another prospect who's gone quiet?",
  cold: "Reaching out to someone new again?",
  meeting: "Another meeting or demo to book?",
  event: "Following up after another event?",
  custom: "Got another one like last time?",
};

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

type NudgeBannerProps = {
  scenarioId: ScenarioId;
  loading: boolean;
  onAccept: () => void;
  onDismiss: () => void;
};

// The outcome-tied nudge (Decision 10) — one calm callback pinned to the
// user's last completed situation, inviting an unaided re-attempt.
export function NudgeBanner({ scenarioId, loading, onAccept, onDismiss }: NudgeBannerProps) {
  return (
    <div>
      <h2 className="nod-f-title">
        {NUDGE_PROMPT[scenarioId].replace("?", "")} <em>Do it yourself?</em>
      </h2>
      <p className="nod-f-lede">
        Do the next one yourself — I&rsquo;ll jump in if you get stuck.
      </p>
      <div className="nod-actions">
        <Button onClick={onAccept} disabled={loading}>
          Do the next one myself {arrow}
        </Button>
        <button className="nod-btn nod-ghost" type="button" onClick={onDismiss} disabled={loading}>
          Not right now
        </button>
      </div>
    </div>
  );
}
