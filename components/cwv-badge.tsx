// Live Core Web Vitals badge.
// - With PSI_API_KEY set: fetches PageSpeed Insights once per day (ISR revalidate),
//   shows the real lab score for this site.
// - Without a key (pre-deploy): renders an honest placeholder stamp.
// - If the API call fails or field data is missing, labels itself accordingly.
// "Measured, not promised" applies to the badge itself too.

type PsiResponse = {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number };
    };
  };
  loadingExperience?: {
    metrics?: Record<string, unknown>;
    overall_category?: string;
  };
  error?: { message?: string };
};

async function getLiveScore(): Promise<{
  score: number | null;
  fieldData: boolean;
  error: string | null;
}> {
  const key = process.env.PSI_API_KEY || process.env.NEXT_PUBLIC_PSI_API_KEY;
  if (!key) {
    return { score: null, fieldData: false, error: "no-key" };
  }

  try {
    const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      "https://yuuri.info"
    )}&strategy=mobile&category=performance&key=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // one call per day
    });
    if (!res.ok) {
      return { score: null, fieldData: false, error: `http-${res.status}` };
    }
    const data = (await res.json()) as PsiResponse;
    if (data.error) {
      return { score: null, fieldData: false, error: data.error.message || "api-error" };
    }
    const raw = data.lighthouseResult?.categories?.performance?.score;
    const score = typeof raw === "number" ? Math.round(raw * 100) : null;
    const fieldData = Boolean(
      data.loadingExperience?.metrics && Object.keys(data.loadingExperience.metrics).length > 0
    );
    return { score, fieldData, error: null };
  } catch {
    return { score: null, fieldData: false, error: "network-error" };
  }
}

export async function CwvBadge() {
  const { score, fieldData, error } = await getLiveScore();

  const showPlaceholder = score === null;

  return (
    <div className="mt-6 flex justify-center">
      <div
        className={`inline-flex flex-col items-center px-8 py-4 border-2 border-dashed ${
          showPlaceholder ? "border-[var(--ink)]/40" : "border-[var(--green-note)]"
        } rotate-0.5 bg-[var(--paper-card)]`}
      >
        <span className="hand-note text-[20px] -rotate-1 -mt-7 mb-1 bg-[var(--paper)] px-2">
          this site, right now
        </span>

        {showPlaceholder ? (
          <>
            <div className="text-[28px] font-semibold leading-none text-[var(--ink-muted)]">
              Live score: after launch
            </div>
            <div className="text-[13.5px] text-[var(--ink-muted)] mt-2">
              {error === "no-key"
                ? "This badge measures this site against Google's Core Web Vitals the moment it goes live."
                : "Score unavailable right now, checking again tomorrow."}
            </div>
          </>
        ) : (
          <>
            <div className="text-[28px] font-semibold leading-none">
              Core Web Vitals: {score} / 100
            </div>
            <div className="text-[13.5px] text-[var(--ink-muted)] mt-2">
              {fieldData
                ? "Live lab score, refreshed daily. Real user data is still accumulating."
                : "Live lab score, refreshed daily. Real user field data appears once traffic builds up."}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
