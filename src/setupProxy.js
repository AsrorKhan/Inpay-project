const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = app => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://192.168.163.156:8080',
            changeOrigin: true,
        })
    );
}
