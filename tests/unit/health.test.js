const request = require('supertest');
const express = require('express');
const healthHandler = require('../../src/health');

const app = express();
app.get('/health', healthHandler);

describe('GET /health', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
