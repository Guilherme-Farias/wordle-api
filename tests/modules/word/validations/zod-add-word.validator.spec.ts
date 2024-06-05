import { ZodAddWordValidator } from '@/modules/word/validators';
import { expectValidationToThrowProps } from '@tests/helpers/functions';
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

    expectValidationToThrowProps(() => sut.validate(values), {
      word: 'Deve ser um texto válido',
      date: 'Deve ser uma data válida',
    });
  });

  it('should throw ValidationError when word is invalid', () => {
    const values = makeAddWordControllerRequest({
      word: 'not_five_chars',
    });

    expectValidationToThrowProps(() => sut.validate(values), {
      word: 'Deve conter 5 letras',
    });
  });

  it('should throw ValidationError when date is invalid', () => {
    const values = makeAddWordControllerRequest({
      date: 'invalid_date',
    });

    expectValidationToThrowProps(() => sut.validate(values), {
      date: 'Deve ser uma data válida',
    });
  });

  it('should not throw Error if value is not empty', () => {
    const values = makeAddWordControllerRequest();
    expect(() => sut.validate(values)).not.toThrowError();
  });
});
