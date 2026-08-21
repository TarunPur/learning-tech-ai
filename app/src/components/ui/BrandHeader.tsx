export function BrandHeader() {
  return (
    <>
      <header className="nod-ghead">
        <span className="nod-logo" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6A2.5 2.5 0 0 1 17.5 15H9l-4 3.5V15H6.5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 9.2l1.8 1.8 3.4-3.7"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
