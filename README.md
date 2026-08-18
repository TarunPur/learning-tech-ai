# Learning Tech & AI — v1

An AI-learning product for **non-technical professionals in India** who already use AI daily but can't turn it into independent capability on their own work. v1 is scoped to **one real task, done with the user, end to end** — and framed as an experiment testing whether that produces lasting capability.

> **New here? Read this file, then `v1ProductDetailing.md`, then `v1PRD.md`. That is enough to keep building. Do not re-open decisions already locked (see below).**

---

## Where we are right now (2026-08-19)

- ✅ **Research complete** — secondary + primary (160-response survey; strict target cut n=44). Synthesized into `research/`.
- ✅ **Product direction locked** — `ProblemSolutionBase.md`.
- ✅ **Product detailing locked** — `v1ProductDetailing.md`: **10 decisions, each with its *why* and the rejected alternative.** These are settled; build on them, don't relitigate them.
- ✅ **PRD substantially complete** — `v1PRD.md`. Aha Moment done; **§16 rubric now grounded** in named large-N sources (Gong 304K, Boomerang 40M, Backlinko 12M, Woodpecker 20M, Lavender, Josh Braun 4-T) **and hardened** via `/grill-me` (hybrid evaluation, core/advisory win + loop cap, quality-not-outcome, English-only). §12 trust reasoning + §13 off-scope guardrail added. Only intentional deferrals remain (see §24).
- ⏭️ **Next (intentionally, in this order):** `design.md` (**next artifact — build together**; must precede engineering) → ERD + technical architecture + implementation plan → build.

### The immediate next action
**Create `design.md`** — the visual/UX design for v1, grounded in the locked core loop (`v1PRD.md` §15) and the "super-friendly for an overwhelmed non-tech user" mandate. As part of it, resolve the design-owned open questions in §24 (auto-mask mechanism; Aha-staging "rough → shaped" contrast; how the rubric surfaces as feedback in the UI). **Deferred, do not do now:** numeric success targets (§9) stay `[TBD — before build]`, to be set *after* design, framed within-subject; and the rubric's empirical discrimination test is a before-build gate. **Do not write the ERD / architecture / build milestones until `design.md` is finalised.**

---

## Do NOT re-decide these (locked in `v1ProductDetailing.md`)

1. v1 is the experiment, not a product that assumes its thesis
2. Direction-led promise; comprehension handled by doing-it-*with*-them
3. Anchored on **Marketing/Sales → outreach-message drafting** (the data plurality)
4. Success = first real win now; later unaided attempt **instrumented, not gated**
5. The one v1 artifact = a recurring **persuasive outreach message**
6. Front door = **concrete-example entry** (no blank box)
7. **Fading scaffolding** ("I do → we do → you do")
8. Judgment = fixed expert **rubric** shown as concrete feedback, **never a score**
9. Data safety = **silent auto-mask** + reassurance (no up-front gate)
10. Re-engagement = **one outcome-tied nudge** (no streaks)

If you believe one of these is wrong, read its *why* and rejected-alternative in `v1ProductDetailing.md` first — then raise it explicitly. They were reached through two `/grill-me` sessions and confirmed by the owner.

---

## Repository map

| Path | What it is | When you need it |
|---|---|---|
| `README.md` | This file — current state + next action | Always first |
| `v1PRD.md` | **The living PRD we are building on** | Primary working doc |
| `v1ProductDetailing.md` | The 10 locked decisions + deferred scope | Before proposing any product change |
| `ProblemSolutionBase.md` | Product direction / ground truth | Background on *why this product* |
| `codexmemory.md` | Session-handover log + data-integrity rules | To understand history & guardrails |
| `research/` | Evidence & lineage (insights, secondary/primary research, sources, dashboard) | To trace any claim back to its source |
| `reference/` | PRD template, original case brief, prior-feedback guardrails, **superseded** `Initialplan.md` | Format reference & history |

---

## Confidence tags (used throughout the PRD)

- 🟢 **Directly verified** in our primary-research responses (n=160; strict cut n=44)
- 🟡 **Supported by secondary evidence** (transfer literature / competitor landscape)
- 🔵 **Hypothesis**, not yet validated by our responses
- 🔴 **Contradicted**

Most **problem/user** claims are 🟢. The **solution mechanism** is 🔵 on purpose — validating it is the point of v1.

---

## Data & privacy note

The **raw survey workbooks are intentionally excluded** from this repo (see `.gitignore`) — they contain respondent PII (emails, names, timestamps). Their *insights* live PII-free in `research/`. The dashboard (`research/AI_Learning_Research_Dashboard.html`) is pre-rendered and PII-free; its generator (`research/build_dashboard.py`) needs the local (excluded) workbook to re-run.

---

*Stack (for later, post-design): Next.js · TypeScript (strict) · Supabase (RLS) · Tailwind. AI calls are server-owned; the model is invisible to the user.*
