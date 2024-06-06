import { faker } from '@faker-js/faker';

import { ZodGetWordByDateValidator } from '@/modules/word/validators';
import { expectValidationToThrowProps } from '@tests/helpers/functions';

describe('ZodAddWordValidator', () => {
  let sut: ZodGetWordByDateValidator;

  beforeEach(() => {
    sut = new ZodGetWordByDateValidator();
  });

  it('should throw ValidationError when no date is provided', () => {
    const date = undefined as unknown as string;

    expectValidationToThrowProps(() => sut.validate(date), {
      date: 'Deve ser uma data válida',
    });
  });

  it('should throw ValidationError when date is invalid', () => {
    const date = 'invalid_date';

    expectValidationToThrowProps(() => sut.validate(date), {
      date: 'Deve ser uma data válida',
    });
  });

  it('should not throw Error if date is valid', () => {
    const date = faker.date.soon().toISOString();
    expect(() => sut.validate(date)).not.toThrowError();
  });
});
