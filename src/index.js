const express = require('express');
const healthHandler = require('./health');
const { requestCounterMiddleware, metricsHandler } = require('./metrics');

const app = express();
const port = process.env.PORT || 3000;

app.use(requestCounterMiddleware);
app.get('/metrics', metricsHandler);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'GAS Project — Hello from Gas!' });
});

// Correct health route
app.get('/health', healthHandler);

app.listen(port, () => {
  console.log(`GAS Project listening on port ${port}`);
});
