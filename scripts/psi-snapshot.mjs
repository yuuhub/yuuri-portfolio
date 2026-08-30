// Build-time PSI snapshot: fetches the performance score once during `build`
// and writes a JSON stub the badge reads. If it fails (offline, quota), the
// stub falls back to null and the client-side fetch takes over.
// The key comes from env (Vercel project env var PSI_API_KEY). Server-side
// requests must send the Referer the key is locked to.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const KEY = process.env.PSI_API_KEY || "";
const URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" +
  encodeURIComponent("https://www.yuuri.info") + "&strategy=mobile&category=performance" +
  (KEY ? "&key=" + KEY : "");

let out = { score: null, fcp: null, lcp: null, cls: null, tbt: null, date: null, fieldData: false };

try {
  const res = await fetch(URL, {
    headers: KEY ? { Referer: "https://www.yuuri.info/" } : {},
    signal: AbortSignal.timeout(120000),
  });
  if (res.ok) {
    const d = await res.json();
    const lr = d.lighthouseResult || {};
    const cat = lr.categories?.performance?.score;
    const aud = lr.audits || {};
    if (typeof cat === "number") {
      out = {
        score: Math.round(cat * 100),
        fcp: aud["first-contentful-paint"]?.displayValue || null,
        lcp: aud["largest-contentful-paint"]?.displayValue || null,
        cls: aud["cumulative-layout-shift"]?.displayValue || null,
        tbt: aud["total-blocking-time"]?.displayValue || null,
        date: new Date().toISOString().slice(0, 10),
        fieldData: !!(d.loadingExperience && d.loadingExperience.metrics && Object.keys(d.loadingExperience.metrics).length > 0),
      };
    }
  } else {
    console.log(`psi-snapshot: HTTP ${res.status}, badge will use client fetch`);
  }
} catch (e) {
  console.log("psi-snapshot: fetch failed (" + (e && e.message ? e.message : e) + "), badge will use client fetch");
}

mkdirSync(join(process.cwd(), "data"), { recursive: true });
writeFileSync(join(process.cwd(), "data", "psi-snapshot.json"), JSON.stringify(out, null, 2));
console.log(`psi-snapshot: score=${out.score} lcp=${out.lcp} fieldData=${out.fieldData}`);