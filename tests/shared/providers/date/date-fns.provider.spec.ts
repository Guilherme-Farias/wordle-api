import { faker } from '@faker-js/faker';
import * as dateFns from 'date-fns';

import { DateFnsProvider } from '@/shared/providers/date';
import { throwError } from '@tests/helpers/mocks';

vi.mock('date-fns', () => ({
  parseISO(): Date {
    return 'parse_iso' as unknown as Date;
  },
  startOfDay(): Date {
    return 'start_of_day' as unknown as Date;
  },
}));

describe('DateFnsProvider', () => {
  let sut: DateFnsProvider;
  const date = faker.date.soon();
  const dateString = date.toISOString();
  const dateNumber = date.getTime();

  beforeEach(() => {
    sut = new DateFnsProvider();
  });

  describe('parseISO()', () => {
    it('should call parseISO with correct values', () => {
      const parseISOSpy = vi.spyOn(dateFns, 'parseISO');
      sut.parseISO(dateString);
      expect(parseISOSpy).toHaveBeenCalledWith(dateString);
    });

    it('should return a parsed date on success', () => {
      const parseISO = sut.parseISO(dateString);
      expect(parseISO).toBe('parse_iso');
    });

    it('should throw if parseISO throws', () => {
      vi.spyOn(dateFns, 'parseISO').mockImplementationOnce(
        throwError('parseISO_error'),
      );
      expect(() => sut.parseISO(dateString)).toThrowErrorMatchingInlineSnapshot(
        `[Error: parseISO_error]`,
      );
    });
  });

  describe('startOfDay()', () => {
    it('should call startOfDay with correct values', () => {
      const startOfDaySpy = vi.spyOn(dateFns, 'startOfDay');
      sut.startOfDay(date);
      expect(startOfDaySpy).toHaveBeenCalledWith(date);
      sut.startOfDay(dateString);
      expect(startOfDaySpy).toHaveBeenCalledWith(dateString);
      sut.startOfDay(dateNumber);
      expect(startOfDaySpy).toHaveBeenCalledWith(dateNumber);
    });

    it('should return the start of the day for a given date', () => {
      const startOfDay = sut.startOfDay(date);
      expect(startOfDay).toBe('start_of_day');
    });

    it('should return the start of the day for a given string', () => {
      const startOfDay = sut.startOfDay(dateString);
      expect(startOfDay).toBe('start_of_day');
    });

    it('should return the start of the day for a given number', () => {
      const startOfDay = sut.startOfDay(dateString);
      expect(startOfDay).toBe('start_of_day');
    });

    it('should throw if startOfDay throws', () => {
      vi.spyOn(dateFns, 'startOfDay').mockImplementationOnce(
        throwError('startOfDay_error'),
      );
      expect(() => sut.startOfDay(date)).toThrowErrorMatchingInlineSnapshot(
        `[Error: startOfDay_error]`,
      );
    });
  });
});
