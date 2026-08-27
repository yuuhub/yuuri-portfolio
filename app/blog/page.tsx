import type { Metadata } from "next";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/doodles";
import { fieldNotes } from "@/data/content";

export const metadata: Metadata = {
  title: "Field Notes: WordPress Performance Learnings",
  description:
    "Short learnings from real WordPress performance work: Core Web Vitals, page builders, caching, forms, and monitoring. One line each, no fluff.",
  alternates: {
    canonical: "https://yuuri.info/blog",
  },
};

export default function BlogIndex() {
  return (
    <main className="relative">
      <Topbar />
      <section className="relative z-10 max-w-[960px] mx-auto px-6">
        <SectionHeading title="Field notes" note="things I learned the hard way" />
        <p className="text-[17px] text-[var(--ink-soft)] max-w-[560px] mt-4">
          One-line learnings from real client work, with the receipts to back
          them up. Full posts coming later.
        </p>
        <div className="mt-8">
          {fieldNotes.map((f, i) => (
            <div
              key={i}
              className="dash-divider py-3 px-1 flex items-baseline gap-4"
            >
              <span className="hand-note text-[16px] whitespace-nowrap w-[110px] shrink-0">
                {f.tag}
              </span>
              <p className="text-[15.5px] leading-snug">{f.note}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
