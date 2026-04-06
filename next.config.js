/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      // Default live tab: full viewer + chat (same as /live/2) while URL stays /live
      { source: '/live', destination: '/live/2' },
    ]
  },
}

module.exports = nextConfig; 