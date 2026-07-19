import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BazGym Carnival 2026 — 5 & 6 Sept @ Bedok HomeTeamNS",
  description:
    "BazGym Carnival 2026: two days of flips, thrills & first-time tries. Free entry, open to all. 10am–5pm, Bedok HomeTeamNS.",
  openGraph: {
    title: "BazGym Carnival 2026",
    description: "Two days of flips, thrills & first tries. Bedok HomeTeamNS, 5–6 September 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
