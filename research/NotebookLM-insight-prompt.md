# NotebookLM prompt: extract insights, not observations

Paste this into NotebookLM's chat (with the secondary-research source files as the active sources).

---

I've uploaded secondary research (Firecrawl and web search findings, ~150 sourced answers to a structured problem-discovery question set) for a case study on Tech & AI learning for non-technical professionals. I need you to draw **insights**, not observations, from these sources.

**The distinction, precisely:**
- An **observation** restates what the data says. Example: "Only 21% of HR professionals have received AI training despite 76% of HR leaders saying it's necessary." That's a fact, not an insight.
- An **insight** explains *why* the observation is true — the underlying mechanism — in a way that points toward an opportunity without naming a solution yet. Example, from a different domain: instead of concluding "Indian families need a monitoring solution," the insight is: "Existing services activate only after someone notices a problem. There is no continuous source of truth, so families become the default monitoring system." Notice the insight names a structural gap (no continuous source of truth) and a consequence (families forced into a role), not a fix.

**Your task:** Read across all the uploaded sources and produce 10–15 insights about the non-technical-professional Tech & AI learning problem space. For each one:

1. **State the insight as a mechanism, not a fact.** It should answer "why does this keep happening" or "what structural gap causes this," not just "what is true." If your first draft of an insight could be rewritten as "[segment] needs [solution]," rewrite it again — that's premature solutioning, not an insight.
2. **Ground it explicitly in the sources.** Name which specific finding(s) or source(s) the insight is built from. Don't synthesize something that sounds plausible but isn't traceable to what's actually in the documents.
3. **Chain the "why" at least two levels deep before you stop.** Level 1 (observation) → Level 2 (immediate cause) → Level 3 (structural/root cause) is the target depth. Stop only when you hit something that's actually structural — an incentive misalignment, a measurement gap, an economic constraint — not just a restated symptom.
4. **Tag its evidentiary status, explicitly and separately from the insight itself:**
   - **Secondary-research-supported** — multiple independent sources converge on this mechanism, or one strong, specific, non-vendor source directly supports it.
   - **Secondary-research-suggested, single-source** — plausible and sourced, but resting on one source (especially if it's a vendor blog, a single Reddit thread, or a proxy/forum source) — flag as needing corroboration.
   - **Assumption — needs primary research** — this is a reasonable hypothesis built from adjacent evidence, but the sources don't actually establish it for our specific target segment; it needs direct interviews or testing before being treated as validated.
5. **Do not upgrade a tag to make the insight sound stronger than the evidence supports.** If only one Reddit thread and no other source back a claim, it stays "single-source," even if it's an interesting or convenient finding.

**Explicitly avoid:**
- Restating a statistic and calling it an insight.
- Naming a product feature or solution inside the insight itself.
- Presenting an "Assumption — needs primary research" insight with the same confidence as a "secondary-research-supported" one.
- Merging multiple unrelated observations into one vague insight — each insight should trace to a specific, identifiable mechanism.

**Output format:** For each insight —
> **Insight [n]:** [the mechanism, 1–3 sentences]
> **Why this is an insight, not an observation:** [1 sentence naming the underlying cause it points to]
> **Evidentiary status:** [one of the three tags above] — [which source(s), by name]
> **What would validate or break this:** [what a primary-research interview/test would need to show to confirm or disprove it]

Group the 10–15 insights by theme (e.g., learner behavior, employer/compliance constraints, competitive landscape, product-design risk) rather than by the original 12 question-sections — I want the insights to stand on their own, not be tied to how the original questions were organized.
