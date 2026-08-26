export function DoodleUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="doodle-underline">
      {children}
      <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M2 9 C 60 3, 120 11, 180 6 S 270 8, 298 4"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function StarDoodle({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M13 1 L16 9 L24 9 L18 14 L20 23 L13 18 L6 23 L8 14 L2 9 L10 9 Z"
        fill="var(--accent)"
        opacity="0.85"
      />
    </svg>
  );
}

export function SectionHeading({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="mt-16 relative z-10">
      <h2 className="text-[34px] font-semibold leading-tight">{title}</h2>
      {note && (
        <span className="hand-note text-[22px] inline-block -rotate-1.5 ml-3">
          {note}
        </span>
      )}
    </div>
  );
}
