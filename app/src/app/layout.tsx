import type { Metadata } from "next";
import { Spectral, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NOD",
  description: "Your coach against the AI slop — so the skill sticks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spectral.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
