// Server-side half of the PRIV-001 masking boundary. Every route that
// persists text or sends it to a model call must run its string fields
// through assertMasked() first. This is defense in depth, not the primary
// control — the client is expected to have already masked (masking.ts) —
// so a field being named `*_masked` is never itself treated as proof; this
// module inspects content, not naming.
import { looksUnmasked } from "@/lib/masking";

export class UnmaskedPayloadError extends Error {
  constructor(public readonly field: string) {
    super(`field "${field}" appears unmasked (contains an email address or phone number)`);
    this.name = "UnmaskedPayloadError";
  }
}

// Throws on the first field that still looks like it carries raw PII.
// `fields` maps a field name (for the error/log) to its string value;
// undefined/null values are skipped (not every field is required on every
// route).
export function assertMasked(fields: Record<string, string | null | undefined>): void {
  for (const [field, value] of Object.entries(fields)) {
    if (!value) continue;
    if (looksUnmasked(value)) {
      throw new UnmaskedPayloadError(field);
    }
  }
}
