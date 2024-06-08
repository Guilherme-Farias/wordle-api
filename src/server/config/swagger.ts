import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';

import swaggerConfig from '@/server/docs';

import { noCache } from '../middlewares';

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig));
};
