import { AddWordControllerAPI } from '@/modules/word/controllers';
import { ValidationError } from '@/shared/errors';
import { getFieldErrors } from '@/shared/helpers';
import { IValidation } from '@/shared/protocols';

import { fieldErrors } from './field-errors';

export class ZodAddWordValidator implements IValidation {
  validate(params: AddWordControllerAPI.Request) {
    const schema = fieldErrors.pick({ word: true, date: true });
    const result = schema.safeParse(params);

    if (!result.success) {
      const params = getFieldErrors(result.error.issues);
      throw new ValidationError({ params });
    }
  }
}
