import { DateFnsProvider } from '@/shared/providers/date';

import { AddWordRequestToDTOMapper } from '../../mapper';

export const makeAddWordRequestToDtoMapper = () => {
  const dateProvider = new DateFnsProvider();
  return new AddWordRequestToDTOMapper(dateProvider);
};
