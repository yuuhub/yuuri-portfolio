import Link from "next/link";

const socials = [
  { name: "GitHub", href: "https://github.com/yuuhub" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/yuuripenas/" },
  { name: "Upwork", href: "https://www.upwork.com/freelancers/yuuripenas" },
  { name: "X", href: "https://x.com/yuuriayano" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative z-10 mt-16 pb-12">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="card-paper-strong wobble p-9 text-center">
          <div className="hand-note text-2xl">say hi</div>
          <h2 className="text-[32px] font-semibold mt-2 mb-1">
            Have a slow site? Let&apos;s talk.
          </h2>
          <p className="text-[15px] text-[var(--ink-soft)] max-w-[520px] mx-auto mt-1">
            One audit and you&apos;ll know exactly what&apos;s slowing it
            down, and what fixing it is worth. No pitch deck, just your
            PageSpeed numbers.
          </p>
          <a
            href="mailto:yuuriayano@gmail.com"
            className="text-[22px] font-semibold hover:text-[var(--accent)]"
          >
            yuuriayano@gmail.com
          </a>
          <div className="mt-5">
            <a
              href="https://calendly.com/yuuriayano/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stamp"
            >
              Book a 30-min call
            </a>
          </div>
          <div className="mt-4 text-[15px]">
            {socials.map((s, i) => (
              <span key={s.name}>
                {i > 0 && <span className="mx-2">·</span>}
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)]"
                >
                  {s.name}
                </Link>
              </span>
            ))}
          </div>
        </div>
        <p className="hand-note-green text-2xl text-center mt-12">
          Built on Next.js. This page scores what it sells.
        </p>
      </div>
    </footer>
  );
}
