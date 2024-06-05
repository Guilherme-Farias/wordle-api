import { IMapper } from '@/shared/protocols/mapper';
import { DateProvider } from '@/shared/providers/date-provider';

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
    return {
      word: data.word as WordString,
      date: this.dateProvider.parseISO(data.date),
    };
  }
}
