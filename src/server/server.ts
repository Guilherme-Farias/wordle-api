import 'dotenv/config';

import { env } from '@/env';
import { setupApp } from '@/server/config/app';

const { PORT } = env;

(async () => {
  const app = await setupApp();
  app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
  });
})();
