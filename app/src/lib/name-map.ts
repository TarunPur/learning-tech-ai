// The real recipient identifiers never reach the server (the masking
// invariant — ERD.md). To restore them at copy-to-send for a saved message,
// we keep a local, device-only map from message id -> the real
// name/company mask tokens used when that message was saved.

import type { MaskToken } from "./masking";

const KEY = "nod.name-map";

function readMap(): Record<string, MaskToken[]> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, MaskToken[]>;
  } catch {
    return {};
  }
}

export function rememberName(messageId: string, tokens: MaskToken[]) {
  try {
    const map = readMap();
    map[messageId] = tokens;
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // localStorage unavailable — copy will just show the masked text.
  }
}

export function recallName(messageId: string): MaskToken[] | null {
  return readMap()[messageId] ?? null;
}
