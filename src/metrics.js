const client = require('prom-client');

// Enable the collection of default metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Create a custom counter metric for HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests made to the server',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware to count incoming requests
function requestCounterMiddleware(req, res, next) {
  res.on('finish', () => {
    httpRequestCounter.labels({
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status_code: res.statusCode
    }).inc();
  });

  next();
}

// Expose metrics handler for /metrics route
async function metricsHandler(req, res) {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
}

module.exports = {
  requestCounterMiddleware,
  metricsHandler
};
