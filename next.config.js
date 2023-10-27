/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["img.icons8.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  headers: [
   { key: "Access-Control-Allow-Credentials", value: "true" },
   { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
    { key: "Access-Control-Allow-Origin", value: "https://robosocial.web.app" },
  ]
};

module.exports = nextConfig;
