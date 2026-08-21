"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ASK_SUGGESTIONS, firstName } from "@/lib/flow";

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

type DetailsFrameProps = {
  initialWho: string;
  initialAsk: string;
  initialCtx: string;
  onContinue: (values: { who: string; ask: string; ctx: string }) => void;
};

export function DetailsFrame({ initialWho, initialAsk, initialCtx, onContinue }: DetailsFrameProps) {
  const [who, setWho] = useState(initialWho);
  const [ask, setAsk] = useState(initialAsk);
  const [ctx, setCtx] = useState(initialCtx);

  const askShown = who.trim().length >= 2;
  const ctxShown = askShown && ask.trim().length >= 2;
  const name = firstName(who);
  const canContinue = who.trim() !== "" && ask.trim() !== "";

  return (
    <div>
      <h2 className="nod-f-title">
        Tell me about <em>this one.</em>
      </h2>
      <p className="nod-privacy">One question at a time. NOD masks real names before anything is processed.</p>

      <div className="nod-field">
        <label htmlFor="who">Who are you writing to?</label>
        <div className="nod-ipt">
          <input
            id="who"
            type="text"
            autoComplete="off"
            placeholder="A name and how you know them"
            value={who}
            onChange={(e) => setWho(e.target.value)}
          />
        </div>
        <p className="nod-eg">e.g. Nidhi, a marketing lead I met in June</p>
        {name !== "there" && (
          <span className="nod-masknote" style={{ display: "inline-flex" }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 9V6.5a4 4 0 0 1 8 0V9M5 9h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              Masked before processing — you&rsquo;ll still see <b>{name}</b> in your draft.
            </span>
          </span>
        )}
      </div>

      {askShown && (
        <div className="nod-field">
          <label htmlFor="ask">What&rsquo;s the one thing you&rsquo;re asking for?</label>
          <div className="nod-ipt">
            <input
              id="ask"
              type="text"
              autoComplete="off"
              placeholder="One clear, easy request"
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
            />
          </div>
          {ask.trim() === "" && (
            <div className="nod-suggest">
              <span className="nod-sl">Not sure how to phrase it? Try:</span>
              {ASK_SUGGESTIONS.map((s) => (
                <Chip key={s} onClick={() => setAsk(s)}>
                  {s}
                </Chip>
              ))}
            </div>
          )}
        </div>
      )}

      {ctxShown && (
        <div className="nod-field">
          <label htmlFor="ctx">
            Anything that makes now the moment? <span style={{ fontWeight: 400, color: "var(--ink-faint)" }}>Optional</span>
          </label>
          <div className="nod-ipt">
            <textarea
              id="ctx"
              rows={2}
              placeholder="A reason it's worth reaching out today"
              value={ctx}
              onChange={(e) => setCtx(e.target.value)}
            />
          </div>
          <p className="nod-eg">e.g. we spoke at the expo and she asked me to follow up</p>
        </div>
      )}

      <div className="nod-actions">
        <Button
          disabled={!canContinue}
          onClick={() => onContinue({ who: who.trim(), ask: ask.trim(), ctx: ctx.trim() })}
        >
          Continue {arrow}
        </Button>
      </div>
    </div>
  );
}
