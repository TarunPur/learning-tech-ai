import Anthropic from "@anthropic-ai/sdk";
import type { ScenarioId } from "@/lib/flow";
import { evaluate } from "./evaluate";

const SYSTEM_PROMPT = `You are NOD, rewriting a Marketing/Sales professional's masked outreach draft so it meets the expert standard. State the real reason for reaching out as a plain declarative statement (drawn only from what's actually in the draft — never invent facts, names, or events not present) — never phrase it as a question ("did you get a chance to review it?", "any thoughts?"), since a question about the earlier context reads as a second ask alongside the real one, and that's exactly the dual-ask failure you're fixing. Exactly one clear, low-friction ask matched to the message's stage, phrased as the message's only question. 50–125 words. Plain, direct language. No soft opener ("just checking in", "I hope this finds you well", "I wanted to reach out"). Keep any masked placeholders ([name], [company]) exactly as written — never fill in a real name. Output the rewritten message only, no preamble, no explanation.

Example shape (adapt the specifics to the actual draft, don't reuse this content): "Hi [name], following up on the doc I sent over — would Thursday at 2pm work for a 15-minute call to walk through it?" — one declarative reason clause, one specific-time question, nothing else.`;

async function generateOnce(maskedDraft: string, scenario: ScenarioId): Promise<string> {
  const client = new Anthropic();
  const model = process.env.NOD_EVALUATOR_MODEL || "claude-opus-4-8";

  const response = await client.messages.create({
    model,
    max_tokens: 1000,
    thinking: { type: "adaptive" },
    output_config: { effort: "medium" },
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Situation: ${scenario}\n\nDraft to rewrite:\n${maskedDraft}`,
      },
    ],
  });

  const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
  if (!textBlock) throw new Error("Rewrite response contained no text block");
  return textBlock.text.trim();
}

export async function rewriteDraft(
  maskedDraft: string,
  scenario: ScenarioId
): Promise<{ text: string; corePass: boolean }> {
  const first = await generateOnce(maskedDraft, scenario);
  const firstCheck = await evaluate(first, scenario);
  if (firstCheck.core_pass) {
    return { text: first, corePass: true };
  }

  const second = await generateOnce(maskedDraft, scenario);
  const secondCheck = await evaluate(second, scenario);
  if (secondCheck.core_pass) {
    return { text: second, corePass: true };
  }

  // Neither pass — use whichever cleared more core criteria.
  const firstScore = [firstCheck.criteria.b1, firstCheck.criteria.b2, firstCheck.criteria.b4].filter(
    (c) => c.pass
  ).length;
  const secondScore = [secondCheck.criteria.b1, secondCheck.criteria.b2, secondCheck.criteria.b4].filter(
    (c) => c.pass
  ).length;
  return secondScore > firstScore ? { text: second, corePass: false } : { text: first, corePass: false };
}
