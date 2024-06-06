import { ValidationError } from '@/shared/errors';
import { getFieldErrors } from '@/shared/helpers';
import { IValidation } from '@/shared/protocols';

import { GetWordControllerAPI } from '../controllers';

import { fieldErrors } from './field-errors';

export class ZodGetWordByDateValidator implements IValidation {
  validate(params: GetWordControllerAPI.Request) {
    const schema = fieldErrors.pick({ date: true });
    const result = schema.safeParse(params);

    if (!result.success) {
      throw new ValidationError({
        params: getFieldErrors(result.error.issues),
      });
    }
  }
}
