# NOD: from using AI to being good with it

**For non-technical professionals in India who already use AI every day but can't yet rely on it for their own work.** NOD doesn't give you a course. It does **one real task with you, end to end**, then steps back so that you can do the next one yourself.

**Live:** https://learning-tech-ai.vercel.app

> 📦 **The app's code is on the [`feedback-pass-20aug`](https://github.com/TarunPur/learning-tech-ai/tree/feedback-pass-20aug) branch** (in `app/`, 130+ commits). This `main` branch holds the research, PRD and design work behind it.

## How it works

1. **Start from a concrete example, not a blank box.** v1 is about one recurring task: writing a persuasive outreach message (Marketing and Sales was the largest group in the survey).
2. **Fading scaffolding** ("I do → we do → you do"): NOD helps less each time.
3. **Feedback against an expert rubric, never a score.** You get concrete notes on what to fix, and NOD checks again after you tighten the draft.
4. **Data safety by default:** personal details in what you paste are masked automatically before anything reaches the model.
5. **One follow-up nudge tied to an outcome.** No streaks.

## How it was built

- **Research first:** a 160-response survey of the target users (strict target group n=44) plus secondary research. The insights are in [`research/`](research/); the raw responses, which contain personal data, are not in this repo.
- **10 locked product decisions,** each with its reasoning and the alternative that was rejected: [`v1ProductDetailing.md`](v1ProductDetailing.md). The full PRD is [`v1PRD.md`](v1PRD.md).
- **Design system and mockups:** [`design.md`](design.md) and [`design/mockups/`](design/mockups/)
- **The app:** Next.js 16 · TypeScript (strict) · Supabase · Claude API (server-side only). Its tests include a **rubric discrimination suite** (does the grader actually tell good drafts from bad ones?), PII-masking tests and live integration tests against the model.

## Working notes

[`WORKING-NOTES.md`](WORKING-NOTES.md) is the session handoff used while building.
