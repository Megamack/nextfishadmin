import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    // Include `turbo` so next-intl adds aliases here instead of the
    // newer `turbopack` key, which isn't recognized in our Next.js version.
    turbo: {},
  },
};

export default createNextIntlPlugin()(nextConfig);
