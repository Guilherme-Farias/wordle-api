import { ZodAddWordValidator } from '../../validators';

export const makeZodAddWordValidator = () => {
  return new ZodAddWordValidator();
};
