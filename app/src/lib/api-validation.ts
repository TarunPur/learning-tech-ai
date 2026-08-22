// API-001: runtime request validation shared by every route. Routes stop
// trusting a TypeScript cast on the parsed JSON body and instead validate it
// against one of these schemas; a malformed request gets a controlled 400
// instead of reaching the database or the model.
import { NextResponse } from "next/server";
import { z } from "zod";

export const scenarioSchema = z.enum(["quiet", "cold", "meeting", "event", "custom"]);

// Generous but bounded — the coaching loop's own text lives in the low
// hundreds of words; this just stops an oversized/abusive payload from
// reaching Supabase or the model (API-001's "maximum model input size").
const shortText = z.string().max(500);
const mediumText = z.string().max(2000);
const longText = z.string().max(6000);
const uuid = z.string().uuid();

export const createAttemptSchema = z.object({
  scenario: scenarioSchema,
  customTaskMasked: mediumText.optional(),
  attemptType: z.enum(["guided", "unaided"]).optional(),
});

export const patchAttemptSchema = z
  .object({
    recipient_masked: shortText.optional(),
    ask: shortText.optional(),
    context_masked: mediumText.optional(),
    path: z.enum(["own", "nod"]).optional(),
    draft_text_masked: longText.optional(),
    check_count: z.number().int().min(0).max(3).optional(),
    outcome: z.enum(["clean", "tightened", "kept", "nod-rewrote", "shipped-with-misses"]).optional(),
    first_pass_criteria: z.record(z.string(), z.boolean()).optional(),
    loops_to_clear: z.number().int().min(0).max(3).optional(),
    completed_at: z.string().datetime().optional(),
  })
  .strict();

export const checkDraftSchema = z.object({
  attemptId: uuid,
  draftMasked: longText,
  scenario: scenarioSchema,
  path: z.enum(["own", "nod"]),
  revisionIndex: z.number().int().min(0).max(2),
});

export const saveMessageSchema = z.object({
  attemptId: uuid,
  title: shortText,
  scenario: scenarioSchema,
  textMasked: longText,
  ask: shortText.optional(),
  authored: z.enum(["own", "nod", "nod-rewrote"]),
});

export const nodDraftSchema = z.object({
  attemptId: uuid,
  scenario: scenarioSchema,
  recipientMasked: shortText,
  ask: shortText,
  contextMasked: mediumText,
});

export const rewriteSchema = z.object({
  attemptId: uuid,
  draftMasked: longText,
  scenario: scenarioSchema,
});

export const createNudgeSchema = z.object({
  attemptId: uuid,
  scenario: scenarioSchema,
});

export const patchNudgeSchema = z.object({
  status: z.enum(["sent", "clicked", "dismissed"]),
});

export type ValidatedBody<T> = { ok: true; data: T } | { ok: false; response: NextResponse };

export async function parseJson<S extends z.ZodTypeAny>(
  request: Request,
  schema: S
): Promise<ValidatedBody<z.infer<S>>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return { ok: false, response: NextResponse.json({ error: "invalid JSON body" }, { status: 400 }) };
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      response: NextResponse.json({ error: "invalid request body", issues: parsed.error.issues }, { status: 400 }),
    };
  }
  return { ok: true, data: parsed.data };
}
