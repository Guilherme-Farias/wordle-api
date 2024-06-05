import { RequestHandler } from 'express';

import { IController } from '@/shared/protocols';

type Adapter = (controller: IController) => RequestHandler;

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const request = { ...req.body, ...req.params };
  const { statusCode, body } = await controller.handle(request);
  res.status(statusCode).json(body);
};
