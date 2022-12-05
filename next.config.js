/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/rooms',
        permanent: false,
      },
    ]
  },
  images: {
    domains: ['c.pxhere.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig