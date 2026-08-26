import type { Metadata } from "next";
import { Fraunces, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yuuri.info"),
  title: {
    default: "Yuuri Penas | Lead WordPress Developer: Performance, Core Web Vitals & Conversion",
    template: "%s | Yuuri Penas",
  },
  description:
    "Lead WordPress developer specializing in performance, Core Web Vitals, and conversion optimization. Moved a law firm site from 10% to 89% Core Web Vitals Good and grew conversion 46%. Remote from Manila, UTC+8.",
  keywords: [
    "WordPress developer",
    "Core Web Vitals",
    "WordPress performance",
    "page speed optimization",
    "conversion optimization",
    "WordPress speed",
    "WordPress optimization",
  ],
  authors: [{ name: "Yuuri Penas", url: "https://yuuri.info" }],
  creator: "Yuuri Penas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yuuri.info",
    siteName: "Yuuri Penas",
    title: "Yuuri Penas | Lead WordPress Developer: Performance, Core Web Vitals & Conversion",
    description:
      "I make WordPress sites fast and reliable for marketing-led companies. Core Web Vitals 10% to 89% Good, conversion +46%.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuuri Penas | Lead WordPress Developer",
    description:
      "I make WordPress sites fast and reliable for marketing-led companies. Core Web Vitals 10% to 89% Good, conversion +46%.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://yuuri.info",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${caveat.variable}`}>
      <body className="ruled-paper">{children}</body>
    </html>
  );
}
