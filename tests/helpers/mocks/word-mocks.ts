import { faker } from '@faker-js/faker';

import { AddWordControllerAPI } from '@/modules/word/controllers';
import { AddWordDTO } from '@/modules/word/dtos';
import { Word } from '@/modules/word/models';

export function makeAddWordControllerRequest(
  dto?: Partial<AddWordControllerAPI.Request>,
): AddWordControllerAPI.Request {
  return {
    word: faker.word.sample(5).toUpperCase(),
    date: faker.date.soon({ days: 1 }).toISOString(),
    ...dto,
  };
}

export function makeAddWordUseCaseDTO(dto?: Partial<AddWordDTO>): AddWordDTO {
  return {
    word: faker.word.sample(5).toLowerCase(),
    date: faker.date.soon({ days: 1 }),
    ...dto,
  } as AddWordDTO;
}

export function makeWord(dto?: Partial<Word>): Word {
  return {
    id: faker.string.uuid(),
    word: faker.word.sample(5).toLowerCase(),
    date: faker.date.soon({ days: 1 }),
    ...dto,
  } as Word;
}
