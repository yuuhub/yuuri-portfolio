import type { NextConfig } from "next";

// Static export: pure HTML/CSS, zero framework JS.
// Security headers are applied at the Vercel edge via vercel.json.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
