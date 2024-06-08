import express from 'express';

import { setupMiddlewares } from './middlewares';
import { setupRoutes } from './routes';
import { setupSwagger } from './swagger';

export const setupApp = async () => {
  const app = express();
  setupSwagger(app);
  setupMiddlewares(app);
  await setupRoutes(app);
  return app;
};
