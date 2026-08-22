import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

type CardDivProps = HTMLAttributes<HTMLDivElement> & { as?: "div" };
type CardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" };

export function Card(props: CardDivProps | CardButtonProps) {
  const classes = ["nod-card", props.className].filter(Boolean).join(" ");

  if (props.as === "button") {
    // className must be pulled out of the spread too, not just `as` — a
    // JSX spread applies after explicit attributes, so leaving className
    // in buttonProps silently overwrote `classes` back down to just the
    // caller's own className, dropping "nod-card" (and its box/border/
    // shadow) from every caller that passes one — e.g. SituationFrame,
    // ChooseFrame. This was the root cause of situation/choose cards
    // rendering with no visible card boundary at all.
    const { as, className, ...buttonProps } = props;
    void as;
    void className;
    return <button type="button" className={classes} {...buttonProps} />;
  }

  const { as, className, ...divProps } = props;
  void as;
  void className;
  return <div className={classes} {...divProps} />;
}
