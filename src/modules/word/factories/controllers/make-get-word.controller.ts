import { GetWordController } from '../../controllers';
import { makeGetWordRequestToDateMapper } from '../mappers';
import { makeGetWordByDateUseCase } from '../use-cases';
import { makeZodGetWordByDateValidator } from '../validators';

export const makeGetWordController = () => {
  return new GetWordController(
    makeZodGetWordByDateValidator(),
    makeGetWordRequestToDateMapper(),
    makeGetWordByDateUseCase(),
  );
};
