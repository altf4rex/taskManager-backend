import request from 'supertest';
import app from '../../src/app';

describe('API Endpoints', () => {
  it('should return 401 for unauthorized access to /api/v1/tasks', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.status).toBe(401);
  });

  
});