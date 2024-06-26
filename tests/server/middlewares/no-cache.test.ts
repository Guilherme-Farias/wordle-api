import { Express } from 'express';
import request from 'supertest';

import { setupApp } from '@/server/config/app';
import { noCache } from '@/server/middlewares';

describe('NoCache Middleware', () => {
  let app: Express;
  beforeAll(async () => {
    app = await setupApp();
  });
  test('Should disable cache', async () => {
    app.get('/test_no_cache', noCache, (_, res) => {
      res.send();
    });
    await request(app)
      .get('/test_no_cache')
      .expect(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate',
      )
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('Surrogate-Control', 'no-store');
  });
});
