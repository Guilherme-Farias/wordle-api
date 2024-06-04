import { AddWordDTO } from '@/modules/word/dtos';

import { faker } from '../utils';

export function makeAddWordUseCaseDTO(dto?: AddWordDTO): AddWordDTO {
  return {
    word: faker.word.sample(5),
    date: faker.date.soon({ days: 1 }),
    ...dto,
  } as AddWordDTO;
}
