import { IUseCase } from '@/shared/protocols/use-case';

import { AddWordDTO } from '../dtos';
import { Word } from '../models';
import { WordRepository } from '../repositories';

export type IAddWordUseCase = IUseCase<AddWordDTO, Promise<{ word: Word }>>;

export class AddWordUseCase implements IAddWordUseCase {
  constructor(private readonly wordRepository: WordRepository) {}

  async execute(dto: AddWordDTO) {
    const word = await this.wordRepository.create(dto);
    // TODO validar se `date` já existe
    // TODO validar se `date` é futura
    // TODO validar se `word` já existe
    // TODO se sintam livres para criar suas próprias regras
    return { word };
  }
}
