import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { DoodleUnderline, StarDoodle, SectionHeading, TapeDoodle, TimelineDoodle, GalleryPolaroid } from "@/components/doodles";
import { services } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { testimonials, fieldNotes } from "@/data/content";
import { SterlingChart } from "@/components/sterling-chart";
import { CwvBadge } from "@/components/cwv-badge";

export default function Home() {
  const featured = caseStudies.find((c) => c.featured) ?? caseStudies[0];
  const moreWork = caseStudies.filter((c) => !c.featured);

  return (
    <main className="relative">
      <Topbar />

      {/* ============ HERO ============ */}
      <section className="relative z-10 max-w-[960px] mx-auto px-6 pt-[72px] pb-10">
        <span className="hand-note text-[26px] inline-block -rotate-1.2">
          performance, annotated
        </span>
        <h1 className="text-[clamp(24px,7.5vw,56px)] leading-[1.08] font-semibold max-w-[760px] mt-4 mb-5 tracking-tight">
          WordPress, made fast.{" "}
          <span className="block w-fit">
            <DoodleUnderline>Measured, not promised.</DoodleUnderline>
          </span>
        </h1>
        <p className="text-[19px] max-w-[560px] text-[var(--ink-soft)]">
          I'm a <strong className="font-semibold text-[var(--ink)]">Lead WordPress Developer</strong>. I
          make WordPress sites fast and fix what stops visitors from becoming
          leads. Based in Manila (UTC+8), remote for US and UK teams. Open to
          full-time roles.
        </p>
        <div className="mt-8 flex gap-4 items-center relative flex-wrap">
          <a href="#case-studies" className="btn-stamp primary">
            See the work
          </a>
          <a
            href="https://calendly.com/yuuriayano/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-stamp"
          >
            Book a call
          </a>
          <span className="hand-note text-[21px] -rotate-3 ml-2 -translate-y-1 hidden sm:inline-block">
            2 min, zero pressure
          </span>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative z-10 max-w-[960px] mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <div className="card-paper wobble p-5 relative">
            <span className="absolute -top-[18px] -left-1.5">
              <StarDoodle />
            </span>
            <span className="hand-note text-[20px] absolute -top-[26px] right-2 -rotate-[30deg]">
              the whole point
            </span>
            <div className="text-[44px] font-semibold leading-none">
              90%++<small className="text-[20px] font-normal"> Good</small>
            </div>
            <div className="text-[14.5px] text-[var(--ink-muted)] mt-2">
              of Core Web Vitals passed on a 4,000+ page site that was failing
              before. 10% to 90%++ in 9 months.
            </div>
          </div>
          <div className="card-paper wobble p-5 relative">
            <span className="hand-note text-[20px] absolute -top-[26px] right-2 -rotate-[30deg]">
              business result
            </span>
            <div className="text-[44px] font-semibold leading-none">+46%</div>
            <div className="text-[14.5px] text-[var(--ink-muted)] mt-2">
              more form fills from the same traffic. Conversion rate, 9.4% to
              13.7%.
            </div>
          </div>
          <div className="card-paper wobble p-5 relative">
            <span className="hand-note text-[20px] absolute -top-[26px] right-2 -rotate-[30deg]">
              reliability
            </span>
            <div className="text-[44px] font-semibold leading-none">22</div>
            <div className="text-[14.5px] text-[var(--ink-muted)] mt-2">
              critical incidents, all resolved same day. Monitored 24/7.
            </div>
          </div>
        </div>
        <CwvBadge />
      </section>

      {/* ============ FLAGSHIP CASE STUDY ============ */}
      <section
        id="case-studies"
        className="relative z-10 max-w-[960px] mx-auto px-6 mt-14 scroll-mt-8"
      >
        <div className="card-paper-strong wobble p-6 md:p-8 relative">
          <div className="flex items-baseline justify-between gap-3">
            <div className="hand-note text-[22px]">Case study 01</div>
            <span className="hand-note text-xl md:text-2xl rotate-2 whitespace-nowrap">
              flagship case study
            </span>
          </div>
          <h2 className="text-[24px] md:text-[30px] font-semibold mt-3 mb-3 max-w-[640px] leading-tight">
            {featured.title}
          </h2>
          <p className="max-w-[620px] text-[15.5px] md:text-[16.5px] text-[var(--green-note)]">
            {featured.summary}
          </p>
          <div className="mt-5 text-[15px] md:text-[18px] font-semibold">
            <div className="flex flex-col gap-1.5 md:hidden">
              {featured.metrics?.map((m) => (
                <div
                  key={m.label}
                  className="flex justify-between items-baseline gap-3"
                >
                  <span>{m.label}</span>
                  <span className="text-[var(--accent)] whitespace-nowrap text-right">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="hidden md:flex md:flex-wrap md:gap-x-2 md:gap-y-1">
              {featured.metrics?.map((m, i) => (
                <span key={m.label} className="whitespace-nowrap">
                  {i > 0 && <span className="mx-1.5">·</span>}
                  {m.label}{" "}
                  <span className="text-[var(--accent)]">{m.value}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <SterlingChart />
          </div>
          <div className="mt-6 text-[13.5px] md:text-[14px] text-[var(--ink-muted)]">
            Stack: {featured.stack}
          </div>
        </div>
      </section>

      {/* ============ MORE WORK ============ */}
      <section className="relative z-10 max-w-[960px] mx-auto px-6">
        <SectionHeading title="More work" note="a few pages I built" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
          {moreWork.map((c) => (
            <div key={c.slug} className="card-paper wobble p-5">
              <h3 className="text-[18px] font-semibold">{c.title}</h3>
              <div className="hand-note text-[18px] text-[var(--accent)] mt-1">
                {c.stack}
              </div>
              <p className="text-[14.5px] text-[var(--ink-soft)] mt-2">
                {c.summary}
              </p>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[14.5px] font-semibold border-b-2 border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Visit site →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section
        id="services"
        className="relative z-10 max-w-[960px] mx-auto px-6 scroll-mt-8"
      >
        <SectionHeading title="What I do" note="three ways to work together" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
          {services.map((s) => (
            <div key={s.slug} className="card-paper wobble p-6 flex flex-col">
              <h3 className="text-[20px] font-semibold">{s.name}</h3>
              <div className="hand-note text-2xl text-[var(--accent)] mt-1">
                {s.price}
                {s.priceNote && (
                  <span className="block md:inline text-[16px] text-[var(--ink-muted)]">
                    {" "}
                    {s.priceNote}
                  </span>
                )}
              </div>
              <p className="text-[14.5px] text-[var(--ink-soft)] mt-2">
                {s.description}
              </p>
              <ul className="mt-3 space-y-1.5">
                {s.includes.map((item) => (
                  <li
                    key={item}
                    className="text-[14px] text-[var(--ink-soft)] pl-6 relative"
                  >
                    <span className="absolute left-0 text-[var(--accent)] font-semibold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={s.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-4 text-[15px] font-semibold border-b-2 border-[var(--accent)] self-center hover:text-[var(--accent)]"
              >
                {s.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section
        id="about"
        className="relative z-10 max-w-[960px] mx-auto px-6 scroll-mt-8"
      >
        <SectionHeading title="About me" note="the person behind the pages" />
        <div className="card-paper-strong wobble p-6 md:p-8 mt-7">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 md:gap-10">
            {/* Story */}
            <div>
              <p className="text-[15.5px] md:text-[16.5px] text-[var(--ink-soft)] leading-relaxed">
                I started in UX design in 2015, drawing interfaces before I
                ever built one. Freelancing on Upwork came next, then a
                design-and-customers hybrid role at Talkpush, a recruiting
                platform. In 2022 I crossed to the other side of the screen
                for good and became a WordPress developer. I joined Sterling
                Lawyers, a law firm, and got promoted to lead WordPress at
                Rocket Clicks, their marketing agency for law firms, where
                sites live and die by search rankings.
              </p>
              <p className="text-[15.5px] md:text-[16.5px] text-[var(--ink-soft)] leading-relaxed mt-4">
                My favorite part is the strategy: architecting the solution
                before touching the keyboard. The design background helps
                here, so nothing gets lost between the mockup and the live
                site. And because the pages I make are measured on real
                users, &ldquo;looks good&rdquo; isn&apos;t done until Core
                Web Vitals agrees.
              </p>
              <p className="text-[15.5px] md:text-[16.5px] text-[var(--ink-soft)] leading-relaxed mt-4">
                Off the clock: chasing strength numbers at the gym, slowly
                (slowly) learning Spanish, working through a manga pile, and
                getting lost in Guild Wars 2. I&apos;m also getting into
                photography with a Fuji X-T30 III, which mostly means my cat
                Maddie has a very patient personal photographer.
              </p>
              <div className="mt-6 flex gap-5">
                <div className="shrink-0 w-[18px] flex justify-center">
                  <TimelineDoodle />
                </div>
                <ol className="space-y-3 text-[15px]">
                  <li className="flex items-baseline gap-3">
                    <span className="hand-note text-[19px] whitespace-nowrap">2015</span>
                    <span className="text-[var(--ink-soft)]">UX design, Ateneo de Naga</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="hand-note text-[19px] whitespace-nowrap">2015-17</span>
                    <span className="text-[var(--ink-soft)]">Freelance UX and design, Upwork</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="hand-note text-[19px] whitespace-nowrap">2017-19</span>
                    <span className="text-[var(--ink-soft)]">
                      Talkpush, design + customer-facing work on a recruiting platform
                    </span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="hand-note text-[19px] whitespace-nowrap">2022</span>
                    <span className="text-[var(--ink-soft)]">Full-time WordPress development</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="hand-note text-[19px] whitespace-nowrap">now</span>
                    <span className="text-[var(--ink-soft)]">
                      Joined Sterling Lawyers, promoted to Lead WordPress Developer at Rocket Clicks
                    </span>
                  </li>
                </ol>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["PageSpeed Insights", "Lighthouse", "Cloudflare", "WP Rocket", "GA4", "GTM"].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="text-[12.5px] border-[1.5px] border-[var(--ink)] px-2.5 py-0.5 bg-[var(--paper)] wobble-sm"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
              <span className="hand-note text-[20px] inline-block mt-5 rotate-1">
                the pivots were scary but worth it
              </span>
            </div>

            {/* Polaroid gallery */}
            <div className="flex flex-wrap gap-5 justify-center md:justify-start content-start">
              <GalleryPolaroid
                src="/me.png"
                caption="that's me"
                rotate="rotate-2"
              />
              <GalleryPolaroid
                src="/polaroid-maddie.svg"
                caption="Maddie, the supervisor"
                rotate="-rotate-2"
              />
              <GalleryPolaroid
                src="/polaroid-camera.svg"
                caption="learning the Fuji"
                rotate="rotate-1"
              />
              <GalleryPolaroid
                src="/polaroid-gym.svg"
                caption="chasing PRs"
                rotate="-rotate-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative z-10 max-w-[960px] mx-auto px-6">
        <SectionHeading title="Kind words" note="from people I worked with" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
          {testimonials.map((t) => (
            <div key={t.name} className="card-paper-strong wobble p-6">
              <p className="text-[14.5px] md:text-[15.5px] italic text-[var(--green-note)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 text-[14px] font-semibold">
                {t.name}
                <span className="block font-normal text-[13px] text-[var(--ink-muted)]">
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FIELD NOTES ============ */}
      <section
        id="blog"
        className="relative z-10 max-w-[960px] mx-auto px-6 scroll-mt-8"
      >
        <SectionHeading title="Field notes" note="things I learned the hard way" />
        <div className="mt-7">
          {fieldNotes.map((f, i) => (
            <div key={i} className="dash-divider py-3 px-1 flex items-baseline gap-4">
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
