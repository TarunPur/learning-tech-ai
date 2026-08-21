import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = ["nod-btn", variant === "ghost" ? "nod-ghost" : "", className]
    .filter(Boolean)
    .join(" ");
  return <button type="button" className={classes} {...props} />;
}
