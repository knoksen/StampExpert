const request = require('supertest');
const { spawn } = require('child_process');

let serverProcess;

beforeAll(done => {
  serverProcess = spawn('node', ['server.js'], { stdio: 'inherit' });
  setTimeout(done, 500);
});

afterAll(() => {
  if (serverProcess) {
    serverProcess.kill();
  }
});

describe('GET /', () => {
  it('responds with status 200', async () => {
    const res = await request('http://localhost:3000').get('/');
    expect(res.status).toBe(200);
  });
});

describe('GET /health', () => {
  it('responds with health check data', async () => {
    const res = await request('http://localhost:3000').get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: 'healthy',
      timestamp: expect.any(String),
      uptime: expect.any(Number)
    });
  });
});
