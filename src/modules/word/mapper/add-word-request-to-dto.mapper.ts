import { IMapper } from '@/shared/protocols/mapper';
import { DateProvider } from '@/shared/providers/date-provider';

import { AddWordControllerAPI } from '../controllers';
import { AddWordDTO } from '../dtos';

export class AddWordRequestToDTOMapper
  implements IMapper<AddWordControllerAPI.Request, AddWordDTO>
{
  constructor(private readonly dateProvider: DateProvider) {}

  map(data: AddWordControllerAPI.Request): AddWordDTO {
    return {
      ...data,
      date: this.dateProvider.parseISO(data.date),
    } as AddWordDTO;
  }
}
