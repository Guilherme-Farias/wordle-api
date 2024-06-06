import { faker } from '@faker-js/faker';
import { MockProxy, mock } from 'vitest-mock-extended';

import { GetWordRequestToDateMapper } from '@/modules/word/mapper';
import { MapperError } from '@/shared/errors';
import { DateProvider } from '@/shared/providers/date';
import { throwError } from '@tests/helpers/mocks';

describe('GetWordRequestToDateMapper', () => {
  let sut: GetWordRequestToDateMapper;
  let dateProviderMock: MockProxy<DateProvider>;

  const date = faker.date.soon().toISOString();
  const parsed_date = 'parsed_date' as unknown as Date;

  const makeDateProviderMock = () => {
    dateProviderMock = mock<DateProvider>();
    dateProviderMock.startOfDay.mockReturnValue(parsed_date);
    return dateProviderMock;
  };

  beforeEach(() => {
    sut = new GetWordRequestToDateMapper(makeDateProviderMock());
  });

  it('should call DateProvider.startOfDay with correct values', () => {
    sut.map({ date });
    expect(dateProviderMock.startOfDay).toHaveBeenCalledWith(date);
    expect(dateProviderMock.startOfDay).toReturnWith(parsed_date);
  });

  it('should rethrow if DateProvider.startOfDay throws', () => {
    dateProviderMock.startOfDay.mockImplementationOnce(throwError());
    expect(() => sut.map({ date })).toThrowError(MapperError);
  });

  it('should return Date if valid ISOString is provided', () => {
    expect(sut.map({ date })).toEqual(parsed_date);
  });
});
