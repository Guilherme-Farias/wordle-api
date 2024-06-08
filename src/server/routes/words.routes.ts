import { Router } from 'express';

import {
  makeAddWordController,
  makeGetWordController,
} from '@/modules/word/factories/controllers';
import { adaptExpressRoute } from '@/server/adapters';

export default (router: Router): void => {
  router.get('/words/:date', adaptExpressRoute(makeGetWordController()));
  router.post('/words', adaptExpressRoute(makeAddWordController()));
};
