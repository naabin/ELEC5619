/**
 * Proxy configuration
 * @param req
 * @param res
 * @param proxyOptions
 */
const preventBrowserCalls = (req, res, proxyOptions) => {
    if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
        return 'index.html';
    }
    req.headers['X-Custom-Header'] = 'yes';
}

const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:8080',
        secure: false,
        bypass: preventBrowserCalls
    },
    {
        context: ['/public'],
        target: 'http://localhost:8080',
        secure: false,
        bypass: preventBrowserCalls
    }
]
module.exports = PROXY_CONFIG;
