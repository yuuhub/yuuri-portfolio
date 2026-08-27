// Live Core Web Vitals badge (static export edition).
// Renders an honest placeholder stamp; a tiny inline vanilla script
// (no React, no framework JS) fetches the PageSpeed Insights score
// keyless from the browser and caches it in localStorage for 24h.
// "Measured, not promised" applies to the badge itself too.

export function CwvBadge() {
  return (
    <div className="mt-6 flex justify-center">
      <div
        id="cwv-badge"
        className="inline-flex flex-col items-center px-8 py-4 border-2 border-dashed border-[var(--ink)]/40 rotate-0.5 bg-[var(--paper-card)]"
      >
        <span className="hand-note text-[20px] -rotate-1 -mt-7 mb-1 bg-[var(--paper)] px-2">
          this site, right now
        </span>

        <div className="badge-score text-[28px] font-semibold leading-none text-[var(--ink-muted)]">
          Live score: after launch
        </div>
        <div className="badge-note text-[13.5px] text-[var(--ink-muted)] mt-2">
          This badge measures this site against Google&apos;s Core Web Vitals the moment it goes live.
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  var box = document.getElementById('cwv-badge');
  if (!box) return;
  var KEY = 'cwv-score-v1';
  var cached = null;
  try { cached = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch(e) {}
  if (cached && Date.now() - cached.t < 86400000) { render(cached.score); return; }
  fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent('https://yuuri.info') + '&strategy=mobile&category=performance')
    .then(function(r){ return r.json(); })
    .then(function(d){
      var raw = d && d.lighthouseResult && d.lighthouseResult.categories && d.lighthouseResult.categories.performance && d.lighthouseResult.categories.performance.score;
      if (typeof raw !== 'number') { render(null); return; }
      var score = Math.round(raw * 100);
      try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), score: score })); } catch(e) {}
      render(score);
    })
    .catch(function(){ render(null); });
  function render(score){
    if (score === null || score === undefined) {
      box.querySelector('.badge-score').textContent = 'Score unavailable';
      box.querySelector('.badge-note').textContent = 'Checking again tomorrow.';
      return;
    }
    box.querySelector('.badge-score').textContent = 'Core Web Vitals: ' + score + ' / 100';
    box.querySelector('.badge-note').textContent = 'Live lab score, refreshed daily. Real user field data appears once traffic builds up.';
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
