import { DateFnsProvider } from '@/shared/providers/date';

import { GetWordRequestToDateMapper } from '../../mapper';

export const makeGetWordRequestToDateMapper = () => {
  const dateProvider = new DateFnsProvider();
  return new GetWordRequestToDateMapper(dateProvider);
};
