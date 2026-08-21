// Masking runs client-side, before any fetch — no raw name/company identifier
// is ever sent to the server or the model (ERD.md's masking invariant).

export type MaskToken = { value: string; placeholder: string };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function mask(text: string, tokens: MaskToken[]): string {
  let result = text;
  for (const { value, placeholder } of tokens) {
    if (!value.trim()) continue;
    const re = new RegExp(`\\b${escapeRegExp(value)}\\b`, "gi");
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
