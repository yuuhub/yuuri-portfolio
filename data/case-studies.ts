export type CaseStudy = {
  slug: string;
  title: string;
  tag: string;
  stack: string;
  summary: string;
  url?: string;
  metrics?: { label: string; value: string }[];
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "law-firm-wordpress",
    title: "Law Firm WordPress Site: One of Wisconsin's biggest family law firms",
    tag: "flagship case study",
    stack: "WordPress, Divi child theme, WP Rocket, Cloudflare CDN, Cloudways, Redis, New Relic, Salesforce API, GA4",
    summary:
      "Sole developer for one of the biggest family law firms in Wisconsin. A 4,000+ page WordPress site that was slow and bloated, with every form fill the firm receives coming through the website. I took Core Web Vitals from 10% to 89% Good, grew conversion 46%, and built 24/7 monitoring that cut incident response from days to under 30 minutes.",
    metrics: [
      { label: "Core Web Vitals", value: "10% to 89%" },
      { label: "Conversion", value: "9.4% to 13.7%" },
      { label: "Incidents", value: "22 resolved, 0 unnoticed" },
    ],
    featured: true,
  },
  {
    slug: "tristate-hydrovac",
    title: "TriState Hydrovac",
    tag: "case study",
    stack: "Divi + custom CSS/JS",
    url: "https://tristatehydrovac.com",
    summary:
      "Built the site with Divi and added custom design elements on top. Live at tristatehydrovac.com.",
  },
  {
    slug: "unahco",
    title: "UNAHCO",
    tag: "case study",
    stack: "Custom WP theme + Bootstrap",
    url: "https://unahco.com",
    summary:
      "Custom WordPress theme development with Bootstrap integration for a Philippine cooperative.",
  },
  {
    slug: "first-balfour",
    title: "First Balfour Revamp",
    tag: "case study",
    stack: "Divi",
    url: "https://firstbalfour.com",
    summary: "Led website redesign for a major Philippine energy company.",
  },
  {
    slug: "spark-therapy",
    title: "Spark Therapy",
    tag: "case study",
    stack: "Divi",
    url: "https://sparktherapy.net",
    summary: "Speech therapy platform built and designed with Divi.",
  },
  {
    slug: "myra-ph",
    title: "Myra PH Product Pages",
    tag: "case study",
    stack: "Custom product pages",
    url: "https://myra.com.ph/products/myra-400-e/",
    summary: "Custom product pages for a leading Philippine skincare brand.",
  },
  {
    slug: "dr-mitchell-dickey",
    title: "Dr Mitchell Dickey Design",
    tag: "case study",
    stack: "Custom design",
    url: "http://www.inspiringlife.online/clientProjProgress_Mitch/",
    summary: "Website design for a private psychiatric practice.",
  },
];
