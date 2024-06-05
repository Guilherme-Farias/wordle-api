import { AddWordDTO } from '../dtos';
import { Word } from '../models';

export type WordRepository = {
  findByDate(date: Date): Promise<Word | null>;
  create(data: AddWordDTO): Promise<Word>;
};
