// Ported from design/mockups/shared/flow.js. evaluateText() and the
// planted-flaw composeDraft() are dropped — those become real server calls
// in Phase 5/6. Scenario ids match ERD.md's `attempts.scenario` enum.

export type ScenarioId = "quiet" | "cold" | "meeting" | "event" | "custom";

export type Scenario = {
  id: ScenarioId;
  title: string;
  desc: string;
  chip: string;
  writing: string;
  pHeading: string;
  pSub: string;
  whoPh: string;
  askPh: string;
  ctxPh: string;
};

export const SCENARIOS: Record<Exclude<ScenarioId, "custom">, Scenario> & {
  custom: Scenario;
} = {
  quiet: {
    id: "quiet",
    title: "A prospect went quiet",
    desc: "Restart the conversation without sounding pushy.",
    chip: "Follow-up · A prospect went quiet",
    writing: "A follow-up message",
    pHeading: "First, who went quiet — <em>and what you need.</em>",
    pSub: "Three quick lines about your situation — you'll use them to write your follow-up next, and I'll help you make it sharp.",
    whoPh: "e.g. Nidhi, a marketing lead I met in June",
    askPh: "e.g. a 20-minute call next week",
    ctxPh: "e.g. we spoke at the expo and she asked me to follow up after launch",
  },
  cold: {
    id: "cold",
    title: "Reach out to someone new",
    desc: "Write a personalized first message.",
    chip: "Cold intro · Reaching out to someone new",
    writing: "A first message",
    pHeading: "Who are you reaching out to — <em>and why now?</em>",
    pSub: "Three quick lines — you'll use them to write a first message next; I'll help it earn a reply without sounding like a cold pitch.",
    whoPh: "e.g. Arjun, who leads growth at a fintech I admire",
    askPh: "e.g. a quick 15-minute intro call",
    ctxPh: "e.g. they just opened a Pune office and I can help with X",
  },
  meeting: {
    id: "meeting",
    title: "Book a meeting or demo",
    desc: "Turn interest into a conversation.",
    chip: "Meeting request · Booking a demo or call",
    writing: "A meeting request",
    pHeading: "Who are you meeting — <em>and what's the next step?</em>",
    pSub: "Three quick lines — you'll use them to write your request next; I'll help make saying yes to a time the easy choice.",
    whoPh: "e.g. Meera, a product lead who liked our last demo",
    askPh: "e.g. 30 minutes to walk through it",
    ctxPh: "e.g. she asked to see pricing once we shipped the new plan",
  },
  event: {
    id: "event",
    title: "Follow up after an event",
    desc: "Reconnect while it's still fresh.",
    chip: "Event follow-up · Reconnecting after meeting",
    writing: "An event follow-up",
    pHeading: "Who did you meet — <em>and what should you continue?</em>",
    pSub: "Three quick lines — you'll use them to write your follow-up next; I'll help you pick the conversation back up while it's warm.",
    whoPh: "e.g. Sam, who I met at the SaaS meetup on Friday",
    askPh: "e.g. a coffee next week to keep talking",
    ctxPh: "e.g. we talked about onboarding and they wanted our notes",
  },
  custom: {
    id: "custom",
    title: "Your task",
    desc: "",
    chip: "Your task",
    writing: "A message",
    pHeading: "First, who it's for — <em>and what you need.</em>",
    pSub: "Three quick lines about your situation — you'll write the first version next, and I'll help you refine it.",
    whoPh: "e.g. the person you're writing to, and how you know them",
    askPh: "e.g. the one thing you want them to do",
    ctxPh: "e.g. what makes now the right moment to send it",
  },
};

export const SITUATIONS: Scenario[] = [SCENARIOS.quiet, SCENARIOS.cold, SCENARIOS.meeting, SCENARIOS.event];

export const ASK_SUGGESTIONS = ["A 15-minute call", "Two times to choose from", "A quick yes/no reply"];

export function scenario(id: ScenarioId): Scenario {
  return SCENARIOS[id] ?? SCENARIOS.quiet;
}

export type TaskClassification = { kind: "outreach" | "offscope" | "abuse"; scenario: ScenarioId };

// FUN-001: a deterministic, best-effort guard against (a) obvious
// prompt-injection attempts aimed at the evaluator/generator LLM calls and
// (b) clearly unsafe/abusive content — checked before anything else so
// neither category can reach the model. This is intentionally NOT a full
// safety classifier (that would mean an extra moderation model call, a
// cost/latency tradeoff for the owner to decide, not a silent addition) —
// it is a keyword/pattern net that catches the unambiguous cases and errs
// toward letting genuinely ambiguous text through to the normal
// outreach/offscope check below.
const INJECTION_PATTERNS = [
  /ignore\s+(all|any|the|previous|prior|above)\s+instructions?/i,
  /disregard\s+(your|the|all)\s+(system\s+)?instructions?/i,
  /you\s+are\s+now\s+(a|an)\b/i,
  /new\s+system\s+prompt/i,
  /reveal\s+your\s+(system\s+)?prompt/i,
  /act\s+as\s+(?!.*(outreach|sales|marketer|marketing))\w+/i,
  /pretend\s+(you('| a)?re|to\s+be)\b/i,
  /\bDAN\b|jailbreak/i,
];
const ABUSE_PATTERNS = [
  /\b(kill|murder|rape|assault)\s+(myself|yourself|him|her|them|you)\b/i,
  /\bhow\s+to\s+(make|build)\s+a\s+(bomb|weapon|explosive)\b/i,
  /\b(child|minor)\s+(porn|sexual|abuse)/i,
  /\bsuicide\s+(method|instructions?)\b/i,
];

const OFFSCOPE = [
  "proposal", "report", "deck", "presentation", "slide", "spreadsheet", "excel", "sheet",
  "blog", "article", "post", "linkedin post", "resume", "cv", "essay", "contract", "invoice",
  "document", "doc ", "strategy", "business plan", "memo", "newsletter", "whitepaper",
  "case study", "script", "code",
];
const OUTREACH = [
  "email", "message", "follow up", "follow-up", "followup", "chaser", "reach out", "reaching out",
  "intro", "introduc", "connect", "reply", "respond", "nudge", "ping", "pitch", "invite",
  "reconnect", "thank you", "thank-you", "outreach", "cold", "prospect", "client", "lead",
  "meeting", "demo", "call", "dm",
];

export function looksLikeAbuseOrInjection(text: string): boolean {
  return [...INJECTION_PATTERNS, ...ABUSE_PATTERNS].some((re) => re.test(text));
}

// The soft funnel (PRD §13): a lightweight intent check on the "something
// else" free-text task. When unsure, treat it as outreach.
export function classifyTask(text: string): TaskClassification {
  if (looksLikeAbuseOrInjection(text)) {
    return { kind: "abuse", scenario: "quiet" };
  }

  const t = text.toLowerCase();

  let sc: ScenarioId = "quiet";
  if (/\b(meeting|demo|call|book|schedule|walk ?through)\b/.test(t)) sc = "meeting";
  else if (/\b(event|expo|conference|meetup|met (you|them|at)|thank|after the)\b/.test(t)) sc = "event";
  else if (/\b(cold|new|intro|introduc|reach(ing)? out|first message|someone new)\b/.test(t)) sc = "cold";

  const hasOff = OFFSCOPE.some((k) => t.includes(k));
  const hasOut = OUTREACH.some((k) => t.includes(k));
  const kind = hasOff && !hasOut ? "offscope" : "outreach";

  return { kind, scenario: sc };
}
