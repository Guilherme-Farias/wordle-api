// @vitest-environment prisma

import { faker } from '@faker-js/faker';
import { Express } from 'express';
import request from 'supertest';

import { prisma } from '@/infra/db';
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

  describe('GET /words/:date', () => {
    it('should return 200 on create word', async () => {
      const postResponse = await request(app)
        .post(path)
        .send(makeAddWordControllerRequest())
        .expect(201);
      const getResponse = await request(app)
        .get(`${path}/${postResponse.body.word.date}`)
        .expect(200);

      expect(getResponse.body).toEqual(postResponse.body.word);
    });

    it('should return 404 if an invalid data is provided', async () => {
      const dataWithoutWord = faker.date.soon().toISOString();
      await request(app).get(`${path}/${dataWithoutWord}`).expect(404);
    });
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
