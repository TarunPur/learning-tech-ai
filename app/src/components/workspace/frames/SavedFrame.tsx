// Placeholder — Phase 7 replaces this with the real masked history +
// copy-restores-name + Reuse list (journey.md §6).
export function SavedFrame({ savedMessageId }: { savedMessageId: string | null }) {
  return (
    <div>
      <h2 className="nod-f-title">
        Saved to your <em>history.</em>
      </h2>
      <p className="nod-f-lede">
        {savedMessageId
          ? "Your message is saved. The full history view comes in Phase 7."
          : "Saving…"}
      </p>
    </div>
  );
}
