// Live Core Web Vitals badge (static export edition).
// The build bakes the real score + metric values into the HTML
// (scripts/psi-snapshot.mjs calls PSI once with the API key from env).
// A tiny inline vanilla script refreshes it client-side with the same
// key (referrer-locked to this domain, 25k req/day quota) and caches
// in localStorage for 24h.
// Visual grammar borrowed from Google's own color coding: score circle
// green (90-100) / amber (50-89) / red (0-49); per-metric "Good" pills
// like PSI and Search Console display them.
// "Measured, not promised" applies to the badge itself too.

const SNAPSHOT = {
  score: null,
  fcp: null,
  lcp: null,
  cls: null,
  tbt: null,
  date: null,
  fieldData: false,
};

// Overwritten before every build by scripts/psi-snapshot.mjs. The seed
// (score null) is checked in so a fresh clone builds without the script.
import seed from "@/data/psi-snapshot.json";
Object.assign(SNAPSHOT, seed);

function scoreColor(score: number) {
  if (score >= 90) return { hex: "#1a8a4a", label: "good" };
  if (score >= 50) return { hex: "#c07a1e", label: "average" };
  return { hex: "#c0392b", label: "poor" };
}

export function CwvBadge() {
  const hasScore = typeof SNAPSHOT.score === "number";
  // Key is inlined at build time (env var, never committed) and is
  // referrer-restricted to this domain on Google's side.
  const keySuffix = process.env.PSI_API_KEY
    ? `&key=${process.env.PSI_API_KEY}`
    : "";
  const color = hasScore ? scoreColor(SNAPSHOT.score ?? 0) : null;

  const metrics = [
    { name: "LCP", value: SNAPSHOT.lcp },
    { name: "CLS", value: SNAPSHOT.cls },
    { name: "TBT", value: SNAPSHOT.tbt },
  ].filter((m) => Boolean(m.value));

  return (
    <div className="mt-6 flex justify-center">
      <div
        id="cwv-badge"
        className={`inline-flex flex-col items-center px-8 py-5 border-2 border-dashed rotate-0.5 bg-[var(--paper-card)] ${
          hasScore ? "border-[var(--green-note)]" : "border-[var(--ink)]/40"
        }`}
      >
        <span className="hand-note text-[20px] -rotate-1 -mt-8 mb-2 bg-[var(--paper)] px-2">
          this site, right now
        </span>

        {/* Score circle + wordmark, PSI visual grammar */}
        <div className="flex items-center gap-4">
          <div
            className="badge-circle w-[54px] h-[54px] rounded-full flex items-center justify-center shrink-0"
            style={
              color
                ? { background: color.hex }
                : { border: "2px dashed rgba(28,26,23,0.4)" }
            }
          >
            <span
              className="badge-score text-[24px] font-semibold leading-none text-[#fffdf8]"
              data-has-score={hasScore ? "1" : "0"}
            >
              {hasScore ? SNAPSHOT.score : "?"}
            </span>
          </div>
          <div className="text-left">
            <div className="text-[17px] font-semibold leading-tight">
              Core Web Vitals
            </div>
            <div className="badge-verdict text-[13px] leading-tight text-[var(--ink-soft)]">
              {hasScore ? "Passed assessment" : "pending"}
            </div>
          </div>
        </div>

        {/* Per-metric pills, PSI/Search-Console style */}
        {metrics.length > 0 && (
          <div className="badge-metrics flex flex-wrap justify-center gap-2 mt-3">
            {metrics.map((m) => (
              <span
                key={m.name}
                className="text-[12px] px-2 py-0.5 border-[1.5px] border-[var(--green-note)] text-[var(--green-note)] wobble-sm"
              >
                {m.name} {m.value} · Good
              </span>
            ))}
          </div>
        )}

        <div className="badge-note text-[12.5px] text-[var(--ink-muted)] mt-2.5 text-center max-w-[300px]">
          {hasScore
            ? `Live mobile lab score by Google PageSpeed${
                SNAPSHOT.date ? `, ${SNAPSHOT.date}` : ""
              }. Real user data appears once traffic builds.`
            : "This badge measures this site against Google's Core Web Vitals the moment it goes live."}
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var box = document.getElementById('cwv-badge');
  if (!box) return;
  var KEY = 'cwv-score-v3';
  var BUILT = ${JSON.stringify(SNAPSHOT)};
  var cached = null;
  try { cached = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch(e) {}
  if (cached && Date.now() - cached.t < 86400000 && typeof cached.score === 'number') { render(cached); return; }
  fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent('https://www.yuuri.info') + '&strategy=mobile&category=performance' + ${JSON.stringify(keySuffix)})
    .then(function(r){ if (!r.ok) throw 0; return r.json(); })
    .then(function(d){
      var lr = d && d.lighthouseResult;
      var raw = lr && lr.categories && lr.categories.performance && lr.categories.performance.score;
      if (typeof raw !== 'number') { throw 0; }
      var s = {
        score: Math.round(raw * 100),
        lcp: (lr.audits && lr.audits['largest-contentful-paint'] && lr.audits['largest-contentful-paint'].displayValue) || null,
        cls: (lr.audits && lr.audits['cumulative-layout-shift'] && lr.audits['cumulative-layout-shift'].displayValue) || null,
        tbt: (lr.audits && lr.audits['total-blocking-time'] && lr.audits['total-blocking-time'].displayValue) || null,
        fieldData: !!(d.loadingExperience && d.loadingExperience.metrics && Object.keys(d.loadingExperience.metrics).length > 0),
        date: new Date().toISOString().slice(0, 10)
      };
      try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), data: s })); } catch(e) {}
      render(s);
    })
    .catch(function(){ render(BUILT); });
  function colorFor(score){
    return score >= 90 ? '#1a8a4a' : score >= 50 ? '#c07a1e' : '#c0392b';
  }
  function metricsHtml(s){
    var pills = '';
    [['LCP', s.lcp], ['CLS', s.cls], ['TBT', s.tbt]].forEach(function(m){
      if (!m[1]) return;
      pills += '<span class="text-[12px] px-2 py-0.5 border-[1.5px] border-[var(--green-note)] text-[var(--green-note)] wobble-sm">' + m[0] + ' ' + m[1] + ' \\u00b7 Good</span>';
    });
    return pills;
  }
  function render(s){
    if (!s || typeof s.score !== 'number') {
      box.querySelector('.badge-score').textContent = '?';
      box.querySelector('.badge-verdict').textContent = 'unavailable, checking tomorrow';
      return;
    }
    var circle = box.querySelector('.badge-circle');
    circle.style.background = colorFor(s.score);
    circle.style.border = 'none';
    box.querySelector('.badge-score').textContent = String(s.score);
    box.querySelector('.badge-verdict').textContent = s.score >= 90 ? 'Passed assessment' : s.score >= 50 ? 'Needs improvement' : 'Poor';
    var mwrap = box.querySelector('.badge-metrics');
    if (mwrap) { mwrap.innerHTML = metricsHtml(s); }
    var note = box.querySelector('.badge-note');
    if (s.fieldData) {
      note.textContent = 'Based on real user data (Chrome UX Report).';
    } else {
      note.textContent = 'Live mobile lab score by Google PageSpeed' + (s.date ? ', ' + s.date : '') + '. Real user data appears once traffic builds.';
    }
  }
})();`,
        }}
      />
    </div>
  );
}