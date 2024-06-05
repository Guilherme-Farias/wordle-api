import { faker } from '@faker-js/faker';
import * as dateFns from 'date-fns';

import { DateFnsProvider } from '@/shared/providers/date';
import { throwError } from '@tests/helpers/mocks';

vi.mock('date-fns', () => ({
  parseISO(): Date {
    return 'parse_iso' as unknown as Date;
  },
}));

describe('DateFnsProvider', () => {
  let sut: DateFnsProvider;
  const date = faker.date.soon().toISOString();

  beforeEach(() => {
    sut = new DateFnsProvider();
  });

  describe('parseISO()', () => {
    it('should call parseISO with correct values', () => {
      const parseISOSpy = vi.spyOn(dateFns, 'parseISO');
      sut.parseISO(date);
      expect(parseISOSpy).toHaveBeenCalledWith(date);
    });

    it('should return a parsed date on success', () => {
      const parseISO = sut.parseISO(date);
      expect(parseISO).toBe('parse_iso');
    });

    it('should throw if parseISO throws', () => {
      vi.spyOn(dateFns, 'parseISO').mockImplementationOnce(
        throwError('parseISO_error'),
      );
      expect(() => sut.parseISO(date)).toThrowErrorMatchingInlineSnapshot(
        `[Error: parseISO_error]`,
      );
    });
  });
});
