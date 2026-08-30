// Live Core Web Vitals badge (static export edition).
// The build bakes the real score into the HTML (scripts/psi-snapshot.mjs
// calls PSI once with the API key from env). A tiny inline vanilla script
// refreshes it client-side with the same key (referrer-locked to this
// domain, 25k req/day quota) and caches in localStorage for 24h.
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

function renderNote() {
  if (SNAPSHOT.fieldData) {
    return "Based on real user data (Chrome UX Report).";
  }
  return `Live lab score, refreshed daily${
    SNAPSHOT.date ? ` (last checked ${SNAPSHOT.date})` : ""
  }. Real user data appears once traffic builds up.`;
}

export function CwvBadge() {
  const hasScore = typeof SNAPSHOT.score === "number";
  // Key is inlined at build time (env var, never committed) and is
  // referrer-restricted to this domain on Google's side.
  const keySuffix = process.env.PSI_API_KEY
    ? `&key=${process.env.PSI_API_KEY}`
    : "";

  return (
    <div className="mt-6 flex justify-center">
      <div
        id="cwv-badge"
        className={`inline-flex flex-col items-center px-8 py-4 border-2 border-dashed rotate-0.5 bg-[var(--paper-card)] ${
          hasScore
            ? "border-[var(--green-note)]"
            : "border-[var(--ink)]/40"
        }`}
      >
        <span className="hand-note text-[20px] -rotate-1 -mt-7 mb-1 bg-[var(--paper)] px-2">
          this site, right now
        </span>

        <div className="badge-score text-[28px] font-semibold leading-none text-[var(--ink-muted)]">
          {hasScore ? `Core Web Vitals: ${SNAPSHOT.score} / 100` : "Live score: after launch"}
        </div>
        <div className="badge-note text-[13.5px] text-[var(--ink-muted)] mt-2">
          {hasScore
            ? renderNote()
            : "This badge measures this site against Google's Core Web Vitals the moment it goes live."}
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var box = document.getElementById('cwv-badge');
  if (!box) return;
  var KEY = 'cwv-score-v2';
  var BUILT = ${JSON.stringify(SNAPSHOT.score)};
  var cached = null;
  try { cached = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch(e) {}
  if (cached && Date.now() - cached.t < 86400000) { render(cached.score, cached.date); return; }
  fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent('https://www.yuuri.info') + '&strategy=mobile&category=performance' + ${JSON.stringify(keySuffix)})
    .then(function(r){ if (!r.ok) throw 0; return r.json(); })
    .then(function(d){
      var raw = d && d.lighthouseResult && d.lighthouseResult.categories && d.lighthouseResult.categories.performance && d.lighthouseResult.categories.performance.score;
      if (typeof raw !== 'number') { throw 0; }
      var score = Math.round(raw * 100);
      try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), score: score, date: new Date().toISOString().slice(0,10) })); } catch(e) {}
      render(score, new Date().toISOString().slice(0,10));
    })
    .catch(function(){ render(BUILT, ${JSON.stringify(SNAPSHOT.date)}); });
  function render(score, date){
    if (score === null || score === undefined) {
      box.querySelector('.badge-score').textContent = 'Score unavailable';
      box.querySelector('.badge-note').textContent = 'Checking again tomorrow.';
      return;
    }
    box.querySelector('.badge-score').textContent = 'Core Web Vitals: ' + score + ' / 100';
    box.querySelector('.badge-note').textContent = ${JSON.stringify("Live lab score, refreshed daily." + (SNAPSHOT.date ? "" : ""))} + (date ? ' Last checked ' + date + '.' : '');
    box.querySelector('.badge-score').classList.remove('text-[var(--ink-muted)]');
    box.classList.remove('border-[var(--ink)]/40');
    box.classList.add('border-[var(--green-note)]');
  }
})();`,
        }}
      />
    </div>
  );
}