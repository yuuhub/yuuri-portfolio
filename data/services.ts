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
      "I measure your baseline, find what is slow and why, and hand you a prioritized fix list you can act on.",
    includes: [
      "Baseline measurement of up to 5 key pages (homepage plus 4 money pages)",
      "PageSpeed Insights (mobile and desktop), CrUX field data when available, WebPageTest waterfall",
      "Root-cause analysis: LCP, INP, CLS, TTFB, plugin audit, image and font audit, third-party script audit",
      "Written report with prioritized fixes (P0, P1, P2), estimated impact and effort per fix",
      "A clear call on what is fixable vs what needs a rebuild",
      "1 week turnaround",
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
    price: "from $450",
    priceNote: "fixed by scope",
    description:
      "I implement the fixes, re-measure, and document the before and after. You keep the report.",
    includes: [
      "The audit (or works from an audit you already have)",
      "Implementation of P0 and P1 fixes: image optimization, caching configuration, script deferral, critical CSS, font optimization, plugin cleanup, database cleanup, CDN configuration",
      "Re-measurement and a before/after report (PSI and CrUX)",
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
      "24/7 uptime and performance monitoring (New Relic or equivalent)",
      "Monthly performance report: CWV, uptime, incidents, trends",
      "Incident response: same-day fixes for critical issues",
      "A monthly optimization budget of improvement work (capped hours, agreed per month)",
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
