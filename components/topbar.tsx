"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Case studies", mobile: "Work", href: "/#case-studies" },
  { name: "Services", mobile: "Services", href: "/#services" },
  { name: "Blog", mobile: "Blog", href: "/#blog" },
  { name: "Contact", mobile: "Contact", href: "/#contact" },
];

export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="flex justify-between items-baseline pt-10 pb-2 ink-divider">
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

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center items-center gap-[6px] w-11 h-11 -mr-2 hover:opacity-70"
          >
            <span
              className={`block w-7 h-[3px] bg-[var(--ink)] transition-transform duration-200 ${
                open ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-7 h-[3px] bg-[var(--ink)] transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-7 h-[3px] bg-[var(--ink)] transition-transform duration-200 ${
                open ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-[var(--paper)]">
          <div className="ruled-paper h-full overflow-y-auto">
            <div className="max-w-[960px] mx-auto px-6">
              <div className="flex justify-between items-baseline pt-10 pb-2 ink-divider">
                <span className="font-semibold text-[16px] tracking-wide">
                  YUURI PENAS
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex flex-col justify-center items-center gap-[6px] w-11 h-11 -mr-2 hover:opacity-70"
                >
                  <span className="block w-7 h-[3px] bg-[var(--ink)] translate-y-[9px] rotate-45" />
                  <span className="block w-7 h-[3px] bg-[var(--ink)] opacity-0" />
                  <span className="block w-7 h-[3px] bg-[var(--ink)] -translate-y-[9px] -rotate-45" />
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
                    onClick={() => setOpen(false)}
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
      )}
    </header>
  );
}
