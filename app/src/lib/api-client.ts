import type { ScenarioId } from "@/lib/flow";
import type { EvaluateResult } from "@/lib/rubric/evaluate";

async function json<T>(pending: Promise<Response>): Promise<T> {
  const res = await pending;
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

export function createAttempt(scenario: ScenarioId, customTaskMasked?: string) {
  return json<{ id: string }>(
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario, customTaskMasked }),
    })
  );
}

export function patchAttempt(id: string, patch: Record<string, unknown>) {
  return json<{ ok: boolean }>(
    fetch(`/api/attempts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
  );
}

export function checkDraft(input: {
  attemptId: string;
  draftMasked: string;
  scenario: ScenarioId;
  path: "own" | "nod";
  revisionIndex: number;
}) {
  return json<EvaluateResult>(
    fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
  );
}

export function rewriteDraftRequest(draftMasked: string, scenario: ScenarioId) {
  return json<{ text: string; corePass: boolean }>(
    fetch("/api/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ draftMasked, scenario }),
    })
  );
}

export function generateNodDraft(input: {
  scenario: ScenarioId;
  recipientMasked: string;
  ask: string;
  contextMasked: string;
}) {
  return json<{ draftMasked: string; sample: boolean; check: EvaluateResult }>(
    fetch("/api/nod-draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
  );
}

export function saveMessage(input: {
  attemptId: string;
  title: string;
  scenario: ScenarioId;
  textMasked: string;
  ask?: string;
  authored: "own" | "nod" | "nod-rewrote";
}) {
  return json<{ id: string }>(
    fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    })
  );
}

export type SavedMessage = {
  id: string;
  title: string;
  scenario: ScenarioId;
  text_masked: string;
  ask: string | null;
  authored: "own" | "nod" | "nod-rewrote";
  created_at: string;
};

export function fetchMessages() {
  return json<{ messages: SavedMessage[] }>(fetch("/api/messages"));
}
