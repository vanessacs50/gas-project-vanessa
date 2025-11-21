// src/health.js
const packageJson = require('../package.json');

function healthHandler(req, res) {
  res.json({
    status: 'ok',
    version: packageJson.version || 'unknown',
    timestamp: new Date().toISOString()
  });
}

module.exports = healthHandler;
