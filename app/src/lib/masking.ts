// Masking runs client-side, before any fetch — no raw name/company identifier
// is ever sent to the server or the model (ERD.md's masking invariant).
//
// This module is the single shared masking/PII boundary (PRIV-001): every
// field that leaves the browser for a persistence or model route must be run
// through maskAllPII() (or, for the "who" field itself, buildMaskTokens() +
// mask()) before it is sent. Server routes independently re-scan with
// looksUnmasked() as defense in depth — see src/lib/pii-guard.ts.

export type MaskToken = { value: string; placeholder: string };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function mask(text: string, tokens: MaskToken[]): string {
  let result = text;
  for (const { value, placeholder } of tokens) {
    if (!value.trim()) continue;
    const re = new RegExp(`\\b${escapeRegExp(value)}\\b`, "giu");
    result = result.replace(re, placeholder);
  }
  return result;
}

export function unmask(text: string, tokens: MaskToken[]): string {
  let result = text;
  for (const { value, placeholder } of tokens) {
    if (!value.trim()) continue;
    const re = new RegExp(escapeRegExp(placeholder), "g");
    result = result.replace(re, value);
  }
  return result;
}

export function maskName(text: string, name: string): string {
  return mask(text, [{ value: name, placeholder: "[name]" }]);
}

export function unmaskName(text: string, name: string): string {
  return unmask(text, [{ value: name, placeholder: "[name]" }]);
}

// Stops the name phrase before a descriptor clause: "Priya, a marketing lead
// at Acme" -> "Priya"; "priya sharma who leads growth" -> "priya sharma";
// "Arjun from Initech" -> "Arjun" (at/from/with also stop the name, since
// what follows is a company/context clause, not part of the name).
// Deliberately does NOT require a capital letter — lowercase ("priya"),
// ALL-CAPS ("PRIYA"), and accented (\p{L} is Unicode-aware) names all match,
// unlike the old /\b([A-Z][a-z]+)\b/ heuristic that only caught Capitalized
// First Names (RUBRIC/PRIV-001 finding).
const NAME_STOP = /,|\bwho\b|\bthat\b|\bwhich\b|\bat\b|\bfrom\b|\bwith\b/iu;
const COMPANY_TRIGGER = /\b(?:at|from|with)\s+/iu;
const WORD = /[\p{L}][\p{L}0-9&.'-]*/u;

export function extractIdentifiers(who: string): { name: string; company: string | null } {
  const trimmed = who.trim();
  if (!trimmed) return { name: "", company: null };

  const stopMatch = trimmed.search(NAME_STOP);
  const namePart = (stopMatch === -1 ? trimmed : trimmed.slice(0, stopMatch)).trim();
  const name = namePart.replace(/[^\p{L}\s'-]/gu, "").trim();

  // Bound the company phrase the same way the name is bounded — up to the
  // next comma/who/that/which — instead of a greedy word-count regex, which
  // would otherwise swallow whatever clause follows ("Arjun from Initech who
  // emailed last week" must yield "Initech", not "Initech who emailed last").
  let company: string | null = null;
  const triggerMatch = trimmed.match(COMPANY_TRIGGER);
  if (triggerMatch && triggerMatch.index !== undefined) {
    const after = trimmed.slice(triggerMatch.index + triggerMatch[0].length);
    const clauseStop = after.search(/,|\bwho\b|\bthat\b|\bwhich\b/iu);
    const segment = (clauseStop === -1 ? after : after.slice(0, clauseStop)).trim();
    const words = (segment.match(new RegExp(WORD, "gu")) ?? []).slice(0, 4);
    company = words.length > 0 ? words.join(" ").replace(/[.,]+$/, "").trim() : null;
  }

  return { name, company: company || null };
}

// First name only, for greetings/reassurance copy ("Hi Priya" / "Hi priya"
// as typed — we don't force-capitalize what the user wrote).
export function firstName(who: string): string {
  const { name } = extractIdentifiers(who);
  if (!name) return "there";
  return name.split(/\s+/)[0] ?? "there";
}

export function buildMaskTokens(who: string): MaskToken[] {
  const { name, company } = extractIdentifiers(who);
  const tokens: MaskToken[] = [];
  if (name) tokens.push({ value: name, placeholder: "[name]" });
  if (company && company.toLowerCase() !== name.toLowerCase()) {
    tokens.push({ value: company, placeholder: "[company]" });
  }
  return tokens;
}

// Deterministic, low-false-positive-risk PII categories that a client-side
// name mask can't cover: an email address, or a run of 9+ digits (covers
// 10-digit domestic numbers and longer international ones) however it's
// punctuated/spaced. Shared with the server-side guard in pii-guard.ts so
// there is exactly one definition of "looks like PII" in the codebase.
export const EMAIL_RE = /[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[\p{L}]{2,}/gu;
export const PHONE_RE = /(?:\+?\d[\s().-]?){8,}\d/g;

// PRIV-001 (round 5): targeted, not blanket — a generic "any two capitalized
// words" name/company detector has a real false-positive rate against
// ordinary business terms ("Q3 Roadmap") that isn't worth shipping blind.
// This instead looks for the *exact* structural pattern buildMaskTokens()
// is supposed to have already replaced: "at/from/with <Capitalized word>"
// that ISN'T followed by a placeholder. If masking worked, this construction
// should never survive as anything but "at/from/with [company]" — so
// catching it here is a real defense-in-depth check on the masking
// invariant itself, narrower than a bare capitalized-word scan, at the cost
// of not catching a company/name mentioned without one of these three
// trigger words (a residual gap that's architecturally unavoidable without
// either NER or an LLM redaction call — both flagged separately, not
// silently built).
export const UNMASKED_COMPANY_RE = /\b(?:at|from|with)\s+(?!\[)\p{Lu}[\p{L}0-9&.'-]*/gu;

export function scrubGenericPII(text: string): string {
  return text.replace(EMAIL_RE, "[email]").replace(PHONE_RE, "[phone]");
}

export function looksUnmasked(text: string): boolean {
  EMAIL_RE.lastIndex = 0;
  PHONE_RE.lastIndex = 0;
  UNMASKED_COMPANY_RE.lastIndex = 0;
  return EMAIL_RE.test(text) || PHONE_RE.test(text) || UNMASKED_COMPANY_RE.test(text);
}

// The one function every field should pass through before it's sent to a
// persistence or model route: masks the recipient name + company tokens,
// then scrubs any email/phone that slipped in anywhere in the text (not just
// in the "who" field — an email or number can appear in the ask or context
// too, e.g. "reply to me at ..." typed into the context box).
export function maskAllPII(text: string, tokens: MaskToken[]): string {
  return scrubGenericPII(mask(text, tokens));
}
