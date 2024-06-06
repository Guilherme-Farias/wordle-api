// @vitest-environment prisma

import { Express } from 'express';
import request from 'supertest';

import { prisma } from '@/infra/prisma/prisma';
import { setupApp } from '@/server/config/app';
import { makeAddWordControllerRequest } from '@tests/helpers/mocks';

describe('Words routes', () => {
  let app: Express;
  const path = '/api/words';
  beforeAll(async () => {
    app = await setupApp();
  });

  beforeEach(async () => {
    await prisma.word.deleteMany();
  });

  describe('POST /words', () => {
    it('should return 201 on create word', async () => {
      const response = await request(app)
        .post(path)
        .send(makeAddWordControllerRequest())
        .expect(201);
      expect(response.body).toHaveProperty('word');
      expect(response.body.word).toHaveProperty('id');
    });

    it('should return 400 if an invalid data is provided', async () => {
      const invalidData = {};
      await request(app).post(path).send(invalidData).expect(400);
    });

    it('should return 403 if the given date already has a word', async () => {
      const httpRequest = makeAddWordControllerRequest();
      await request(app).post(path).send(httpRequest).expect(201);

      const newWordSameDate = makeAddWordControllerRequest({
        date: httpRequest.date,
      });

      await request(app).post(path).send(newWordSameDate).expect(403);
    });
  });
});
