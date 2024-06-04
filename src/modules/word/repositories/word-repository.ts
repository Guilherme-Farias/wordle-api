import { AddWordDTO } from '../dtos';
import { Word } from '../models';

export type WordRepository = {
  create(data: AddWordDTO): Promise<Word>;
};