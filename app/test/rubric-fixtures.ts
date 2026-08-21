// Labelled fixture set for the Phase 11 rubric discrimination test
// (implementation.md Phase 11 / PRD §16, §24 — the un-run validation the
// whole experiment's credibility rests on). Written from PRD §16's B1/B2/B4
// pass/fail columns (the three CORE criteria that gate core_pass) — each
// fixture is designed to clearly clear or clearly violate at least one core
// criterion, not sit in a gray zone, since a discrimination test needs
// unambiguous ground truth to be meaningful.
import type { ScenarioId } from "@/lib/flow";

export type Fixture = {
  id: string;
  scenario: Exclude<ScenarioId, "custom">;
  label: "good" | "bad";
  text: string;
  // which core criterion this fixture is designed to probe — not asserted
  // directly (the LLM criteria aren't that literal), just documentation for
  // triaging misses.
  probes: string;
};

export const FIXTURES: Fixture[] = [
  // ---- quiet (re-engage a prospect who went quiet) ----
  {
    id: "quiet-good-1",
    scenario: "quiet",
    label: "good",
    probes: "B1 clear ask, B2 earned relevance, graceful low-pressure reason",
    text: "Hi [name], I know things get busy, so no worries if the timing wasn't right last month. I still think the onboarding change we talked about could save your team a few hours a week. If it's still worth a look, would 15 minutes on Thursday work for a quick call?",
  },
  {
    id: "quiet-good-2",
    scenario: "quiet",
    label: "good",
    probes: "B1 single ask, B2 specific earned relevance",
    text: "Hi [name], following up on the pricing question you raised last time — I finally have a clear answer for you. No pressure if this isn't a priority right now, but would a quick 10-minute call this week work to walk through it?",
  },
  {
    id: "quiet-good-3",
    scenario: "quiet",
    label: "good",
    probes: "B1 specific time ask, B2 earned relevance, graceful tone",
    text: "Hi [name], it's been a few weeks since we spoke about the reporting dashboard, and I didn't want to just let it drop. If it's still on your radar, would Tuesday at 3pm work for a short call to pick it back up? Totally fine if not — just say the word.",
  },
  {
    id: "quiet-good-4",
    scenario: "quiet",
    label: "good",
    probes: "B1 clear ask, B2 earned relevance tied to their stated condition",
    text: "Hi [name], wanted to check back in since you mentioned wanting to revisit this once budget opened up for the new quarter. If that's happened, would a quick call next week make sense to pick up where we left off?",
  },
  {
    id: "quiet-bad-1",
    scenario: "quiet",
    label: "bad",
    probes: "B1 vague ask, B2 generic could-go-to-anyone, B5 fluff openers",
    text: "Hi [name], hope this finds you well! Just wanted to reach out and touch base since it's been a while. Let me know if you're still interested. Looking forward to hearing from you soon!",
  },
  {
    id: "quiet-bad-2",
    scenario: "quiet",
    label: "bad",
    probes: "B1 multiple stacked asks",
    text: "Hi [name], I hope you're doing well. I wanted to see if you'd be open to a call this week, or if you'd prefer I send over some materials, or maybe we could set up a demo instead. Let me know what works best for you!",
  },
  {
    id: "quiet-bad-3",
    scenario: "quiet",
    label: "bad",
    probes: "B4 wall of text, high reading level, vague multi-format ask",
    text: "Hi [name], I hope this email finds you in good spirits and that business has been treating you well over the past few months since we last had the opportunity to connect regarding your organization's needs. As you may recall from our previous conversation, we discussed at length several potential avenues through which our platform could meaningfully contribute to streamlining your team's existing workflows, particularly with respect to the onboarding challenges you had mentioned were causing friction across departments. Since that conversation, we have continued to develop and refine our offering substantially, incorporating a considerable amount of feedback from organizations similar to yours, and I genuinely believe that revisiting this discussion could prove to be mutually beneficial for both of our organizations moving forward. I would be absolutely delighted if you could find some time in your undoubtedly busy schedule to reconnect, whether that be via a phone call, a video conference, or even an in-person meeting should that be more convenient for you, so that we might explore together whether there remains an opportunity worth pursuing at this juncture.",
  },
  {
    id: "quiet-bad-4",
    scenario: "quiet",
    label: "bad",
    probes: "B1 vague ask, B3 aggressive/presumptuous tone",
    text: "Hi [name], Just circling back on this AGAIN since I haven't heard from you. As discussed, I'll assume you're still interested unless you tell me otherwise. Let me know.",
  },

  // ---- cold (first message to a new prospect) ----
  {
    id: "cold-good-1",
    scenario: "cold",
    label: "good",
    probes: "B1 low-friction interest ask, B2 earned relevance, credibility proof point",
    text: "Hi [name], I noticed your team just launched a new product line, and congrats on the early traction. We've helped a few similar teams cut onboarding time in half without adding headcount. Worth a quick 15-minute chat to see if it's relevant for you?",
  },
  {
    id: "cold-good-2",
    scenario: "cold",
    label: "good",
    probes: "B1 low-friction ask, B2 earned relevance, credibility",
    text: "Hi [name], saw your post about scaling support without losing response times — that's exactly the problem we help teams solve. A few companies your size have cut ticket backlog by 30% within a month of using us. Open to a short call to see if it'd help your team too?",
  },
  {
    id: "cold-good-3",
    scenario: "cold",
    label: "good",
    probes: "B1 low-friction ask, B2 specific earned relevance",
    text: "Hi [name], your team's recent expansion into the EU market caught my eye — that's a tricky logistics problem to solve well. We've helped two other companies navigate exactly that shift smoothly. Would a quick 15-minute call this week be worth exploring?",
  },
  {
    id: "cold-good-4",
    scenario: "cold",
    label: "good",
    probes: "B1 low-friction ask, B2 earned relevance, credibility proof point",
    text: "Hi [name], I came across your talk on remote onboarding and really liked the point about async documentation. We built a tool that's helped teams like yours cut new-hire ramp time by a third. Worth a short chat to see if it's a fit?",
  },
  {
    id: "cold-bad-1",
    scenario: "cold",
    label: "bad",
    probes: "B2 generic could-go-to-anyone, B1 high-friction ask on cold touch, B5 fluff",
    text: "Hi [name], My name is Alex and I represent a leading provider of business solutions. We would love to schedule a 30-minute call this week to walk you through our full product suite and discuss a potential partnership in detail. Please let me know your availability at your earliest convenience.",
  },
  {
    id: "cold-bad-2",
    scenario: "cold",
    label: "bad",
    probes: "B1 vague ask, B2 generic, B5 buzzword fluff",
    text: "Hi [name], hope you're doing great! We're a fast-growing platform helping companies unlock their full potential through innovative synergy-driven solutions. I'd love to explore how we might be able to add value together sometime. Let me know your thoughts!",
  },
  {
    id: "cold-bad-3",
    scenario: "cold",
    label: "bad",
    probes: "B3 presumptuous on a cold touch, B1 stacked asks",
    text: "Hi [name], As we discussed, I'll go ahead and send over the contract for you to review and sign by Friday. Also let me know if you want to hop on a call to go over pricing or if you'd rather I just send the deck instead.",
  },
  {
    id: "cold-bad-4",
    scenario: "cold",
    label: "bad",
    probes: "B4 wall of text, B2 generic, B1 vague ask",
    text: "Hi [name], I hope this message finds you well. I wanted to take a moment to introduce myself and our company, as we specialize in providing comprehensive, end-to-end solutions tailored to help organizations like yours streamline operations, reduce costs, and drive sustainable growth across every stage of the customer lifecycle. Over the past several years, we have had the privilege of working with a wide range of clients across various industries, helping them achieve measurable results through our proprietary methodology and dedicated team of experts. Given the nature of your organization and the challenges that businesses in your space commonly face, I believe there could be significant value in exploring a potential collaboration between our two companies. I would welcome the opportunity to schedule a call at your convenience to discuss this further and answer any questions you might have about how we could support your team's goals moving forward.",
  },

  // ---- meeting (book a demo / meeting) ----
  {
    id: "meeting-good-1",
    scenario: "meeting",
    label: "good",
    probes: "B1 specific-time ask, B2 earned relevance to their stated interest",
    text: "Hi [name], thanks for your interest in the new reporting dashboard after our last demo. Would Thursday at 2pm work for a 20-minute walkthrough of the features you asked about? Happy to adjust if that doesn't fit your schedule.",
  },
  {
    id: "meeting-good-2",
    scenario: "meeting",
    label: "good",
    probes: "B1 low-friction next step, B2 earned relevance",
    text: "Hi [name], since you mentioned wanting to see pricing once the new plan shipped, it's live now. Would 15 minutes tomorrow afternoon work to walk through it together?",
  },
  {
    id: "meeting-good-3",
    scenario: "meeting",
    label: "good",
    probes: "B1 specific-time ask, B2 earned relevance tied to their question",
    text: "Hi [name], following up on your question about integrations from our call last week — I put together a quick walkthrough that answers it directly. Would Monday at 11am work for a 20-minute demo?",
  },
  {
    id: "meeting-good-4",
    scenario: "meeting",
    label: "good",
    probes: "B1 specific-time ask, B2 earned relevance",
    text: "Hi [name], glad the trial's been useful so far. Since you asked about the reporting features specifically, would a 20-minute call on Wednesday work to show you how they'd fit your workflow?",
  },
  {
    id: "meeting-bad-1",
    scenario: "meeting",
    label: "bad",
    probes: "B1 vague open-ended ask, no proposed time",
    text: "Hi [name], I wanted to reach out and see if you'd be interested in setting up some time to chat about a potential demo whenever works for you. Just let me know your availability and we can figure something out!",
  },
  {
    id: "meeting-bad-2",
    scenario: "meeting",
    label: "bad",
    probes: "B1 stacked asks (call + loop in manager + discuss budget)",
    text: "Hi [name], can we lock in a call this week to go over the demo, and also could you loop in your manager so we can discuss budget and next steps in the same meeting? Let me know a time that works for everyone.",
  },
  {
    id: "meeting-bad-3",
    scenario: "meeting",
    label: "bad",
    probes: "B2 no earned relevance (generic pitch), B1 open-ended ask",
    text: "Hi [name], I hope you're doing well. I'd love to set up a demo to show you what our product can do. Are you free sometime this week or next for a quick call?",
  },
  {
    id: "meeting-bad-4",
    scenario: "meeting",
    label: "bad",
    probes: "B4 wall of text, high reading level, B1 vague timing",
    text: "Hi [name], I hope this note finds you well and that things have been going smoothly on your end since we last connected regarding a potential demonstration of our platform's capabilities. As part of our ongoing effort to ensure that every prospective client fully understands the breadth and depth of what we have to offer, I would like to propose that we schedule a comprehensive walkthrough session during which we can cover not only the core functionality of the product but also a range of advanced features, integrations, customization options, and potential use cases that may be particularly relevant to the specific challenges your organization is currently navigating, so please let me know what timing might work best for a call of this nature at your earliest convenience.",
  },

  // ---- event (follow up after an event) ----
  {
    id: "event-good-1",
    scenario: "event",
    label: "good",
    probes: "B2 anchors to shared context, B1 specific-time ask",
    text: "Hi [name], great meeting you at the SaaS meetup on Friday — I really enjoyed our chat about onboarding flows. As promised, here's a quick idea building on what we discussed. Would 15 minutes next week work to keep the conversation going?",
  },
  {
    id: "event-good-2",
    scenario: "event",
    label: "good",
    probes: "B2 anchors to shared context, B1 specific-time ask",
    text: "Hi [name], it was great connecting at the conference last week, especially your point about async onboarding. I put together the resource I mentioned — would a quick call Thursday work to talk through how it might apply to your team?",
  },
  {
    id: "event-good-3",
    scenario: "event",
    label: "good",
    probes: "B2 anchors to shared context, B1 specific-time ask",
    text: "Hi [name], really enjoyed our conversation at the meetup about scaling support teams. Since you asked about our pricing for teams your size, would 15 minutes tomorrow work to walk through it?",
  },
  {
    id: "event-good-4",
    scenario: "event",
    label: "good",
    probes: "B2 anchors to shared context, B1 specific-time ask",
    text: "Hi [name], thanks for stopping by our booth at the summit and asking about integrations. Would a short call next Tuesday work to show you how it'd fit with your existing stack?",
  },
  {
    id: "event-bad-1",
    scenario: "event",
    label: "bad",
    probes: "B2 no specific shared context despite claiming to have met, B1 vague ask",
    text: "Hi [name], it was great meeting you at the event! Hope you had a good time. Let's stay in touch and catch up sometime soon!",
  },
  {
    id: "event-bad-2",
    scenario: "event",
    label: "bad",
    probes: "B1 stacked/optional asks",
    text: "Hi [name], loved meeting you at the summit! Would you be open to a call sometime, or maybe we could grab coffee, or if you're too busy I could just send over some info instead — whatever's easiest for you!",
  },
  {
    id: "event-bad-3",
    scenario: "event",
    label: "bad",
    // v1: the ask ("Can we talk this week?") was ambiguous enough on its own
    // that the LLM judged B1 pass/fail inconsistently across runs, leaving
    // this fixture's "bad" label resting on B3 (tone) alone — B3 is advisory
    // and never gates core_pass by design (PRD §16), so that made the
    // fixture's ground truth unreliable rather than the rubric being wrong.
    // Tightened the ask to be unambiguously open-ended/high-friction so B1
    // fails on its own merits, independent of the tone issue.
    probes: "B3 guilt-tripping/presumptuous tone, B1 vague open-ended ask",
    text: "Hi [name], we spoke at the event a few weeks ago and I still haven't heard back from you. I know you're busy but I really think this is something you should prioritize since it could seriously help your team. Let me know if you can find some time.",
  },
  {
    id: "event-bad-4",
    scenario: "event",
    label: "bad",
    probes: "B4 wall of text, B1 vague multi-format ask",
    text: "Hi [name], I hope you've been doing well since we had the chance to meet at the industry event a few weeks back, where we spent some time discussing various challenges your organization has been experiencing with its current approach to customer engagement and retention, particularly as it relates to scaling those efforts sustainably without a corresponding increase in headcount or operational complexity. Since that conversation, I have been thinking quite a bit about how our platform might be able to specifically address several of the pain points you raised, and I would genuinely welcome the opportunity to continue that conversation in more depth, whether through a phone call, a video meeting, or even a follow-up coffee chat, at whatever time might be most convenient given your schedule.",
  },
];
