/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["bcrypt"],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.thecocktaildb.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
