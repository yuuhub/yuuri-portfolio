import Link from "next/link";

const navItems = [
  { name: "Case studies", mobile: "Work", href: "/#case-studies" },
  { name: "Services", mobile: "Services", href: "/#services" },
  { name: "Blog", mobile: "Blog", href: "/#blog" },
  { name: "Contact", mobile: "Contact", href: "/#contact" },
];

/** Hand-drawn pen-stroke hamburger, matches the Field Notes sketch aesthetic */
function SketchHamburger() {
  return (
    <svg
      width="30"
      height="22"
      viewBox="0 0 30 22"
      fill="none"
      aria-hidden="true"
      className="-rotate-2"
    >
      <path
        d="M2 5 C 10 3.5, 19 6.5, 28 4"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2 11 C 11 12.5, 20 9.5, 28 11"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2 17 C 9 18.5, 19 15.5, 28 17"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn pen-stroke X for the close state */
function SketchClose() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4 C 9 9, 17 9, 22 22"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M4 22 C 9 17, 17 17, 22 4"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Server component: zero client JS.
 * The mobile drawer is driven by a tiny vanilla script (CSP-safe inline),
 * so the page ships no React framework chunks at all.
 */
export function Topbar() {
  return (
    <header id="site-header" className="relative z-50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="flex justify-between items-center pt-10 pb-2 ink-divider">
          <Link
            href="/"
            className="font-semibold text-[16px] md:text-[18px] tracking-wide whitespace-nowrap"
          >
            YUURI PENAS
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:block"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] ml-6 hover:underline hover:decoration-wavy hover:decoration-[var(--accent-soft)]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger (CSS toggled between the two icons) */}
          <button
            type="button"
            data-menu-toggle
            aria-label="Open menu"
            aria-expanded="false"
            className="md:hidden self-center flex justify-center items-center w-11 h-11 -mr-2 -translate-y-[2px] hover:opacity-70"
          >
            <span className="menu-icon-open flex">
              <SketchHamburger />
            </span>
            <span className="menu-icon-close hidden">
              <SketchClose />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        data-menu-overlay
        className="hidden md:hidden fixed inset-0 z-50 bg-[var(--paper)]"
      >
        <div className="ruled-paper h-full overflow-y-auto">
          <div className="max-w-[960px] mx-auto px-6">
            <div className="flex justify-between items-center pt-10 pb-2 ink-divider">
              <span className="font-semibold text-[16px] tracking-wide">
                YUURI PENAS
              </span>
              <button
                type="button"
                data-menu-close
                aria-label="Close menu"
                className="self-center flex justify-center items-center w-11 h-11 -mr-2 hover:opacity-70"
              >
                <SketchClose />
              </button>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="mt-12 flex flex-col gap-2"
            >
              {navItems.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-menu-link
                  className="group flex items-baseline gap-4 py-4 border-b border-dashed border-[var(--ink)]/40"
                >
                  <span className="hand-note text-[20px] text-[var(--accent)]">
                    0{i + 1}
                  </span>
                  <span className="text-[28px] font-semibold group-hover:text-[var(--accent)] transition-colors">
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-16 hand-note text-2xl text-[var(--accent)] -rotate-1">
              say hi
            </div>
            <a
              href="mailto:yuuriayano@gmail.com"
              className="mt-2 inline-block text-[19px] font-semibold border-b-2 border-[var(--accent)]"
            >
              yuuriayano@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Vanilla menu toggle: no React, no framework JS on the page */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var h = document.getElementById('site-header');
  if (!h) return;
  var btn = h.querySelector('[data-menu-toggle]');
  var overlay = h.querySelector('[data-menu-overlay]');
  if (!btn || !overlay) return;
  function set(open){
    h.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    overlay.classList.toggle('hidden', !open);
  }
  btn.addEventListener('click', function(){ set(!h.classList.contains('menu-open')); });
  h.querySelectorAll('[data-menu-close], [data-menu-link]').forEach(function(el){
    el.addEventListener('click', function(){ set(false); });
  });
})();`,
        }}
      />
    </header>
  );
}
