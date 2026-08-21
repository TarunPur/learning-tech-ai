import { BrandHeader } from "@/components/ui/BrandHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Field, FieldInput } from "@/components/ui/Field";

const arrow = (
  <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 10h12M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function StyleCheckPage() {
  return (
    <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 28px 64px" }}>
      <BrandHeader />

      <div style={{ display: "grid", gap: 44, paddingTop: 52, maxWidth: 480 }}>
        <Card as="button" style={{ padding: "26px 28px" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--blue-deep)",
              margin: "0 0 14px",
            }}
          >
            Start here
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                fontSize: 24,
                lineHeight: 1.12,
                color: "var(--ink)",
              }}
            >
              A prospect went quiet
            </span>
            <span style={{ color: "var(--blue)" }}>{arrow}</span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)" }}>
            Restart the conversation without sounding pushy.
          </p>
        </Card>

        <Button>
          Continue {arrow}
        </Button>

        <Field label="Who are you writing to?">
          <FieldInput type="text" placeholder="A name and how you know them" />
        </Field>

        <div style={{ display: "flex", gap: 8 }}>
          <Chip>Book a 15-minute call</Chip>
          <Chip selected>See the new pricing</Chip>
        </div>
      </div>
    </div>
  );
}
