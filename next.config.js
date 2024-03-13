const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => ({
  ...defaultConfig,
  ...commonConfig,
  ...(phase === PHASE_DEVELOPMENT_SERVER ? developmentConfig : productionConfig),
})

/** @type {import('next').NextConfig} */
const commonConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
        pathname: '/5646866ce296c2c5516afb70c27af222ca848b52e20b39d0f652a107c9556dd6/**',
      },
    ],
  },
}

/** @type {import('next').NextConfig} */
const productionConfig = {
  output: 'export',
}

/** @type {import('next').NextConfig} */
const developmentConfig = {
  rewrites: async () => {
    return [
      {
        source: '/favicon.ico',
        destination: 'http://localhost:8788/favicon.ico',
      },
    ]
  }
}
