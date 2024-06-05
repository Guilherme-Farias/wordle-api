import { IUseCase } from '@/shared/protocols/use-case';

import { AddWordDTO } from '../dtos';
import { WordDateAlreadyExistisError } from '../errors';
import { Word } from '../models';
import { WordRepository } from '../repositories';

export type IAddWordUseCase = IUseCase<AddWordDTO, Promise<Word>>;

export class AddWordUseCase implements IAddWordUseCase {
  constructor(private readonly wordRepository: WordRepository) {}

  async execute(dto: AddWordDTO) {
    const wordByDate = await this.wordRepository.findByDate(dto.date);
    if (wordByDate) throw new WordDateAlreadyExistisError();
    const word = await this.wordRepository.create(dto);
    // TODO validar se `date` é futura
    // TODO se sintam livres para criar suas próprias regras
    return word;
  }
}
