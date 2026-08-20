---
title: v1 Product Detailing — Learning Tech & AI ("Outreach" first loop)
status: locked-product-detailing (Decisions 7 & 8 amended + Decision 11 added 2026-08-21)
scope: PRODUCT DETAILING ONLY — no ERD, no technical architecture, no implementation plan (those come after design)
last_updated: 2026-08-21
project_directory: /Users/tarunpuri/Desktop/Learning Tech AI
builds_on: ProblemSolutionBase.md (product direction), NonTechnical_User_Causal_Insights.md, CompetitiveLandscape.md
reached_via: /grill-me session (grilling skill), 4 rounds, 10 decisions, all confirmed by owner
raw_data_verified: AI & Tech for next gen professionals (Responses) (1).xlsx — strict cut n=44 recomputed from source
next_artifacts: PRD (immediate next) -> design.md (owner will share) -> ERD + implementation plan
---

# v1 Product Detailing — Learning Tech & AI ("Outreach" first loop)

## For the next agent / session (read this first)

This is the **locked product detailing** for v1 — the *what* and the *why*, not the *how-to-build*. It sits one level below `ProblemSolutionBase.md` (which locked the product direction) and one level above the artifacts still to come. **It deliberately contains no ERD, no technical architecture, and no implementation milestones** — those are sequenced *after* the design is finalised. The immediate next artifact is the **PRD**, which the owner and Claude will write together using this file as the source of truth.

If you are here to change direction: read the "Decision log" — every choice has a documented reason and a rejected alternative, so you can see what breaks if you flip it.

> **⚠️ Amendment — 2026-08-21 (core-solution fork resolved).** A working session found that the original guided loop made the user a **passive spectator** (NOD wrote, checked, and fixed — so nothing transferred, breaking the "you get *better*" promise). The owner resolved the long-open fork: **spine = a "get better" coach (new Decision 11)**, and the core loop now offers **two entry paths with *writing your own draft* as the default** (amended Decision 7), both ending at a **real rubric that reads the user's own text** (clarified Decision 8). The original "AI-led first attempt" is now the escape hatch, not the default. These three changes ripple into the core-loop steps below, `v1PRD.md` (§12/§13/§15/§16/§25), `PRODUCT.md`, and `design.md`.

**Work sequence:** Product detailing (this file) → **PRD (next)** → `design.md` (owner will share) → ERD + implementation plan → build.

## Why we are building this (the problem, evidenced)

Non-technical professionals in India already use AI every day, but a third stay unconfident and the gap isn't closing on its own. The market answer to date is course catalogs, gamified streak apps, certifications, and "pick your AI tool" interfaces — all well-represented across the 32-competitor landscape (`CompetitiveLandscape.md`), none of which closes the loop for someone who just wants their *own recurring task* done and to be able to do it again next time.

**All headline figures were re-verified directly against the raw workbook (strict cut n=44), not taken from summaries:**

- **Target = non-builder role AND no formal tech education = 44/160 (~28%).** Only **9%** build anything with AI; **36%** are ≤3/5 confident; **64%** use AI every single day. Education, not job title, is the real technical divider.
- **Blocker #1 is "don't know where to start" (36%).** Then a 25% three-way tie: not-enough-practice / too-theoretical / **concepts-too-difficult** (the last is specific to the no-tech-education group — it forced decision 2).
- **Only 55% regularly learn about AI.** Nearly half use AI but don't self-identify as learners — the product must sell *utility*, never *learning* (decisions 2, 10).
- **Marketing/Sales is the role plurality (20%)**; its core recurring task is drafting → decision 3.
- **Willingness-to-pay is soft** (11% "definitely", 9% hard-no) → validates free-in-v1.
- **"Learn by solving real-life challenges" is the top engagement pick (64%)** → supports practice-on-your-own-task over generic exercises.

**Intended outcome of v1.** A shippable, genuinely friendly product that gets a Marketing/Sales user to *one real outreach-message win*, leaves a reusable artifact, and instruments (without depending on) a later unaided re-attempt — so we learn whether the core mechanism actually transfers capability. **v1 is an experiment, not a bet cashed.**

## How we got here (provenance)

1. `ProblemSolutionBase.md` locked the product direction via an earlier grill.
2. This session read the raw primary-research workbook directly (PII excluded; multi-select matched on full option strings — some labels contain commas). This confirmed the direction's headline numbers **and surfaced new nuance the summaries missed** (n=44 profile vs the looser n=84 proxy): "concepts too difficult" at 25%, image-generation as the excluded #2 use, only-55%-are-learners, Marketing/Sales plurality, softer WTP.
3. A 4-round `/grill-me` stress-tested the fundamentals against the constraint "**super user-friendly for an overwhelmed non-tech user.**" All 10 decisions confirmed by the owner.

## Decision log (what we chose, why, and what we rejected)

**1. v1 is the experiment, not a product that assumes its thesis.**
*Why:* the core mechanism — "they don't get practice on their own work" — was **never directly asked in the survey** (`codexmemory.md` says so); it's bridged by secondary transfer-literature. So v1 is the cheapest honest test of "practice-on-own-task → independent capability."
*Rejected:* accept-as-validated-and-build-the-full-thing; drop-the-practice-claim-entirely.

**2. Direction-led promise; comprehension handled implicitly by doing-it-with-them.**
*Why:* the visible promise is "get your task done"; "too difficult" (25%) is defused by never leaving the user staring at something hard — not by lessons (they reject theory; 45% aren't learners). **Risk to hold:** don't leave them with output but no understanding — that fails the success bar (decision 4).
*Rejected:* pure-comprehension "teach the concepts" (reads as coursework); pure-direction "just do it for you" (no capability transfer).

**3. Anchored on Marketing/Sales → document/communication drafting.**
*Why:* "non-technical professional" is not a person (Insight 5); intake, templates, rubric, examples all differ by role. Marketing/Sales is the data plurality (20%) and its recurring task is the lowest-ambiguity to template well.
*Rejected:* role-agnostic breadth — the fastest way to recreate the overwhelm we're killing.

**4. Success = first real win now; later unaided attempt instrumented, not gated.**
*Why:* the rigorous bar ("independent completion on a later unaided attempt") is the right North Star but is hard to build and depends on fragile return behavior. So v1 proves the first win and *instruments* the later attempt; it doesn't stake its existence on users coming back.
*Rejected:* gate v1 on the later attempt; accept mere completion (too weak — every competitor already measures that).

**5. The one artifact v1 nails = a recurring persuasive outreach message** (cold/warm email, follow-up).
*Why:* highest recurrence, clearest checkable quality bar (so the rubric is real), lowest data-sensitivity.
*Rejected:* social/LinkedIn post (fuzzy quality → weak rubric); sales deck/one-pager (heavier, higher-stakes).

**6. Front door = concrete-example entry (recognition, not a blank prompt).**
*Why:* a blank "tell me what you're stuck on" box hands the #1 blocker (36% "where do I start") back to the person who has it. Instead: open on 3–4 tappable real Marketing/Sales situations; they pick the closest, *then* it personalizes conversationally. The single most important "friendly-for-overwhelmed" decision.
*Rejected:* open conversational intake from screen one; rigid one-question-at-a-time wizard (feels like the course-flow we avoid).

**7. Two entry paths, the user's choice; DEFAULT = write your own draft. Help fades to unaided.** *(Amended 2026-08-21 — supersedes the original "AI-led first attempt"; see Decision 11.)*
*Why:* the original "first attempt is AI-led" made the user a **spectator** — NOD wrote the draft, checked it, and named the fix, so nothing transferred (the failure that reopened the whole solution). The amendment keeps the fade but flips the day-one default so the user actually does the work. After the situation + intake, the user picks how to start:
  - **Default — write your own draft**, then get rubric feedback on it. Real generation → real learning.
  - **Escape hatch — NOD drafts it, and the user spots what's weak *first***, then sees the rubric suggestions. This still serves the 36% "where do I start" (Decision 6 holds) without making the user a spectator.
Both paths end at the **same** rubric feedback. "I do → we do → you do" survives as the **graduation arc** — spot-the-flaw today, unaided self-draft over time — not as the day-one default. A little effort is required by design (Decision 11).
*Rejected:* **AI-led-first-as-default** (the spectator problem — the user watches and learns nothing); **always-on inline fixing à la Grammarly** (breeds dependence, atrophies the user's own skill, kills "makes you better"); **a neutral 50/50 fork with no default** (a tired user always picks "do it for me", so the product silently drifts into a get-it-done assistant).

**8. Judgment = fixed expert rubric backbone + 1–2 goal-personalized criteria, surfaced as concrete feedback, never a score.**
*Why:* the user *cannot* judge their own draft — that's the whole problem — so judgment must be trustworthy (not hallucinated criteria) and must not feel like grading. Fixed expert backbone (clear single ask, personalization, tone, length, no fluff) is consistent; light personalization keeps it relevant. Surface as "your ask is buried in the last line — a busy prospect won't reach it," not "4/10." The numeric score stays **internal**, for the decision-4 measurement only. *(Clarified 2026-08-21:* now that writing your own draft is the default (Decision 7), the rubric must genuinely evaluate **arbitrary user-written text**, not only a message NOD authored — the prototype's trick of planting a known flaw and "finding" it is not the real mechanism. Evaluation is hybrid: length/structure/readability computed in code; the reading-comprehension criteria via an anchored model call that must quote the exact line it reacts to. See `v1PRD.md` §16.*)*
*Rejected:* pure per-task generated rubric (inconsistent, invents criteria); showing a score to the user (feels like a grade).

**9. Data safety = silent auto-mask + reassurance (no up-front gate).**
*Why:* they *will* paste real prospect/company names, and there's no compliance layer (B2C). A warning screen bounces an overwhelmed user. Instead: let them work with their real, messy situation (what makes it *their* task, not a generic exercise), and swap identifiers for placeholders invisibly with a reassuring note ("I've swapped the real names out so you can practice safely"). Masking happens **before any real text is persisted or sent to the model.**
*Rejected:* coach-them-to-abstract-first (adds a thinking step up front); just-in-time warning prompt (still a gate).

**10. Re-engagement = one outcome-tied nudge pinned to their real next occurrence.**
*Why:* decision 4 rides on a later attempt happening, but streaks/daily mechanics are off the table (off-brand; 55% aren't learners). So: one nudge tied to their real next task — "Got another prospect to follow up with? Do this one yourself — I'll jump in if you're stuck." The hook is *utility on a real task*; the capability measurement rides along invisibly. Sell the utility, measure the capability.
*Rejected:* streak/habit mechanic; no nudge at all; generic scheduled check-in (ignorable).

**11. Product spine = a "get better" coach, not a "get it done" assistant.** *(Resolved 2026-08-21 — the long-open core-solution fork.)*
*Why:* the whole edge over free ChatGPT is that the user gets **better**, not just handed a message — so a little effort is non-negotiable, help must **fade**, and winning = the user needs NOD **less** over time. The survey backs the *shape* of this: the #2 blocker is "don't get enough practice" (52/160); 120/160 want "learn by solving real-life challenges"; 58 want "a guide who helps when I'm stuck"; and willingness-to-pay is a soft "maybe, if it genuinely helps me" — a prove-it market that won't pay for another generator it can get free. The hard part we accept: **adoption** (why a busy person chooses effort) — answered by never selling "practice" and making the effort produce *today's* real message (Decision 7's default self-draft). A second, secondary read rides along: a **choice/independence trend** (does the user reach for the write-your-own path more over time?), read as a trend, never as a grade.
*Rejected:* **B — a frictionless "get it done" assistant** (always-on, wins on daily use): it has no honest edge over ChatGPT, no pricing power, and shrinks "you get better" to marketing.
*Honest caveat, consciously carried:* the rubric's **discrimination test** (does it reliably tell good outreach from bad?) is still **un-run** — the owner chose to ship the demo first and stress-test the rubric right after (2026-08-21). A weak rubric would silently invalidate the experiment (see "Known tensions").

## The v1 experience (core loop, screen by screen)

1. **Home / recognition entry** — 3–4 concrete outreach situations as tappable cards + a "something else" escape. No blank box. *(decision 6)*
2. **Personalize** — short conversational fill-in of the picked situation (who, the ask, the context). Auto-mask fires here. *(decisions 6, 9)*
3. **Choose how to start → draft** *(decision 7)* — the user picks a path: **write their own draft** (default), or **let NOD draft it and spot what's weak first** (escape hatch for "where do I start"). Both carry the picked situation + intake into the draft.
4. **Feedback, not grading** — the real rubric reads *their* draft (user-written or NOD-drafted) and surfaces 1–2 concrete, actionable fixes pointing at their actual words; user revises; loops until it clears the backbone (max 3). *(decision 8)*
5. **Artifact + portfolio** — the finished message saved as a reusable artifact; a running history is the "proof" they can carry into their org (the growth model in `ProblemSolutionBase.md`). *(decision 5)*
6. **Later, real occurrence** — outcome-tied nudge → unaided re-attempt on a similar task; help-used / AI-turns / time are captured. *(decisions 10, 4)*

## How we'll know the experiment worked

Not completion counts or self-reported confidence. The read is the **behavioral delta between the guided attempt and the later unaided attempt** on a similar task: fewer help invocations, fewer AI turns, faster time, and a clean rubric pass *without* scaffolding. A **secondary** read is the **choice/independence trend** — whether the user reaches for the write-your-own path (vs. "NOD draft it") more over time (Decision 11), read as a trend, never a grade. Confidence is logged only as a secondary diagnostic. *(decisions 1, 4, 11)*

## Deferred (explicitly out of this product-detailing lock)

- **PRD** — the immediate next artifact (owner + Claude, together).
- **`design.md`** — visual/UX design; owner will share; must precede technical work.
- **ERD, technical architecture, data model, implementation milestones** — sequenced *after* design is finalised. Stack is known (Next.js / TS-strict / Supabase / Tailwind; server-owned Claude calls, model invisible) but is intentionally not detailed here.
- **Product scope beyond v1:** the other 3 task types (research/decision, spreadsheet/data, workflow), non-Marketing/Sales roles, any paid tier, and naming/branding. Image generation is a conscious exclusion despite being the audience's #2 actual AI use — it isn't a recurring work task with a checkable outcome.

## Known tensions a peer should keep watching

- **Comprehension risk (decision 2):** if "too difficult" is the *deeper* pain, a do-it-with-you product can still leave the user not understanding. Watch the unaided-attempt data.
- **Return dependency (decisions 4, 10):** the North-Star signal needs users to come back; de-risked (utility hook, not a streak) but not eliminated.
- **Rubric credibility (decision 8):** the fixed backbone must be genuinely expert; a weak rubric silently invalidates the whole experiment.
