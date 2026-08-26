import chartData from "@/data/sterling-chart-data.json";

/**
 * Hand-drawn style SVG line chart of the Sterling 2025 data.
 * Renders CWV quality % and conversion rate % as wobbly pen lines
 * with a hand-drawn axis and annotation.
 * Pure SVG, no client JS, no chart library. Static at build time.
 */
export function SterlingChart() {
  const labels = chartData.weeksLabels25 as string[];
  const cwv = chartData.cwv25_weekly as number[];
  const conv = chartData.conv25_weekly as number[];

  const W = 720;
  const H = 260;
  const PAD_L = 46;
  const PAD_R = 16;
  const PAD_T = 24;
  const PAD_B = 34;

  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const maxVal = 100;
  const minVal = 0;

  const x = (i: number) => PAD_L + (i / (labels.length - 1)) * innerW;
  const y = (v: number) => PAD_T + (1 - (v - minVal) / (maxVal - minVal)) * innerH;

  // Build polyline points
  const cwvPts = cwv.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const convPts = conv.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  // Wobbly axis line (hand-drawn feel)
  const axisD = `M ${PAD_L} ${H - PAD_B} C ${PAD_L + innerW * 0.25} ${H - PAD_B - 2}, ${PAD_L + innerW * 0.5} ${H - PAD_B + 2}, ${PAD_L + innerW * 0.75} ${H - PAD_B - 1} S ${W - PAD_R} ${H - PAD_B + 1}, ${W - PAD_R} ${H - PAD_B}`;

  // Grid lines (faint)
  const gridLines = [0, 25, 50, 75, 100].map((v) => {
    const gy = y(v);
    return (
      <line
        key={v}
        x1={PAD_L}
        y1={gy}
        x2={W - PAD_R}
        y2={gy}
        stroke="var(--ink)"
        strokeOpacity="0.08"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
    );
  });

  const yTicks = [0, 25, 50, 75, 100].map((v) => (
    <text
      key={v}
      x={PAD_L - 8}
      y={y(v) + 4}
      textAnchor="end"
      fontSize="11"
      fill="var(--ink-muted)"
      fontFamily="var(--font-fraunces), serif"
    >
      {v}
    </text>
  ));

  // Month markers on x axis (Mar to Dec)
  const monthPositions: { label: string; idx: number }[] = [
    { label: "Mar", idx: 0 },
    { label: "May", idx: 8 },
    { label: "Jul", idx: 16 },
    { label: "Sep", idx: 24 },
    { label: "Dec", idx: 37 },
  ];

  return (
    <figure className="w-full">
      <div className="card-paper p-4">
        <div className="flex items-baseline justify-between mb-2">
          <figcaption className="text-[15px] font-semibold">
            2025: CWV quality and conversion, weekly
          </figcaption>
          <span className="hand-note text-[18px] text-[var(--accent)] -rotate-1">
            the trend, not the noise
          </span>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label="Line chart showing Core Web Vitals quality rising from about 10 percent in March to 89 percent in December 2025, and conversion rate rising from 9.4 percent to 13.7 percent"
        >
          {gridLines}
          {yTicks}
          {/* CWV line (accent) */}
          <polyline
            points={cwvPts}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.5 4"
          />
          {/* Conversion line (ink) */}
          <polyline
            points={convPts}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.5 4"
          />
          {/* Axis */}
          <path d={axisD} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          {/* Month labels */}
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
        <div className="flex gap-5 mt-2 text-[13px] text-[var(--ink-soft)]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-[2.5px] bg-[var(--accent)]" />
            CWV quality % (Good)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-[2.5px] bg-[var(--ink)]" />
            Conversion rate %
          </span>
        </div>
      </div>
    </figure>
  );
}
