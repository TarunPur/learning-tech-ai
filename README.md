# Learning Tech & AI — v1

An AI-learning product for **non-technical professionals in India** who already use AI daily but can't turn it into independent capability on their own work. v1 is scoped to **one real task, done with the user, end to end** — and framed as an experiment testing whether that produces lasting capability.

> **New here? Read this file, then `v1ProductDetailing.md`, then `v1PRD.md`. That is enough to keep building. Do not re-open decisions already locked (see below).**

---

## Where we are right now (2026-08-19)

> **Resuming a session?** Read **`NEXT-SESSION.md`** first — it's the paste-ready handoff, kept current at the end of every session (per `CLAUDE.md`).

- ✅ **Research complete** — secondary + primary (160-response survey; strict target cut n=44). Synthesized into `research/`.
- ✅ **Product direction locked** — `ProblemSolutionBase.md`.
- ✅ **Product detailing locked** — `v1ProductDetailing.md`: **11 decisions, each with its *why* and the rejected alternative** *(Decisions 7 & 8 amended, Decision 11 added 2026-08-21)*. These are settled; build on them, don't relitigate them.
- ✅ **PRD substantially complete** — `v1PRD.md`. Aha Moment done; **§16 rubric now grounded** in named large-N sources (Gong 304K, Boomerang 40M, Backlinko 12M, Woodpecker 20M, Lavender, Josh Braun 4-T) **and hardened** via `/grill-me` (hybrid evaluation, core/advisory win + loop cap, quality-not-outcome, English-only). §12 trust reasoning + §13 off-scope guardrail added. Only intentional deferrals remain (see §24).
- 🎨 **Design in progress** — `PRODUCT.md` (impeccable product context) + `DESIGN.md` (design system, canonical format) created. **Screen 1 (recognition home)** has a committed *direction* — **editorial, warm-neutral + a single blue accent (no green), serif statement + staggered recognition cards** — built at `design/mockups/recognition-editorial-blue.html`. Visual system named **"The Calm Correspondent."** Desktop-primary for now. **⚠️ Screen 1 is WIP / not signed off** (open questions in `DESIGN.md` → "Status & Roadmap"). Built with the `impeccable` skill; mockups render standalone (serve `design/mockups/` over http and open the file).
- 🔀 **Core-solution fork RESOLVED (2026-08-21).** The guided loop made the user a passive spectator (no real learning). Owner locked: **spine = a "get better" coach** (Decision 11) and a **two-path loop with *write your own draft* as the default** (Decision 7 amended), both feeding a **real rubric that reads the user's own text** (Decision 8 clarified). See `NEXT-SESSION.md` and `v1ProductDetailing.md`.
- ⏭️ **Next (in order):** owner's **design.md / journey.md** pass to absorb the two-path loop → resolve remaining §24 design decisions → ERD + implementation plan → build. *(The `design/mockups/` prototype still shows the old single AI-led flow + a faked rubric check; it needs reworking to the two paths + a real evaluator when built.)*

> **Note (macOS):** on this case-insensitive filesystem `design.md` and `DESIGN.md` are the **same file** — the canonical impeccable `DESIGN.md`.

### The immediate next action
**Finalize Screen 1, then design screens 2–6.** The visual/UX design is underway (see `DESIGN.md` + `design/mockups/`). Screen 1's *direction* is set but **not locked** — open design questions remain (serif warmth vs. a low-confidence user; whether the "something else" scoped input should demote to a link; reintroducing a credibility/"expert-standard" cue on entry; mobile treatment; placeholder name). Resolve the design-owned §24 questions as part of screens 2–6 (auto-mask mechanism; Aha-staging "rough → shaped"; how the rubric surfaces as feedback). **Deferred, do not do now:** numeric success targets (§9) stay `[TBD — before build]`; **do not write the ERD / architecture / build milestones until design is finalised.**

---

## Do NOT re-decide these (locked in `v1ProductDetailing.md`)

1. v1 is the experiment, not a product that assumes its thesis
2. Direction-led promise; comprehension handled by doing-it-*with*-them
3. Anchored on **Marketing/Sales → outreach-message drafting** (the data plurality)
4. Success = first real win now; later unaided attempt **instrumented, not gated**
5. The one v1 artifact = a recurring **persuasive outreach message**
6. Front door = **concrete-example entry** (no blank box)
7. **Two entry paths, user's choice; default = write your own draft** — help fades to unaided *(amended 2026-08-21; was "AI-led first attempt")*
8. Judgment = fixed expert **rubric** shown as concrete feedback, **never a score** *(now evaluates the user's own draft)*
9. Data safety = **silent auto-mask** + reassurance (no up-front gate)
10. Re-engagement = **one outcome-tied nudge** (no streaks)
11. **Spine = a "get better" coach, not a "get it done" assistant** *(added 2026-08-21 — resolves the core-solution fork)*

If you believe one of these is wrong, read its *why* and rejected-alternative in `v1ProductDetailing.md` first — then raise it explicitly. They were reached through two `/grill-me` sessions and confirmed by the owner.

---

## Repository map

| Path | What it is | When you need it |
|---|---|---|
| `README.md` | This file — current state + next action | Always first |
| `NEXT-SESSION.md` | Paste-ready handoff to resume; refreshed at each session's end | To resume from where we left off |
| `CLAUDE.md` | Standing session instructions (incl. the handoff-update rule) | Auto-loaded each session |
| `v1PRD.md` | **The living PRD we are building on** | Primary working doc |
| `v1ProductDetailing.md` | The 10 locked decisions + deferred scope | Before proposing any product change |
| `DESIGN.md` (== `design.md`) | Design system (canonical impeccable format) + Screen 1 spec + Status/Roadmap | Before any design/UI work |
| `PRODUCT.md` | Durable product context the `impeccable` design skill reads | Design tooling context |
| `design/mockups/` | Screen-1 HTML explorations (authoritative: `recognition-editorial-blue.html`) | To see / iterate the actual screens |
| `.impeccable/` | Design-system sidecar (`design.json`) + skill config | Design tooling internals |
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
