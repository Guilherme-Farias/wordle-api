import { prisma } from '@/infra/db';

import { AddWordDTO } from '../dtos';
import { Word } from '../models';

import { WordRepository } from './word.repository';

export class PrismaWordRepository implements WordRepository {
  async findByDate(date: Date): Promise<Word | null> {
    const word = await prisma.word.findUnique({ where: { date } });
    return word as Word | null;
  }

  async create(data: AddWordDTO): Promise<Word> {
    const word = await prisma.word.create({ data });
    return word as Word;
  }
}
