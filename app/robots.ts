import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/icon.svg"],
    },
    sitemap: "https://yuuri.info/sitemap.xml",
    host: "https://yuuri.info",
  };
}
