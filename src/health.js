const fs = require('fs');
const path = require('path');

function getVersion() {
  try {
    const pkg = require('../package.json');
    return pkg.version || 'unknown';
  } catch (err) {
    return 'unknown';
  }
}


function healthHandler(req, res) {
  res.json({
    status: 'ok',
    version: getVersion(),
    timestamp: new Date().toISOString()
  });
}

module.exports = healthHandler;
