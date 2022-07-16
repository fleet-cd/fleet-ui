// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  env: {
    api: 'http://localhost:8080'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
