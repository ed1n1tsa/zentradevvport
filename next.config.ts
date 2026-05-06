import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;
const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] =
  supabaseHost
    ? [
        {
          protocol: "https",
          hostname: supabaseHost,
          pathname: "/storage/v1/object/public/**",
        },
      ]
    : [];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns,
  },
};

export default withNextIntl(nextConfig);
