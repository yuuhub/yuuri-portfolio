export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Yuuri has been instrumental in managing our agency's technical operations. His ability to handle everything from complex WordPress development to server management has made him an invaluable asset. What impresses me most is his proactive approach to solving problems and his commitment to delivering high-quality work, even under tight deadlines. His technical versatility and reliability make him a standout developer.",
    name: "David Eldred",
    role: "Owner, Sundae Websites",
  },
  {
    quote:
      "During his time at Get Hooked 360, Yuuri showed exceptional growth as a developer. He quickly progressed from handling basic WordPress tasks to implementing complex features and improving site performance across multiple projects. His background in UI/UX design gave him a unique edge in understanding both technical and user experience aspects. His dedication to learning and ability to adapt to new technologies made him a valuable team member.",
    name: "Bong Elepano",
    role: "Head of Technology Solutions, Get Hooked 360",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "law-firm-10-to-90-core-web-vitals",
    title: "How I moved a law firm site from 10% to 90%++ Core Web Vitals Good",
    date: "Sep 2026",
    excerpt:
      "The full story of the performance work behind the numbers: what was slow, what I changed, and how the business results followed.",
  },
  {
    slug: "salesforce-api-broke-monthly",
    title: "The Salesforce API integration that broke monthly for years",
    date: "Oct 2026",
    excerpt:
      "A chronic integration failure, the root cause nobody found, and the fix that made it permanent.",
  },
  {
    slug: "form-error-automations",
    title: "Form error automations: recovering leads from malformed submissions",
    date: "Nov 2026",
    excerpt:
      "When users fail to format inputs correctly, leads get lost. Here is how I built a safety net for previously lost revenue.",
  },
  {
    slug: "new-relic-monitoring-single-client",
    title: "Building 24/7 monitoring with New Relic on a single client budget",
    date: "Dec 2026",
    excerpt:
      "How incident detection went from days to under 30 minutes without an enterprise budget.",
  },
  {
    slug: "page-builders-4x-javascript",
    title: "Why page builders cost ~4x the JavaScript of custom themes",
    date: "Jan 2027",
    excerpt:
      "The data on page builder overhead, and what it means for Core Web Vitals and your budget.",
  },
  {
    slug: "what-a-core-web-vitals-audit-delivers",
    title: "What a Core Web Vitals audit actually delivers",
    date: "Feb 2027",
    excerpt:
      "A plain-language walkthrough of the audit process: baseline, root causes, prioritized fixes, and the before/after proof.",
  },
];
