// Post-build: strip Next.js framework JS chunks from exported HTML.
// The site has zero client components, so the async framework chunks
// (react-dom, webpack runtime, page payload) do nothing except consume
// bandwidth on slow connections. Inline scripts (menu toggle, JSON-LD)
// are preserved.
import { readdirSync, readFileSync, writeFileSync, rmSync, renameSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
const htmlFiles = readdirSync(outDir, { recursive: true })
  .filter((f) => typeof f === "string" && f.endsWith(".html"))
  .map((f) => join(outDir, f));

let totalRemoved = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  // Remove <script src="/_next/static/chunks/..."> tags (async framework chunks)
  let stripped = html.replace(
    /<script[^>]*src="\/_next\/static\/chunks\/[^"]*"[^>]*><\/script>\s*/g,
    ""
  );
  // Remove RSC flight payload scripts (self.__next_f.push) — dead weight
  // for a static site with no client-side navigation.
  stripped = stripped.replace(
    /<script>\(?self\.__next_f[\s\S]*?<\/script>\s*/g,
    ""
  );
  // Remove preload links pointing at stripped chunks (would 404 on fetch).
  stripped = stripped.replace(
    /<link[^>]*rel="preload"[^>]*href="\/_next\/static\/chunks\/[^"]*"[^>]*\/>\s*/g,
    ""
  );
  // Remove dead RSC payload files and unreferenced framework chunks.
  const deadFiles = [
    join(outDir, "_next", "static", "chunks"),
    ...readdirSync(outDir, { recursive: true })
      .filter(
        (f) =>
          typeof f === "string" &&
          (f.endsWith(".txt") ||
            f.endsWith("_buildManifest.js") ||
            f.endsWith("_ssgManifest.js"))
      )
      .map((f) => join(outDir, f)),
  ];
  for (const f of deadFiles) {
    try {
      rmSync(f, { recursive: true, force: true });
    } catch {}
  }
  const removed = (html.match(/<script[^>]*src="\/_next\/static\/chunks\//g) || []).length;
  const removedRsc = (html.match(/<script>\(?self\.__next_f/g) || []).length;
  if (removed > 0 || removedRsc > 0) {
    writeFileSync(file, stripped);
    totalRemoved += removed + removedRsc;
    console.log(`stripped ${removed} chunk(s) + ${removedRsc} RSC payload(s) from ${file.replace(outDir, "out")}`);
  }
}
console.log(`done: ${totalRemoved} framework script tag(s) removed across ${htmlFiles.length} HTML file(s)`);

// Normalize route files: Next static export emits flat `blog.html` but the
// `blog/` directory it also creates has no index.html, so /blog 404s.
// Convert flat files to directory form so clean URLs (/blog) work, and so
// there is exactly one URL per route (no .html duplicates — good for SEO).
let converted = 0;
for (const f of readdirSync(outDir, { recursive: false })) {
  if (typeof f !== "string" || !f.endsWith(".html")) continue;
  if (f === "index.html" || f === "404.html") continue;
  const name = f.slice(0, -5);
  mkdirSync(join(outDir, name), { recursive: true });
  renameSync(join(outDir, f), join(outDir, name, "index.html"));
  converted++;
  console.log(`converted out/${f} -> out/${name}/index.html`);
}
console.log(`route normalization: ${converted} file(s) converted`);

// Next 16 static-export quirk: robots.txt is generated to .next/server/app/
// (as a directory with .body inside) but not copied into out/. Copy missing
// generated files across.
const nextServerApp = join(process.cwd(), ".next", "server", "app");
for (const f of ["robots.txt", "sitemap.xml"]) {
  const candidates = [
    join(nextServerApp, f), // plain file
    join(nextServerApp, f + ".body"), // Next 16: directory with .body file
  ];
  let copied = false;
  for (const src of candidates) {
    try {
      const content = readFileSync(src);
      writeFileSync(join(outDir, f), content);
      console.log(`copied ${src.replace(process.cwd(), '.')} -> out/${f}`);
      copied = true;
      break;
    } catch {
      // try next candidate
    }
  }
  if (!copied) console.log(`no generated ${f} found, skipping`);
}
