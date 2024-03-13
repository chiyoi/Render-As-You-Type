const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => ({
  ...defaultConfig,
  ...commonConfig,
  ...(phase === PHASE_DEVELOPMENT_SERVER ? developmentConfig : productionConfig),
})

/** @type {import('next').NextConfig} */
const commonConfig = {
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
