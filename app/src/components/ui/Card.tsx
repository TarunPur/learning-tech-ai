import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

type CardDivProps = HTMLAttributes<HTMLDivElement> & { as?: "div" };
type CardButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" };

export function Card(props: CardDivProps | CardButtonProps) {
  const classes = ["nod-card", props.className].filter(Boolean).join(" ");

  if (props.as === "button") {
    const { as, ...buttonProps } = props;
    void as;
    return <button type="button" className={classes} {...buttonProps} />;
  }

  const { as, ...divProps } = props;
  void as;
  return <div className={classes} {...divProps} />;
}
