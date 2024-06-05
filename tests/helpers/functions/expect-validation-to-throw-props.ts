import { expect, assert } from 'vitest';

import { ValidationError } from '@/shared/errors';
import { IParamErrors, IValidation } from '@/shared/protocols';

export function expectValidationToThrowProps<Validation extends IValidation>(
  validate: () => ReturnType<Validation['validate']>,
  expectedParams: IParamErrors,
) {
  try {
    validate();
    assert.fail();
  } catch (error) {
    expect(error).toBeInstanceOf(ValidationError);
    const params = (error as ValidationError).params;
    expect(params).toEqual(expectedParams);
  }
}
