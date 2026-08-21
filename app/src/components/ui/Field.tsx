import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

type FieldProps = {
  label?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  className?: string;
  children: ReactNode;
};

export function Field({ label, labelProps, className, children }: FieldProps) {
  const classes = ["nod-field", className].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      {label && <label {...labelProps}>{label}</label>}
      <div className="nod-ipt">{children}</div>
    </div>
  );
}

export function FieldInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}
