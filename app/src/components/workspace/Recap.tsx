import { scenario } from "@/lib/flow";
import type { DraftState, FrameKey } from "./types";

type RecapData = { label: string; value: string; extra?: string };

function recapOf(frameKey: FrameKey, draft: DraftState): RecapData {
  if (frameKey === "situation") {
    const isCustom = draft.scenario === "custom";
    const sc = draft.scenario && draft.scenario !== "custom" ? scenario(draft.scenario) : null;
    const title = isCustom ? draft.customText || "A different outreach message" : sc?.title ?? "—";
    const writing = isCustom ? "A message" : sc?.writing ?? "";
    return { label: "Your task", value: title, extra: `You're writing ${writing}` };
  }
  if (frameKey === "details") {
    const parts: string[] = [];
    if (draft.ctx) parts.push(`Context: ${draft.ctx}`);
    if (draft.ask) parts.push(`Asking for: ${draft.ask}`);
    return { label: "Your details", value: draft.who || "—", extra: parts.join(" · ") };
  }
  if (frameKey === "choose") {
    return {
      label: "How you're starting",
      value: draft.path === "nod" ? "Reacting to a NOD draft" : "Writing my own version",
    };
  }
  if (frameKey === "draft") {
    if (draft.path === "nod") return { label: "Your version", value: "You spotted the weak line" };
    const excerpt = draft.ownText.replace(/\s+/g, " ").trim() || "Your first version";
    return { label: "Your version", value: excerpt.length > 110 ? excerpt.slice(0, 110) + "…" : excerpt };
  }
  return { label: "", value: "" };
}

type RecapProps = {
  frameKey: FrameKey | null;
  draft: DraftState;
  onEdit: () => void;
};

export function Recap({ frameKey, draft, onEdit }: RecapProps) {
  if (!frameKey) {
    return (
      <p className="nod-recap-empty">
        What you decide will stay here — clear, and always yours to change.
      </p>
    );
  }

  const d = recapOf(frameKey, draft);

  return (
    <div className="nod-recap">
      <div className="nod-recap-head">
        <span className="nod-recap-label">{d.label}</span>
        <button className="nod-recap-edit" type="button" onClick={onEdit}>
          Edit
        </button>
      </div>
      <p className="nod-recap-value">{d.value}</p>
      {d.extra && <p className="nod-recap-extra">{d.extra}</p>}
    </div>
  );
}
