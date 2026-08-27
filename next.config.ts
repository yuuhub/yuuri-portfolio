import type { NextConfig } from "next";

const securityHeaders = [
  // Content Security Policy: self-only for everything.
  // - script-src 'unsafe-inline' required by Next.js App Router bootstrap (no third-party scripts on the site).
  // - connect-src includes Google APIs pre-authorized for the future live CWV badge.
  // - upgrade-insecure-requests forces HTTPS on any subresource.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self' https://www.googleapis.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  // Legacy equivalent of frame-ancestors 'none' (clickjacking defense).
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send origin on cross-origin navigations, full URL same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable camera/mic/geolocation + FLoC/Topics tracking.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Force HTTPS in browsers (Vercel also enforces it at the edge).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
