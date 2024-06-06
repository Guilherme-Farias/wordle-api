import { ZodGetWordByDateValidator } from '../../validators';

export const makeZodGetWordByDateValidator = () => {
  return new ZodGetWordByDateValidator();
};
