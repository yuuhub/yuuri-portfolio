import type { Metadata } from "next";
import { Fraunces, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
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
    "Lead WordPress developer specializing in performance, Core Web Vitals, and conversion optimization. Moved a law firm site from 10% to 90%++ Core Web Vitals Good and grew conversion 46%. Remote from Manila, UTC+8.",
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
      "I make WordPress sites fast and fix what stops visitors from becoming leads. Core Web Vitals 10% to 90%++ Good, conversion +46%.",
    images: [
      {
        url: "https://yuuri.info/og.png",
        width: 1200,
        height: 630,
        alt: "Yuuri Penas, Lead WordPress Developer: performance, Core Web Vitals, and conversion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuuri Penas | Lead WordPress Developer",
    description:
      "I make WordPress sites fast and fix what stops visitors from becoming leads. Core Web Vitals 10% to 90%++ Good, conversion +46%.",
    images: ["https://yuuri.info/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#f6f2e9",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${caveat.variable}`}>
      <body className="ruled-paper">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Yuuri Penas",
                url: "https://yuuri.info",
                email: "mailto:yuuriayano@gmail.com",
                jobTitle: "Lead WordPress Developer",
                description:
                  "Lead WordPress developer specializing in performance, Core Web Vitals, and conversion optimization.",
                knowsAbout: [
                  "WordPress",
                  "Core Web Vitals",
                  "WordPress performance",
                  "page speed optimization",
                  "conversion optimization",
                ],
                sameAs: [
                  "https://www.linkedin.com/in/yuuripenas/",
                  "https://github.com/yuuhub",
                  "https://www.upwork.com/freelancers/yuuripenas",
                ],
                workLocation: "Manila, Philippines",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Yuuri Penas",
                url: "https://yuuri.info",
                description:
                  "Lead WordPress developer: performance, Core Web Vitals, and conversion optimization.",
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "WordPress Performance Audit",
                serviceType: "WordPress performance audit",
                provider: { "@type": "Person", name: "Yuuri Penas", url: "https://yuuri.info" },
                areaServed: "Worldwide",
                offers: {
                  "@type": "Offer",
                  price: "300",
                  priceCurrency: "USD",
                  description: "Baseline, root-cause analysis, and prioritized fix list. Audit fee credited toward a speed sprint.",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "WordPress Speed Optimization Sprint",
                serviceType: "WordPress speed optimization",
                provider: { "@type": "Person", name: "Yuuri Penas", url: "https://yuuri.info" },
                areaServed: "Worldwide",
                offers: {
                  "@type": "Offer",
                  price: "1200",
                  priceCurrency: "USD",
                  description: "Audit included: find what is slow, fix it, re-measure, and hand over before and after proof.",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "WordPress Performance Retainer",
                serviceType: "WordPress performance monitoring",
                provider: { "@type": "Person", name: "Yuuri Penas", url: "https://yuuri.info" },
                areaServed: "Worldwide",
                offers: {
                  "@type": "Offer",
                  price: "300",
                  priceCurrency: "USD",
                  description: "Monthly: uptime and performance monitoring, monthly report, priority fixes.",
                },
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
