import chartData from "@/data/sterling-chart-data.json";

/**
 * Hand-drawn style SVG line charts of the Sterling 2025 data.
 * Two mini-charts: CWV quality % (0 to 100 scale) and conversion rate %
 * (0 to 15 scale), so both growth stories are actually visible.
 * Pure SVG, no client JS, no chart library. Static at build time.
 */

const monthPositions: { label: string; idx: number }[] = [
  { label: "Mar", idx: 0 },
  { label: "May", idx: 8 },
  { label: "Jul", idx: 16 },
  { label: "Sep", idx: 24 },
  { label: "Dec", idx: 37 },
];

function MiniChart({
  data,
  maxVal,
  yTicks,
  stroke,
  title,
  note,
  ariaLabel,
  lineLabel,
}: {
  data: number[];
  maxVal: number;
  yTicks: number[];
  stroke: string;
  title: string;
  note: string;
  ariaLabel: string;
  lineLabel: string;
}) {
  const labels = chartData.weeksLabels25 as string[];

  const W = 460;
  const H = 240;
  const PAD_L = 40;
  const PAD_R = 14;
  const PAD_T = 20;
  const PAD_B = 32;

  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const x = (i: number) => PAD_L + (i / (labels.length - 1)) * innerW;
  const y = (v: number) => PAD_T + (1 - v / maxVal) * innerH;

  const pts = data
    .map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");

  // Wobbly axis line (hand-drawn feel)
  const axisD = `M ${PAD_L} ${H - PAD_B} C ${PAD_L + innerW * 0.25} ${
    H - PAD_B - 2
  }, ${PAD_L + innerW * 0.5} ${H - PAD_B + 2}, ${
    PAD_L + innerW * 0.75
  } ${H - PAD_B - 1} S ${W - PAD_R} ${H - PAD_B + 1}, ${W - PAD_R} ${
    H - PAD_B
  }`;

  return (
    <figure className="card-paper p-4">
      <div className="flex items-baseline justify-between mb-2 gap-2">
        <figcaption className="text-[15px] font-semibold">{title}</figcaption>
        <span className="hand-note text-[18px] text-[var(--accent)] -rotate-1 whitespace-nowrap">
          {note}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={ariaLabel}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={PAD_L}
              y1={y(v)}
              x2={W - PAD_R}
              y2={y(v)}
              stroke="var(--ink)"
              strokeOpacity="0.08"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <text
              x={PAD_L - 8}
              y={y(v) + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--ink-muted)"
              fontFamily="var(--font-fraunces), serif"
            >
              {v}
            </text>
          </g>
        ))}
        <polyline
          points={pts}
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.5 4"
        />
        <path d={axisD} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        {monthPositions.map((m) => (
          <text
            key={m.label}
            x={x(m.idx)}
            y={H - PAD_B + 18}
            textAnchor="middle"
            fontSize="11"
            fill="var(--ink-muted)"
            fontFamily="var(--font-fraunces), serif"
          >
            {m.label}
          </text>
        ))}
      </svg>
      <div className="mt-2 text-[13px] text-[var(--ink-soft)]">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-4 h-[2.5px]"
            style={{ background: stroke }}
          />
          {lineLabel}
        </span>
      </div>
    </figure>
  );
}

export function SterlingChart() {
  const cwv = chartData.cwv25_weekly as number[];
  const conv = chartData.conv25_weekly as number[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MiniChart
        data={cwv}
        maxVal={100}
        yTicks={[0, 25, 50, 75, 100]}
        stroke="var(--accent)"
        title="2025: Core Web Vitals, weekly"
        note="the trend, not the noise"
        ariaLabel="Line chart showing Core Web Vitals quality rising from about 10 percent in March to 89 percent in December 2025"
        lineLabel="CWV quality % (Good)"
      />
      <MiniChart
        data={conv}
        maxVal={15}
        yTicks={[0, 5, 10, 15]}
        stroke="var(--ink)"
        title="2025: Conversion rate, weekly"
        note="the money line"
        ariaLabel="Line chart showing conversion rate rising from about 9 percent in March to about 14 percent in December 2025"
        lineLabel="Conversion rate %"
      />
    </div>
  );
}
