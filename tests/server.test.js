const request = require('supertest');
const { spawn } = require('child_process');

let serverProcess;

beforeAll(done => {
  serverProcess = spawn('node', ['server.js'], { stdio: 'inherit' });
  // wait briefly for server to start
  setTimeout(done, 500);
});

afterAll(() => {
  if (serverProcess) {
    serverProcess.kill();
  }
});

describe('POST /api/analyze', () => {
  it('returns status 200 and placeholder JSON', async () => {
    const res = await request('http://localhost:3000')
      .post('/api/analyze')
      .send({});
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: 'Analysis pending implementation' });
  });
});
