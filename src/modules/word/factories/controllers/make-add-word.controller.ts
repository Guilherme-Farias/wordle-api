import { AddWordController } from '../../controllers';
import { makeAddWordRequestToDtoMapper } from '../mappers';
import { makeAddWordUseCase } from '../use-cases';
import { makeZodAddWordValidator } from '../validators';

export const makeAddWordController = () => {
  return new AddWordController(
    makeZodAddWordValidator(),
    makeAddWordRequestToDtoMapper(),
    makeAddWordUseCase(),
  );
};
