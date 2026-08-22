"use client";

import { Card } from "@/components/ui/Card";

const arrow = (size = 20) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M4 10h12M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth={size >= 20 ? "1.9" : "1.8"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type ChooseFrameProps = {
  onPick: (path: "own" | "nod") => void;
  loading?: boolean;
};

// Deliberately unequal weight — never a 50/50 pair (Decision 7): a tired user
// always taps "do it for me." The loud default is write-your-own.
export function ChooseFrame({ onPick, loading = false }: ChooseFrameProps) {
  return (
    <div>
      <h2 className="nod-f-title">
        How do you want <em>to start?</em>
      </h2>
      <p className="nod-f-lede">
        Start with your own words. If you&rsquo;re stuck, NOD can give you something to react to.
      </p>

      <Card
        as="button"
        className="nod-primary-path"
        style={{ padding: "17px 24px" }}
        onClick={() => onPick("own")}
        disabled={loading}
      >
        <p className="nod-pp-k">Start here</p>
        <span className="nod-pp-row">
          <span className="nod-pp-title">Write my first version</span>
          <span className="nod-pp-arrow">{arrow()}</span>
        </span>
        <p className="nod-pp-sub">Put down a rough version. NOD will show you what to tighten.</p>
      </Card>

      <div className="nod-secondary-path">
        <p className="nod-sp-q">Not sure where to start?</p>
        <p className="nod-sp-copy">
          NOD writes a first version. You&rsquo;ll tap the one line you would change before NOD weighs in.
        </p>
        <button className="nod-sp-link" type="button" onClick={() => onPick("nod")} disabled={loading}>
          Start with a NOD draft {arrow(16)}
        </button>
      </div>
    </div>
  );
}
