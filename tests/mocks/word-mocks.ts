import { AddWordControllerAPI } from '@/modules/word/controllers';
import { AddWordDTO } from '@/modules/word/dtos';

import { faker } from '../utils';

export function makeAddWordControllerRequest(
  dto?: Partial<AddWordControllerAPI.Request>,
): AddWordControllerAPI.Request {
  return {
    word: faker.word.sample(5),
    date: faker.date.soon({ days: 1 }).toISOString(),
    ...dto,
  };
}

export function makeAddWordUseCaseDTO(dto?: Partial<AddWordDTO>): AddWordDTO {
  return {
    word: faker.word.sample(5),
    date: faker.date.soon({ days: 1 }),
    ...dto,
  } as AddWordDTO;
}
