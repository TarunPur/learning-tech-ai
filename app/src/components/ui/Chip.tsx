import type { ButtonHTMLAttributes } from "react";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean };

export function Chip({ selected, className, ...props }: ChipProps) {
  const classes = ["nod-chip", className].filter(Boolean).join(" ");
  return <button type="button" className={classes} aria-pressed={selected} {...props} />;
}
