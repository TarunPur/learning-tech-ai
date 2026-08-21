// The real recipient name never reaches the server (the masking invariant —
// ERD.md). To restore it at copy-to-send for a saved message, we keep a
// local, device-only map from message id -> the real first name that was
// masked into [name] when that message was saved.

const KEY = "nod.name-map";

function readMap(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

export function rememberName(messageId: string, realName: string) {
  try {
    const map = readMap();
    map[messageId] = realName;
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // localStorage unavailable — copy will just show the masked text.
  }
}

export function recallName(messageId: string): string | null {
  return readMap()[messageId] ?? null;
}
