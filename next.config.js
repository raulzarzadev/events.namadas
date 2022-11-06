/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
  // put other next-pwa options here
})

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      'placeimg.com',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com'
    ]
  },
  // put other next js options here
  async redirects () {
    return [
      {
        source: '/events',
        destination: '/',
        permanent: true
      }
    ]
  }
})

module.exports = nextConfig
