import { readdirSync } from 'fs';
import { join } from 'path';

import { Express, Router } from 'express';

export const setupRoutes = async (app: Express): Promise<void> => {
  const router = Router();
  const routePromises = readdirSync(join(__dirname, '../routes'))
    .filter((file) => !file.endsWith('.map'))
    .map(async (file) => {
      (await import(`../routes/${file}`)).default(router);
    });
  await Promise.all(routePromises);
  app.use('/api', router);
};
