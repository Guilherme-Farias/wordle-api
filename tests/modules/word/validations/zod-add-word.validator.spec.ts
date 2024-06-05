import { beforeEach, describe, expect, it } from 'vitest';

import { ZodAddWordValidator } from '@/modules/word/validations';
import { ValidationError } from '@/shared/errors';
import { makeAddWordControllerRequest } from '@tests/helpers/mocks';

describe('ZodAddWordValidator', () => {
  let sut: ZodAddWordValidator;

  beforeEach(() => {
    sut = new ZodAddWordValidator();
  });

  it('should throw ValidationError when no fields is provided', () => {
    const values = makeAddWordControllerRequest({
      word: undefined,
      date: undefined,
    });
    const error = sut.validate(values);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error?.params).toEqual({
      word: 'Deve ser um texto válido',
      date: 'Deve ser uma data válida',
    });
  });

  it('should throw ValidationError when word is invalid', () => {
    const values = makeAddWordControllerRequest({
      word: 'not_five_chars',
    });
    const error = sut.validate(values);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error?.params).toEqual({
      word: 'Deve conter 5 letras',
    });
  });

  it('should throw ValidationError when date is invalid', () => {
    const values = makeAddWordControllerRequest({
      date: 'invalid_date',
    });
    const error = sut.validate(values);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error?.params).toEqual({
      date: 'Deve ser uma data válida',
    });
  });

  it('should return undefined if value is not empty', () => {
    const values = makeAddWordControllerRequest();
    const error = sut.validate(values);
    expect(error).toBeUndefined();
  });
});
