import Link from "next/link";

const navItems = [
  { name: "Case studies", href: "/#case-studies" },
  { name: "Services", href: "/#services" },
  { name: "Blog", href: "/#blog" },
  { name: "Contact", href: "/#contact" },
];

export function Topbar() {
  return (
    <header className="relative z-10">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="flex justify-between items-baseline pt-10 pb-2 ink-divider">
          <Link href="/" className="font-semibold text-[18px] tracking-wide">
            YUURI PENAS
          </Link>
          <nav aria-label="Main navigation">
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
        </div>
      </div>
    </header>
  );
}
