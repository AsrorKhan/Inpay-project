const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = app => {
    app.use(
        ['/auth', '/api', '/services' ],
        createProxyMiddleware({
            target: process.env["REACT_APP_DEV_MODE_URL"],
            changeOrigin: true,
        })
    );
}
