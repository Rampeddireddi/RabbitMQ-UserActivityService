const request = require('supertest');
const app = require('../src/server');

test('should reject invalid payload', async () => {
  const res = await request(app)
    .post('/api/v1/activities')
    .send({});
  expect(res.statusCode).toBe(400);
});
