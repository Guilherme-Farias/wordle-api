import { ResourceNotFoundError } from '@/shared/errors';
import { IUseCase } from '@/shared/protocols/use-case';

import { Word } from '../models';
import { WordRepository } from '../repositories';

export type IGetWordByDateUseCase = IUseCase<Date, Promise<Word>>;

export class GetWordByDateUseCase implements IGetWordByDateUseCase {
  constructor(private readonly wordRepository: WordRepository) {}

  async execute(date: Date) {
    const word = await this.wordRepository.findByDate(date);
    if (!word) {
      throw new ResourceNotFoundError('Palavra não encontrada');
    }

    return word;
  }
}
