import { MapperError } from '@/shared/errors';
import { IMapper } from '@/shared/protocols/mapper';
import { DateProvider } from '@/shared/providers/date';

import { AddWordControllerAPI } from '../controllers';
import { AddWordDTO } from '../dtos';
import { WordString } from '../models';

export type IAddWordRequestToDTOMapper = IMapper<
  AddWordControllerAPI.Request,
  AddWordDTO
>;
export class AddWordRequestToDTOMapper implements IAddWordRequestToDTOMapper {
  constructor(private readonly dateProvider: DateProvider) {}

  map(data: AddWordControllerAPI.Request): AddWordDTO {
    try {
      const word = data.word.toLowerCase() as WordString;
      const date = this.dateProvider.startOfDay(data.date);
      return { word, date };
    } catch {
      throw new MapperError();
    }
  }
}
