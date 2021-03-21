const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://localhost:5000'
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: target,
            changeOrigin: true,
        })
    );
};
