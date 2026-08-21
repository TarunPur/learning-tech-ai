<!-- STATUS: LOCKED 2026-08-21. Brand = NOD. This file owns the USER FLOW (what happens, and how the two paths + the coaching loop branch and rejoin) as presented in the SINGLE TWO-FRAME WORKSPACE. The VISUAL SYSTEM (how it looks) lives in design.md. The BUILD (how it's made) lives in implementation.md + ERD.md. Grounded in v1ProductDetailing.md Decisions 6–11 and v1PRD.md §12–16. Canonical prototype: design/mockups/workspace.html (+ shared/flow.js). -->
---
name: NOD — User Journey (v1 "Outreach" loop) — LOCKED
owns: the flow — the two-frame workspace, the two ways to start, the coaching loop, where they split and rejoin, and the states on each frame
paired_with: design.md (visual system) · implementation.md + ERD.md (the build) · v1ProductDetailing.md + v1PRD.md (the decisions + requirements)
status: LOCKED — this is the flow the build follows. Change only with the owner's explicit sign-off.
last_updated: 2026-08-21
---

# NOD — User Journey (v1) — LOCKED

> **How to read this file.** This is the *what happens* document. It walks the user's path from opening
> NOD to a finished, saved message, and shows where the path forks, where it loops, and where it comes
> back together. It does **not** describe colours, type, or components (that's `design.md`) or the code
> (that's `implementation.md`). When a frame needs a visual pattern, this file names it and points at
> `design.md`.

---

## 0. The presentation model — ONE two-frame workspace (LOCKED)

The whole v1 loop happens on **one persistent screen**, not a sequence of separate pages. This is the
locked presentation for v1.

```
  Global, stable NOD brand lockup (pinned header — never resizes, relocates, hides, or animates)
  ─────────────────────────────────────────────────────────────────────────────────────────────
  LEFT  — the single immediately-previous completed frame, as a warm-tinted, still-editable RECAP
  RIGHT — the ONE active frame, where the user acts now (on the paper surface, not in a giant card)
```

Rules that never bend (the "locked interaction model"):

- **Show exactly one prior frame on the left.** Never a history stack, stepper, "Step 2 of 5,"
  progress bar, percentage, score, or checklist.
- Completing the active frame **moves it left into the recap** (the spatial result of a left-swipe —
  *not* a literal swipe gesture); the old recap disappears; the next active frame arrives on the right.
- The recap's **Edit** makes that frame active again on the right, preserves its values, and **resets any
  downstream state that the edit could contradict** (so you can never keep two conflicting answers).
- The **brand lockup is application chrome**, pinned (sticky) so it never scrolls away or jumps between
  frames of different heights.
- Desktop-first; on narrow screens the two columns **stack** (recap directly above the dominant active
  frame) — never squeezed side-by-side.

The **frame order** is: `situation → details → choose → draft → feedback → saved`. (Frame names map 1:1
to the PRD screens in §3; "details" = Personalize, "draft" = the chosen path, "saved" = the artifact.)

---

## 1. The spine (read this before any frame)

NOD is a **coach that makes you better at your own work — not a machine that does the work for you.**
Everything downstream follows from that one sentence (v1ProductDetailing Decision 11).

Three rules the whole flow has to obey:

1. **A little effort is required, on purpose.** The user does the thinking; NOD reacts to it. If NOD ever
   writes, checks, and fixes while the user only watches, we've failed — a spectator learns nothing.
2. **Help fades.** The most help is on day one. Over repeat visits NOD steps back. **Winning = the user
   needs NOD less** over time, not more.
3. **Never sell "practice"; sell today's real message.** The effort must produce the actual outreach the
   user came to send *today*. Banned UI words stay banned: no *course / lesson / learn / grade / score /
   quiz / streak* — and no *bench*. (See `design.md`.)

**What we measure** (rides along invisibly — never shown as a grade):
- **Getting-better signal (primary):** the gap between the guided attempt now and a later *unaided*
  attempt on a similar task — fewer help requests, fewer back-and-forths, faster, clean pass without
  scaffolding. (PRD §8/§14, H4)
- **Independence signal (secondary):** over repeat visits, does the user reach for *write-your-own* more
  and *let-NOD-draft* less? A trend, never a pass/fail. (Decision 11)

---

## 2. The flow at a glance

```
  ① SITUATION            ② DETAILS (Personalize)        ③ CHOOSE HOW TO START
  Pick one of 4     →    who / one ask / why-now    →   ┌────────────────────────────────┐
  real situations       one prompt at a time,           │ DEFAULT (loud):                │
  + a quiet             auto-mask fires here             │ ▶ Write my first version       │
  "something else"                                       │ fallback (quiet link):         │
  escape                                                 │ "Not sure? Start with a NOD    │
                                                         │  draft you react to."          │
                                                         └───────────────┬────────────────┘
        ┌────────────────────────────────────────────────────────────────┴──────────────┐
        ▼ ④a WRITE YOUR OWN (default)                     ▼ ④b NOD DRAFTS + SPOT-THE-FLAW (fallback)
        You write it. Situation + details stay            NOD writes a draft FROM your context. BEFORE any
        as an on-screen brief, so never a blank            advice you TAP THE ONE LINE a busy reader trips
        page. Help fades on repeat visits.                 on (or "I'm not sure"). Then NOD reacts.
        └───────────────────────────────┬─────────────────────────────────┘
                                        ▼  ⑤ FEEDBACK ON YOUR OWN WORDS  (the rejoin + the coaching loop)
                                        Real check against the standard. If an issue: 1–2 concrete fixes
                                        on YOUR actual sentences. THE LOOP (own path):
                                          • tighten it yourself → check again  (edit #1)
                                          • tighten once more   → check again  (edit #2)
                                          • still an issue → NOD writes a better version FROM your intake
                                          • clean at any point → straight to Save
                                        ▼
                                        ⑥ SAVED MESSAGE + your running history (masked; Reuse →)
                                        ▼
                                        ⑦ LATER: an outcome-tied nudge on your real next task →
                                           an unaided re-attempt (help fades further)
```

**The one structural fact:** the fork sits **after** intake, not before. Both ways need the situation and
the user's specifics, so we collect those once (① + ②), then let the user choose how to start (③).

---

## 3. Frame by frame

Each frame lists: **Purpose · Sees · Does · Key states · Realises (decision) · Fade/anti-spectator note.**

### ① Situation — recognition entry
- **Purpose:** get an overwhelmed user moving without a blank page.
- **Sees:** **4** concrete Marketing/Sales outreach situations as equal, prominent tappable cards
  (*A prospect went quiet · Reach out to someone new · Book a meeting or demo · Follow up after an
  event*), plus **one quiet "Something else?" escape** below them.
- **Does:** taps the closest situation. If nothing fits, opens the quiet escape and types the real task in
  **one line** — softly sorted: an **outreach** task flows into the normal loop (mapped to the custom
  scenario, its own words kept as the task label); an **off-scope** task (proposal, deck, a different
  role's work) gets a **warm boundary** + a "shape it as a message anyway" override; abuse is refused.
  When the check is unsure, treat it as outreach. (PRD §13 soft funnel; `flow.js` `classifyTask`.)
- **Key states:** resting grid · card hover/lift · the escape's one-line intake (Continue disabled until
  there's text) · the warm-boundary state with the override.
- **Realises:** Decision 6 (recognition, never a blank prompt). Keep the four cards equal — the escape is
  a fallback, never a fifth equal card.

### ② Details (Personalize) — make it their real task (feeds both paths)
- **Purpose:** turn a generic situation into *the user's own* messy, specific task.
- **Sees:** a short conversational fill-in, **one prompt at a time, progressively revealed**:
  *Who are you writing to?* (required) → *What's the one thing you're asking for?* (required, with 2–3
  suggestion chips) → *Anything that makes now the moment?* (optional context).
- **Does:** answers in their own words, using real names/companies if they want.
- **Key states:** field focus · progressive reveal (the next prompt appears once the current has ≥2 chars)
  · **silent auto-mask reassurance**: an inline note that the real name is swapped for `[name]` before
  anything is saved or sent — while their real name still shows in *their* draft. Never a warning gate.
- **Realises:** Decisions 6 + 9. Collected **once**, carried into whichever path they pick.
- **Note:** the three inputs must be unambiguous — a past test answered *"who are you writing to?"* with
  task context. Keep each prompt's example specific.

### ③ Choose how to start — the fork
- **Purpose:** let the user decide how they begin — while making *writing their own* the obvious default.
- **Sees:** two options of **deliberately unequal weight**:
  - **Loud, primary card:** *"Write my first version"* + one line of coach framing (*"Put down a rough
    version. NOD will show you what to tighten."*).
  - **Quiet, secondary link:** *"Not sure where to start? Start with a NOD draft you react to."*
- **Does:** picks a path.
- **Realises:** Decision 7 (write-your-own default) + Decision 11. See `design.md` → **Path-choice**.
- **Anti-spectator note:** **never** a 50/50 pair of buttons — a tired user always taps "do it for me,"
  and the product rots into a get-it-done assistant (Decision 7 rejects this). The fallback serves the
  genuine "I don't know where to start" case (the 36% blocker), not as an equal offer.

### ④a Write your own — the default path
- **Purpose:** the user produces the first version themselves. Real writing → real getting-better.
- **Sees:** a clear compose surface with the user's **task brief** kept visible above it (situation,
  writing-to, context, one ask), so it's **never a truly blank page** (Decision 6's spirit). A light
  placeholder recipe on the first-ever attempt.
- **Does:** writes their first version, then submits it: **"Check it against the standard."**
- **Key states:** empty (brief + placeholder) · typing · ready-to-check (enabled once there's real text).
- **Realises:** Decision 7 default + Decision 11.
- **Fade note (built):** once the user has finished ≥1 message, later attempts get **lighter scaffolding**
  — trimmed lede, plain placeholder, no hint — with a quiet **"Stuck? Show me the starting moves"** toggle
  that restores the recipe on demand. The brief always stays.

### ④b NOD drafts it + spot-the-flaw — the fallback path
- **Purpose:** serve the "I don't know where to start" user **without** making them a spectator. Effort
  moves from *writing from blank* to *judging a draft* — still real work, lower activation energy.
- **Sees, in order:** 1) NOD writes a first version **from the user's real context** (never invented
  facts — if no context was given, it's labelled a generic sample). 2) **Before any advice**, NOD asks:
  *"Which one line would a busy reader trip on?"* — the draft's sentences are individually tappable, with
  an honest **"I'm not sure"** out. 3) Only **after** the tap does NOD react: whether it was a weak spot,
  *why*, and what they may have missed.
- **Does:** taps the one line they'd change (or "I'm not sure"), then checks it against the standard.
- **Key states:** draft revealed · lines tappable · one line chosen → NOD's reaction · "I'm not sure" →
  NOD points to the line gently. See `design.md` → **Tap-the-weak-line** (neutral marker — **never**
  red/green; not a "wrong answer").
- **Realises:** Decision 7 fallback + Decision 8 + Decision 11.
- **Why tap-a-line** (locked): tapping forces a critical read (the point) while staying gentle for someone
  who chose this path *because* blank pages scare them. Typing a critique reintroduces the blank page; a
  menu lets them guess without reading. Tapping is recognition, not recall (Decision 6).

### ⑤ Feedback on your own words — the rejoin + THE COACHING LOOP (LOCKED)
- **Purpose:** the real check. Both paths arrive here; it reads **the user's own text** (④a written, or
  the ④b NOD draft they judged), against the fixed standard (PRD §16 — B1/B2/B4 core, B3/B5 + personalized
  advisory).
- **Sees (issue found):** the message with the flagged line marked (neutral dotted marker), then **one
  fix** — *your line → why it's worth changing → (a tighter version, when we have one)* — framed as an
  edit they can accept or do themselves. **No score, no checklist, no X/5, no colour-coded pass/fail.**
- **The loop (own path) — LOCKED, built in the prototype:**
  1. Issue → **"Let me tighten it"** returns them to the editable compose with a *"one thing to tighten"*
     reminder; **"Check it against the standard" is available again**.
  2. They may tighten and re-check **up to twice** (edit #1, edit #2).
  3. If the **third check still finds an issue**, **NOD writes a better version FROM the user's own
     intake** — leads with their real reason, ends on one clear ask, no soft opener — and offers Save.
     (This is the "we do" beat, earned only after the user has tried.)
  4. A **clean check at any point** exits straight to the ready/Save state.
  - **"Use this edit"** (accept NOD's one-line fix) is offered only when we have a concrete tighter line
    (a soft-opener style miss) and ends at Save. *(Open question flagged to owner: whether to keep this
    accept-shortcut during the loop or require the user to self-edit first.)*
- **Sees (clean):** *"It's ready — here's what's working,"* naming **one concrete, reusable judgement**
  drawn from the user's actual draft (a clear ask / the right length / leads with the reason) — never a
  hollow "nothing to change." Then Save.
- **Key states:** fix shown (neutral marker) · edit accepted → marker resolves to a calm "cleared" state ·
  tighten → back to compose (loop) · NOD-writes-better-version → ready · clean → ready.
- **Realises:** Decision 8 + Decision 11. The internal core/advisory scoring (PRD §16) stays invisible —
  it feeds measurement only.
- **Standard mechanics (from PRD §16, the build implements):** **core** B1 (one clear ask), B2 (earned
  relevance), B4 (respects their time) gate the "clean" state; **advisory** B3 (tone), B5 (no fluff), and
  the 1–2 personalized criteria are surfaced but never gate; **cap of 3 checks** then the user may ship
  with misses noted (here: NOD writes the better version). Surface only the **1–2 highest-impact misses**
  at a time.

### ⑥ Saved message + running history
- **Purpose:** leave a reusable, real artifact — the "proof" the user carries into their org.
- **Sees:** the finished message (its **saved copy stays masked**; copy-to-send restores the real name);
  a running list *"Your saved messages"* — plain rows with situation title, a one-line peek, the ask
  (*"Asked for: …"*), and a **relative date**; the freshest carries a *"just saved"* chip; each row has
  **Reuse →**. One calm outcome-tied next-use cue.
- **Does:** copies the message (real names filled back in only here); can **Reuse** a past one to seed a
  fresh attempt.
- **Key states:** freshly-saved (chip) · list rows · reuse. **Copy guard:** coaching notes never copy —
  the clipboard gets the message only. Not a dashboard, not a portfolio grid, not a stack in the recap.
- **Realises:** Decision 5 + the portfolio growth model + Decision 9 (masked persistence).

### ⑦ Later — the real next occurrence
- **Purpose:** instrument (not depend on) a later **unaided** attempt — the getting-better read.
- **Sees:** one outcome-tied nudge pinned to their real next task — *"Got another prospect who's gone
  quiet? Do the next one yourself — I'll jump in if you get stuck."*
- **Does:** attempts a similar task with **thinner** scaffolding. The path choice (③) reappears, with
  write-your-own even more clearly the default.
- **Key states:** nudge · unaided composer (lighter) · optional "Stuck?" that brings help back partially.
- **Realises:** Decisions 10 + 4, and the fade rule.
- **Measurement note:** help-used / AI turns / time / clean-pass-without-scaffolding are captured here for
  the primary read; the ③ choice feeds the secondary independence trend. None shown to the user.

---

## 4. Where each decision lives (traceability)

| Decision (v1ProductDetailing) | Where it shows up in the workspace |
|---|---|
| 6 — recognition entry, never a blank box | ① Situation (+ the brief that keeps ④a from being blank) |
| 7 — two paths, write-your-own default | ③ Choose → ④a / ④b |
| 8 — fixed standard, surfaced as feedback not a grade | ⑤ Feedback + the coaching loop |
| 9 — silent auto-mask + masked persistence | ② Details; ⑥ saved artifacts stay masked |
| 10 — one outcome-tied nudge | ⑦ Later |
| 11 — "get better" coach; effort required; help fades | the spine (§1); ③ framing; ④a fade; ④b spot-the-flaw; ⑤ loop (NOD writes it only after 2 self-edits); ⑦ fade |

---

## 5. The graduation arc ("I do → we do → you do")

A promise about **repeat visits**, not a single session:
- **Early:** the user may lean on ④b (NOD drafts; they judge) — judging is still real effort.
- **Middle:** they write their own (④a) but use the feedback heavily; inside ⑤ they may need NOD's
  better-version rewrite after two tries.
- **Later (⑦):** they write their own with thinner scaffolding, clear the standard in fewer checks, and
  reach for "let NOD draft it" less.

Read as the **independence trend** (Decision 11) — a direction of travel, **never** a grade or streak.

---

## 6. What's LOCKED here vs. deferred to the build

**Locked at the design layer (this file + design.md), built in `design/mockups/workspace.html`:**
- The two-frame workspace + its interaction model (§0).
- The frame order and both entry paths (④a / ④b); spot-the-flaw = **tap the weak line**.
- The choose-how-to-start framing (loud default + quiet fallback, never 50/50).
- The scoped "something else" escape + warm boundary (soft funnel).
- Feedback shape (1–2 fixes, "your line → why → tighter", neutral marker, never a score).
- **The coaching loop** (⑤): tighten-and-recheck up to twice, then NOD writes a better version; clean
  exits early. Help fades on repeat attempts. Masked persistence (saved copy masked; copy restores name).

**Deferred to the build (implementation.md owns these — the prototype fakes/approximates them):**
- **The real evaluator.** The standard must genuinely evaluate *arbitrary* user text. Built as a hybrid:
  **B4 computed deterministically in code** (word count ~50–125, sentence/paragraph structure, reading
  level) + **one anchored Claude call for B1/B2/B3/B5** that returns pass/needs-work **and the exact
  quote** it reacts to (PRD §16). The prototype's `flow.js evaluateText()` is a heuristic stand-in and
  the ④b "spot-the-flaw" plants a known flaw — both are replaced by the real endpoint.
- **NOD's "better version" rewrite (⑤ step 3).** The prototype builds it from intake locally; the build
  generates it server-side (same anchored model, no soft opener) — must itself pass the standard.
- **The rubric discrimination test.** Does the standard reliably tell good outreach from bad? Consciously
  un-run; a before-build validation step in `implementation.md` (PRD §16/§24). A weak standard silently
  invalidates the experiment.
- **The "skill you keep" takeaway.** Must name the user's OWN learned skill, derived from the real
  evaluator's finding on their words — never a fixed line. (Landing copy is illustrative only.)
- **Auth, persistence, instrumentation** (PRD §14 events), and server-side masking — all in
  `implementation.md` + `ERD.md`.

> **Next after this locked design layer:** `ERD.md` (the data model) → `implementation.md` (the airtight
> build plan, including the real evaluator + the discrimination test) → build.
