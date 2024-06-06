import { NextFunction, Request, RequestHandler, Response } from 'express';
import { getMockReq, getMockRes } from 'vitest-mock-express';
import { MockProxy, mock } from 'vitest-mock-extended';

import { adaptExpressRoute } from '@/server/adapters';
import { HttpResponseHelper } from '@/shared/helpers';
import { IController } from '@/shared/protocols';

describe('ExpressRouter', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let controller: MockProxy<IController>;
  let sut: RequestHandler;

  const makeController = () => {
    req = getMockReq();
    res = getMockRes().res;
    next = getMockRes().next;
    controller = mock();
    controller.handle.mockResolvedValue({
      statusCode: 200,
      body: { data: 'any_data' },
    });
    return controller;
  };

  beforeEach(() => {
    sut = adaptExpressRoute(makeController());
  });

  it('should call handle with empty request', async () => {
    await sut(req, res, next);
    expect(controller.handle).toHaveBeenCalledWith({});
    expect(controller.handle).toHaveBeenCalledTimes(1);
  });
  it('should call handle with merge of body, params, query request', async () => {
    req = getMockReq({
      body: { body: 'body' },
      params: { params: 'params' },
      query: { query: 'query' },
    });
    await sut(req, res, next);
    expect(controller.handle).toHaveBeenCalledWith({
      body: 'body',
      params: 'params',
      query: 'query',
    });
    expect(controller.handle).toHaveBeenCalledTimes(1);
  });

  it('should respond with 200 and valid data', async () => {
    controller.handle.mockResolvedValueOnce(
      HttpResponseHelper.ok({ data: 'any_data' }),
    );
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should respond with 201 and valid data', async () => {
    controller.handle.mockResolvedValueOnce(
      HttpResponseHelper.created({ data: 'new_data' }),
    );
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ data: 'new_data' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should respond with 204 and valid data', async () => {
    controller.handle.mockResolvedValueOnce(HttpResponseHelper.noContent());
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(null);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should respond with 400 and valid data', async () => {
    controller.handle.mockResolvedValueOnce(HttpResponseHelper.badRequest());
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad Request' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should respond with 403 and valid data', async () => {
    controller.handle.mockResolvedValueOnce(HttpResponseHelper.forbidden());
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should respond with 404 and valid data', async () => {
    controller.handle.mockResolvedValueOnce(HttpResponseHelper.notFound());
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not Found' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should respond with 500 and valid error', async () => {
    controller.handle.mockResolvedValueOnce(
      HttpResponseHelper.internalServerError(),
    );
    await sut(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
