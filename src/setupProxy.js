const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://campain.skcs.io',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api/v1/campaign"
      }
    })
  )
}