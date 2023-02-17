/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.thecocktaildb.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
