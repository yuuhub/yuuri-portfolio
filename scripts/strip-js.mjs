// Post-build: strip Next.js framework JS chunks from exported HTML.
// The site has zero client components, so the async framework chunks
// (react-dom, webpack runtime, page payload) do nothing except consume
// bandwidth on slow connections. Inline scripts (menu toggle, JSON-LD)
// are preserved.
import { readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
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
