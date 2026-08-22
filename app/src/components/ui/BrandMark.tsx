type BrandMarkProps = {
  size?: number;
  className?: string;
};

/**
 * The "N-turn" mark: a geometric N whose diagonal stroke breaks and
 * corrects upward before completing — first attempt, correction, skill sticks.
 */
export function BrandMark({ size = 24, className }: BrandMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 4 L8 20" stroke="#2F6FE0" strokeWidth="4.6" strokeLinecap="butt" />
      <path d="M16 4 L16 20" stroke="#2F6FE0" strokeWidth="4.6" strokeLinecap="butt" />
      <path d="M8.4 4.8 L11.2 10.4" stroke="#2F6FE0" strokeWidth="4.6" strokeLinecap="butt" />
      <path
        d="M13.6 10.2 L14.4 16.8 L15.6 19.2"
        stroke="#2F6FE0"
        strokeWidth="4.6"
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
    </svg>
  );
}
