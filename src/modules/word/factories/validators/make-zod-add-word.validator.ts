import { ZodAddWordValidator } from '../../validations';

export const makeZodAddWordValidator = () => {
  return new ZodAddWordValidator();
};
