import { ValidationError } from '@/shared/errors';
import { getFieldErrors } from '@/shared/helpers';
import { IValidation } from '@/shared/protocols';

import { fieldErrors } from './field-errors';

export class ZodGetWordByDateValidator implements IValidation {
  validate(date: string) {
    const schema = fieldErrors.pick({ date: true });
    const result = schema.safeParse({ date });

    if (!result.success) {
      throw new ValidationError({
        params: getFieldErrors(result.error.issues),
      });
    }
  }
}
