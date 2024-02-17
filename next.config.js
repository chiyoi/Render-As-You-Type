const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const config = {
    ...defaultConfig,
  }
  return phase === PHASE_DEVELOPMENT_SERVER ? {
    ...config,
    rewrites: async () => [
      {
        source: '/assets/:path*',
        destination: 'http://neko03.moe/assets/:path*',
      },
    ],
  } : {
    ...config,
    output: 'export',
  }
}
