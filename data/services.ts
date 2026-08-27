export type Service = {
  slug: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  includes: string[];
  notIncluded: string[];
  cta: string;
  ctaHref: string;
};

export const services: Service[] = [
  {
    slug: "performance-audit",
    name: "Performance Audit",
    price: "$300 to $500",
    priceNote: "fixed",
    description:
      "I find what is slow and why, and hand you a prioritized fix list.",
    includes: [
      "Baseline of up to 5 key pages",
      "PageSpeed Insights, CrUX, and WebPageTest analysis",
      "Root-cause analysis: LCP, INP, CLS, TTFB, plugins, images, fonts, scripts",
      "Written report with prioritized fixes and estimated impact",
      "Clear call: fix or rebuild",
      "1 week turnaround",
      "Audit fee credited toward a Speed Optimization Sprint",
    ],
    notIncluded: [
      "Implementing fixes",
      "Hosting changes",
      "Ongoing monitoring",
    ],
    cta: "Book an audit",
    ctaHref: "mailto:yuuriayano@gmail.com?subject=Performance%20Audit%20inquiry",
  },
  {
    slug: "speed-optimization-sprint",
    name: "Speed Optimization Sprint",
    price: "from $700",
    priceNote: "fixed by scope",
    description:
      "Audit included: I find what is slow, fix it, re-measure, and hand you the before and after proof.",
    includes: [
      "Performance audit included (credited if you bring an existing one)",
      "P0 and P1 fixes: images, caching, scripts, critical CSS, fonts, plugins, database, CDN",
      "Re-measurement and a before/after report",
      "2 to 4 weeks depending on scope",
    ],
    notIncluded: [
      "Theme rebuilds",
      "Redesigns",
      "Content changes",
      "New features",
      "Ongoing maintenance",
    ],
    cta: "Book a sprint",
    ctaHref: "mailto:yuuriayano@gmail.com?subject=Speed%20Optimization%20Sprint%20inquiry",
  },
  {
    slug: "performance-retainer",
    name: "Performance Retainer",
    price: "from $300/mo",
    priceNote: "month to month",
    description:
      "24/7 monitoring, monthly report, incident response. The site stays fast after I leave.",
    includes: [
      "24/7 uptime and performance monitoring",
      "Monthly performance report: CWV, uptime, incidents, trends",
      "Incident response: same-day fixes for critical issues",
      "Monthly optimization budget (capped hours, agreed per month)",
      "Month to month, cancel anytime",
    ],
    notIncluded: [
      "New features",
      "Redesigns",
      "Content production",
    ],
    cta: "Book a call",
    ctaHref: "mailto:yuuriayano@gmail.com?subject=Performance%20Retainer%20inquiry",
  },
];
