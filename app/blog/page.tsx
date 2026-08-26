import type { Metadata } from "next";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/doodles";
import { blogPosts } from "@/data/content";

export const metadata: Metadata = {
  title: "Field Notes: WordPress Performance Blog",
  description:
    "Field notes on WordPress performance, Core Web Vitals, and conversion optimization. Real numbers from real client work.",
};

export default function BlogIndex() {
  return (
    <main className="relative">
      <Topbar />
      <section className="relative z-10 max-w-[960px] mx-auto px-6">
        <SectionHeading title="Field notes" note="the blog" />
        <p className="text-[17px] text-[var(--ink-soft)] max-w-[560px] mt-4">
          War stories with numbers: WordPress performance, Core Web Vitals, and
          conversion work, written the way it actually happened.
        </p>
        <div className="mt-8">
          {blogPosts.map((p) => (
            <article key={p.slug} className="dash-divider py-5 px-1">
              <div className="flex justify-between items-baseline">
                <a
                  href={`/blog/${p.slug}`}
                  className="text-[19px] font-semibold hover:text-[var(--accent)]"
                >
                  {p.title}
                </a>
                <span className="hand-note text-[18px] text-[var(--ink-muted)] whitespace-nowrap ml-4">
                  {p.date}
                </span>
              </div>
              <p className="text-[15px] text-[var(--ink-soft)] mt-1.5 max-w-[640px]">
                {p.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
