import { BrandMark } from "./BrandMark";

export function BrandHeader() {
  return (
    <>
      <header className="nod-ghead">
        <span className="nod-logo" aria-hidden="true">
          <BrandMark size={30} />
        </span>
        <span className="nod-gtext">
          <span className="nod-gname">NOD</span>
          <span className="nod-gtag">Your coach against the AI slop — so the skill sticks</span>
        </span>
      </header>
      <div className="nod-ghair" />
    </>
  );
}
