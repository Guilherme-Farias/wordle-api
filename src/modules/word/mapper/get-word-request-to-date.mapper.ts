import { MapperError } from '@/shared/errors';
import { IMapper } from '@/shared/protocols/mapper';
import { DateProvider } from '@/shared/providers/date';

import { GetWordControllerAPI } from '../controllers';

export type IGetWordRequestToDateMapper = IMapper<
  GetWordControllerAPI.Request,
  Date
>;
export class GetWordRequestToDateMapper implements IGetWordRequestToDateMapper {
  constructor(private readonly dateProvider: DateProvider) {}

  map(request: GetWordControllerAPI.Request): Date {
    try {
      const date = this.dateProvider.startOfDay(request);
      return date;
    } catch {
      throw new MapperError();
    }
  }
}
