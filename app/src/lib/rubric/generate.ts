import Anthropic from "@anthropic-ai/sdk";
import type { ScenarioId } from "@/lib/flow";

const SYSTEM_PROMPT = `You are NOD, writing a first-version outreach message for a Marketing/Sales professional, from their masked context only. Never invent facts, names, events, or details not given. If no specific context is given, write a plausible, clearly generic opening reason rather than a fabricated specific — the app separately tells the user this is a sample, so do NOT write any bracketed label, meta-commentary, or note like "[generic sample]" into the message itself. One clear ask matched to the message's stage, 50–125 words, plain language, no soft opener. Keep masked placeholders ([name]) exactly as given. Output the message text only — nothing else, no preamble, no labels.`;

export async function generateInitialDraft(
  scenario: ScenarioId,
  input: { recipientMasked: string; ask: string; contextMasked: string }
): Promise<{ text: string; sample: boolean }> {
  const sample = input.contextMasked.trim() === "";
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
        content: `Situation: ${scenario}\nWriting to: ${input.recipientMasked}\nThe one ask: ${input.ask}\nContext (why now): ${sample ? "(none given — write a generic, clearly-labeled sample)" : input.contextMasked}`,
      },
    ],
  });

  const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
  if (!textBlock) throw new Error("Draft generation returned no text block");
  return { text: textBlock.text.trim(), sample };
}
