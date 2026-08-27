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

export type FieldNote = {
  note: string;
  tag: string;
};

/**
 * Short learnings from real client work, one line each.
 * Full posts can be added later as a separate blogPosts array
 * (title/date/slug/excerpt) and linked from the field notes section.
 */
export const fieldNotes: FieldNote[] = [
  {
    note: "The biggest CWV win on a 4,000+ page site wasn't one big fix. It was 40 small ones, prioritized by impact.",
    tag: "core web vitals",
  },
  {
    note: "Page builders ship roughly 4x the JavaScript of a custom theme. The evidence is right there in the bundle.",
    tag: "page builders",
  },
  {
    note: "Self-hosted, subset fonts are the cheapest LCP win on the board. Removing one font request beats stacking three optimizations.",
    tag: "fonts",
  },
  {
    note: "Caching is a multiplier, not a fix. It makes a fast site faster and a broken site broken faster.",
    tag: "caching",
  },
  {
    note: "The Salesforce integration broke monthly for years because nobody checked the API's rate limits until the 500s became routine.",
    tag: "integrations",
  },
  {
    note: "Form errors silently eat leads. A small automation catching malformed submissions recovered revenue the client never knew it was losing.",
    tag: "forms",
  },
  {
    note: "Monitoring only pays off when the alert reaches a human with a runbook. Same-day resolution beats a perfect dashboard.",
    tag: "monitoring",
  },
  {
    note: "Most 'slow site' tickets are three things: huge images, render-blocking scripts, and a plugin doing what a 5-line snippet does.",
    tag: "diagnosis",
  },
  {
    note: "Lighthouse is a floor, not a ceiling. Field data tells you what real users actually hit.",
    tag: "measurement",
  },
];
