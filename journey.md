<!-- STATUS: current as of 2026-08-21. Brand = NOD. This file owns the USER FLOW (what happens, screen by screen, and how the two paths branch and rejoin). The VISUAL SYSTEM (how it looks) lives in design.md. Grounded in v1ProductDetailing.md Decisions 6–11. No code, no ERD here — this is the design layer. -->
---
name: NOD — User Journey (v1 "Outreach" loop)
owns: the flow — screens, the two ways to start, where they split and rejoin, and the states on each screen
paired_with: design.md (visual system + component library) · v1ProductDetailing.md (the decisions + why)
last_updated: 2026-08-21
---

# NOD — User Journey (v1)

> **How to read this file.** This is the *what happens* document. It walks the user's path from opening
> NOD to a finished, saved message, and shows where the path forks and where it comes back together.
> It does **not** describe colours, type, or components — that's `design.md`. When a screen needs a
> visual pattern, this file names it and points at `design.md`.

---

## 1. The spine (read this before any screen)

NOD is a **coach that makes you better at your own work — not a machine that does the work for you.**
Everything downstream follows from that one sentence (v1ProductDetailing Decision 11).

Three rules the whole flow has to obey:

1. **A little effort is required, on purpose.** The user does the thinking; NOD reacts to it. If NOD ever
   writes, checks, and fixes while the user only watches, we've failed — a spectator learns nothing, and
   we're back to being a worse version of free ChatGPT.
2. **Help fades.** The most help is on day one. Over repeat visits NOD steps back. **Winning = the user
   needs NOD less** over time, not more.
3. **Never sell "practice"; sell today's real message.** The effort has to produce the actual outreach the
   user came to send *today*. We never ask them to "do an exercise." (Banned UI words stay banned:
   no *course / lesson / learn / grade / score / quiz / streak* — and no *bench*. See `design.md`.)

**What we are measuring** (rides along invisibly — never shown to the user as a grade):
- **Getting-better signal (primary):** the gap between the guided attempt now and a later *unaided*
  attempt on a similar task — fewer times they ask for help, fewer back-and-forths, faster, and a clean
  pass against the standard without scaffolding.
- **Independence signal (secondary):** over repeat visits, does the user reach for *write-your-own* more
  and *let-NOD-draft* less? Read as a trend, never as a pass/fail. (Decision 11)

---

## 2. The flow at a glance

```
                       ┌─────────────────────────────────────────────┐
                       │  Both ways need the situation + specifics     │
                       │  first — so the fork comes AFTER intake.      │
                       └─────────────────────────────────────────────┘

  ①  HOME              ②  PERSONALIZE            ③  CHOOSE HOW TO START
  Pick a real     →    Fill in your        →     ┌───────────────────────────────┐
  situation            specifics                 │  DEFAULT (loud):              │
  (no blank box)       (auto-mask fires)         │  ▶ Write your own first version│
                                                 │                               │
                                                 │  fallback (quiet):            │
                                                 │  "Not sure where to start?    │
                                                 │   Let NOD draft one you react │
                                                 │   to."                        │
                                                 └───────────────┬───────────────┘
                                                                 │
                    ┌────────────────────────────────────────────┴───────────────┐
                    ▼ 4a  WRITE YOUR OWN (default)          ▼ 4b  NOD DRAFTS + SPOT-THE-FLAW (fallback)
                    You write the first version.            NOD writes a first version.
                    Your situation + specifics stay         BEFORE any advice: you TAP THE ONE LINE
                    on screen as anchors, so it's           a busy reader would trip on (or "I'm not
                    never a truly blank page.               sure"). Then NOD says if you were right
                                                            + what you missed.
                    └────────────────────────────┬──────────────────────────────┘
                                                 ▼  ⑤  FEEDBACK ON YOUR OWN WORDS  (the rejoin)
                                                 1–2 concrete fixes pointing at YOUR actual
                                                 sentences. Advisory, never a gate, never a score.
                                                 Revise → re-check. Loops until it clears the
                                                 standard (max 3 passes).
                                                 ▼
                                                 ⑥  SAVED MESSAGE + your running history
                                                 ▼
                                                 ⑦  LATER: a nudge on your real next task →
                                                    an unaided re-attempt (help fades further)
```

**The one structural fact to hold:** the fork sits **after** intake, not before. Both ways need the
situation and the user's specifics, so we collect those once, then let the user choose how to start.
(This corrects the loose "choose after the situation is picked" wording in the old `design.md` note —
the choice comes after **Personalize**, per Decision 7 and the core-loop steps.)

---

## 3. Screen by screen

Each screen below lists: **Purpose · What the user sees · What the user does · Key states · Realises ·
Fade/anti-spectator note.**

### ① Home — recognition entry
- **Purpose:** get an overwhelmed user moving without handing them a blank page.
- **Sees:** 3–4 concrete Marketing/Sales outreach situations as tappable cards (e.g. "Follow up with a
  prospect who went quiet"), plus one quiet "something else" escape.
- **Does:** taps the closest situation. If nothing fits, types the real task into the "something else"
  field — which is softly sorted (outreach → nearest situation; off-scope → a warm boundary + a "shape it
  as a message anyway" override). *(This soft-sorting already exists in the prototype's `flow.js`.)*
- **Key states:** resting grid · card hover/lift · loading pulse on tap · the "something else" field
  (arrow disabled until there's text).
- **Realises:** Decision 6 (recognition, never a blank prompt) — the single most important
  "friendly-for-overwhelmed" choice.
- **Note:** no path choice here yet. The user is only naming *what* they're working on.

### ② Personalize — make it their real task (feeds both paths)
- **Purpose:** turn a generic situation into *the user's own* messy, specific task — which is what makes
  the later effort worth anything.
- **Sees:** a short, conversational fill-in of the chosen situation — who it's to, the ask, the context —
  one field at a time. The chosen task shows as a small eyebrow ("YOUR TASK · … · Change").
- **Does:** answers the few questions in their own words, using real names/companies if they want.
- **Key states:** field focus · **silent auto-mask**: real names/companies are swapped for placeholders
  *before anything is saved or sent to the model*, with a calm inline reassurance ("I've swapped the real
  names out so you can work safely") — never a warning gate.
- **Realises:** Decisions 6 + 9.
- **Note:** this is collected **once** and carried into whichever path the user picks next.

### ③ Choose how to start — the fork *(new screen)*
- **Purpose:** let the user decide how they begin — while making *writing their own* the obvious default.
- **Sees:** two options that are deliberately **not** equal weight:
  - **Loud, primary:** *"Write your first version."* Presented as the main action, with one line of coach
    framing — e.g. *"You'll get sharper by writing it yourself. I'll check it against what good looks like
    once you've got something down."*
  - **Quiet, secondary:** a smaller link — *"Not sure where to start? Let NOD draft one you can react to."*
- **Does:** picks a path.
- **Key states:** the primary action is visually dominant; the fallback is a text link, not a matching
  button. See `design.md` → **Path-choice** pattern.
- **Realises:** Decision 7 (two paths, write-your-own default) + Decision 11 (effort required).
- **Anti-spectator note:** the framing must **never** become a neutral 50/50 fork — a tired user always
  taps "do it for me", and the product silently rots into a get-it-done assistant (Decision 7 rejects
  this explicitly). The fallback exists for the real "I genuinely don't know where to start" case (the
  36% blocker), not as an equal offer.

### ④a Write your own — the default path *(base: compose.html)*
- **Purpose:** the user produces the first version themselves. Real writing → real getting-better.
- **Sees:** a composer. Crucially, their **situation + the specifics from ②** stay visible beside/above
  the writing area as anchors — so even the "write your own" path is **never a truly blank page**
  (Decision 6's spirit holds here too). Light structural prompts may scaffold ("open with why you're
  reaching out … make the one ask clear …") but as gentle guidance, not fill-in-the-blanks.
- **Does:** writes their first version in their own words, then submits it for a check.
- **Key states:** empty (anchors + prompts visible) · typing · ready-to-check (the check action enables
  once there's real text).
- **Realises:** Decision 7 default + Decision 11.
- **Fade note:** this is the *most* effort path and the one we want users to graduate toward. On repeat
  visits the scaffolding prompts thin out.

### ④b NOD drafts it + spot-the-flaw — the fallback path *(base: draft.html)*
- **Purpose:** serve the "I don't know where to start" user **without** making them a spectator. The
  effort moves from *writing from blank* to *judging a draft* — which is still real work, just a lower
  activation energy.
- **Sees, in order:**
  1. NOD writes a first version from the situation + specifics.
  2. **Before any advice appears**, NOD asks the user to do the judging first:
     *"Before I weigh in — which one line here would a busy reader trip on?"* The draft's sentences are
     individually tappable. There is also an honest **"I'm not sure"** out.
  3. Only **after** the user taps (or says they're unsure) does NOD respond: whether the tapped line was
     indeed a weak spot, *why*, and what they may have missed.
- **Does:** reads the draft critically and **taps the one line** they'd change (or "I'm not sure").
- **Key states:** draft revealed · lines tappable (hover/selectable) · one line chosen → NOD's reaction ·
  "I'm not sure" → NOD points to the line and explains gently. See `design.md` → **Tap-the-weak-line**
  primitive (reuses the neutral marker — **never** red/green; this is not marking a "wrong answer").
- **Realises:** Decision 7 fallback + Decision 8 (judgment) + Decision 11 (anti-spectator).
- **Why tap-a-line, not type-a-critique or a multiple-choice menu** (resolved 2026-08-21): tapping a line
  forces the user to actually *read* NOD's draft with a critical eye — which is the whole point — while
  staying gentle for someone who chose this path *because* blank pages scare them. Typing a fix
  reintroduces the blank page we're avoiding; a menu of pre-written "weaknesses" lets them guess without
  reading. Tapping is recognition, not recall — consistent with Decision 6.
- **Fade note:** this path is the escape hatch, not the destination. The graduation arc (§5) is about the
  user needing it less.

### ⑤ Feedback on your own words — the rejoin *(base: feedback.html)*
- **Purpose:** the real check. Both paths arrive here, and it reads **the user's own text** — the version
  they wrote (④a) or the NOD draft they've now judged (④b).
- **Sees:** **1–2 concrete fixes at a time**, each pointing at the user's *actual sentence*, in the form
  **"your line → why it's worth changing → a tighter version."** Framed as an edit they can accept ("Use
  this edit") or decline ("Keep mine"). **No score, no checklist, no X/5, no colour-coded pass/fail.**
- **Does:** reads a fix, accepts or keeps their own, revises, and re-checks. Loops until the message
  clears the fixed standard — **max 3 passes**, so it never becomes a grind.
- **Key states:** fix shown (neutral dotted marker on the target line) · edit accepted → marker resolves
  to a calm "cleared" state · "keep mine" → advisory, moves on · cleared-the-standard state.
- **Realises:** Decision 8 (fixed expert standard + light personalization, surfaced as feedback not a
  grade; the numeric read stays internal, for measurement only).
- **Path difference to hold:** on ④a the checker must genuinely evaluate **arbitrary user-written text**;
  on ④b the user's tapped line feeds in as a first signal. Either way the feedback is about **their**
  words — the old prototype trick of planting a known flaw in a NOD-written draft and "finding" it is
  **not** the real mechanism and collapses on the write-your-own path (see §6, deferred-to-build).

### ⑥ Saved message + running history *(base: artifact.html)*
- **Purpose:** leave a reusable, real artifact — the "proof" the user can carry into their org.
- **Sees:** the finished message saved as a clean artifact; a running list of "Your saved messages"
  (blue tick, situation, date, one-line peek, "Reuse →"); the freshest carries a "just saved" chip.
- **Does:** copies/uses the message; can reuse a past one as a starting point later.
- **Key states:** freshly-saved (chip) · list rows · reuse hover. **Copy guard:** coaching notes are
  visible but never copied — the clipboard gets the message only.
- **Realises:** Decision 5 (the artifact) + the portfolio growth model in `ProblemSolutionBase.md`.

### ⑦ Later — the real next occurrence *(base: return.html + compose.html)*
- **Purpose:** instrument (not depend on) a later **unaided** attempt — the getting-better read.
- **Sees:** one outcome-tied nudge pinned to their real next task — *"Got another prospect to follow up
  with? Do this one yourself — I'll jump in if you're stuck."*
- **Does:** attempts a similar task with **less** scaffolding. The path choice (③) appears again, but
  write-your-own is now even more clearly the default.
- **Key states:** nudge · unaided composer · optional "I'm stuck" that brings help back *partially*.
- **Realises:** Decisions 10 + 4, and the fade rule — help is deliberately thinner than day one.
- **Measurement note:** help-used / number of AI turns / time / clean-pass-without-scaffolding are
  captured here for the primary read; the ③ choice feeds the secondary independence trend. None of this
  is shown to the user as a grade.

---

## 4. Where each decision lives (traceability)

| Decision (v1ProductDetailing) | Where it shows up in the journey |
|---|---|
| 6 — recognition entry, never a blank box | ① Home; and the anchors that keep ④a from being blank |
| 7 — two paths, write-your-own default | ③ Choose how to start → ④a / ④b |
| 8 — fixed standard, surfaced as feedback not a grade | ⑤ Feedback |
| 9 — silent auto-mask + reassurance | ② Personalize |
| 10 — one outcome-tied nudge | ⑦ Later |
| 11 — "get better" coach; effort required; help fades | the spine (§1); ③ framing; ④b spot-the-flaw; ⑦ fade |

---

## 5. The graduation arc ("I do → we do → you do")

This is a promise about **repeat visits**, not a single session:

- **Early:** the user may lean on ④b (NOD drafts; they judge). That's fine — judging is still real effort.
- **Middle:** they write their own (④a) but use the feedback heavily.
- **Later (⑦):** they write their own with thinner scaffolding, and reach for "let NOD draft it" less.

We read this as the **independence trend** (Decision 11) — a direction of travel, **never** a grade or a
streak. The product's job is to make itself less necessary.

---

## 6. What's settled here vs. deferred to build

**Settled at the design layer (this file + design.md):**
- The two-path structure, the fork's position (after intake), and both paths' interactions.
- Spot-the-flaw = **tap the weak line** (locked 2026-08-21).
- The choose-how-to-start framing (loud default + quiet fallback, never 50/50).
- Feedback shape (1–2 fixes, "your line → why → tighter", neutral marker, never a score).

**Deferred to build (NOT this job — flagged so no one assumes it's solved):**
- **The real checker.** On the write-your-own path the feedback must evaluate *arbitrary* text. Planned
  as a hybrid: length/structure/readability computed in code + one anchored model call for the
  reading-comprehension criteria that **must quote the exact line** it reacts to. The current
  `design/mockups/` prototype **fakes** the check (plants a flaw in a NOD-written draft and "finds" it) —
  this collapses on ④a and must be replaced by a real evaluator endpoint. (v1PRD §16)
- **The rubric discrimination test** — does the standard reliably tell good outreach from bad? Consciously
  **un-run**; to be stress-tested right after the demo. A weak standard silently invalidates the whole
  experiment. (v1PRD §16/§24)

**Explicitly the NEXT job, after this design layer is signed off:** rework the six mockups in
`design/mockups/` to this flow, then ERD → implementation plan → build (including the real evaluator).
