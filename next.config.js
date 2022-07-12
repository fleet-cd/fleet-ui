/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {nextConfig, 
  env: {
    api: "http://localhost:8080"
  }
}
