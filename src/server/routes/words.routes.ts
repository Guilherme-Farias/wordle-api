import { Router } from 'express';

import { adaptExpressRoute } from '@/server/adapters';
import { makeAddWordController } from '@/modules/word/factories/controllers';

export default (router: Router): void => {
  router.post('/words', adaptExpressRoute(makeAddWordController()));
};
