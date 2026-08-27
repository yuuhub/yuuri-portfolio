import Link from "next/link";

const navItems = [
  { name: "Case studies", mobile: "Work", href: "/#case-studies" },
  { name: "Services", mobile: "Services", href: "/#services" },
  { name: "Blog", mobile: "Blog", href: "/#blog" },
  { name: "Contact", mobile: "Contact", href: "/#contact" },
];

export function Topbar() {
  return (
    <header className="relative z-10">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="flex justify-between items-baseline pt-10 pb-2 ink-divider">
          <Link
            href="/"
            className="font-semibold text-[16px] md:text-[18px] tracking-wide whitespace-nowrap"
          >
            YUURI PENAS
          </Link>
          <nav aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13.5px] md:text-[15px] ml-3 md:ml-6 hover:underline hover:decoration-wavy hover:decoration-[var(--accent-soft)]"
              >
                <span className="md:hidden">{item.mobile}</span>
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
