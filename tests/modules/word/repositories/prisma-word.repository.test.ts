// @vitest-environment prisma

import { faker } from '@faker-js/faker';

import { prisma } from '@/infra/db';
import { PrismaWordRepository } from '@/modules/word/repositories';
import { makeAddWordUseCaseDTO } from '@tests/helpers/mocks';

describe('PrismaWordRepository', () => {
  const sut = new PrismaWordRepository();

  beforeEach(async () => {
    await prisma.word.deleteMany({});
  });

  describe('findByDate', () => {
    it('should be able to return an word by date', async () => {
      const word = makeAddWordUseCaseDTO();
      const createdWord = await sut.create(word);
      const response = await sut.findByDate(createdWord.date);
      expect(response).toEqual(createdWord);
    });

    it('should be able to return null when not find word', async () => {
      const response = await sut.findByDate(faker.date.anytime());
      expect(response).toBe(null);
    });
  });

  describe('create', () => {
    it('should be able to create a new word', async () => {
      const word = makeAddWordUseCaseDTO();
      const response = await sut.create(word);
      expect(response).toHaveProperty('id');
    });
  });
});
