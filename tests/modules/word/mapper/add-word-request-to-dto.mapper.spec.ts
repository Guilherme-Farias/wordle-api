import { MockProxy, mock } from 'vitest-mock-extended';

import { AddWordRequestToDTOMapper } from '@/modules/word/mapper';
import { MapperError } from '@/shared/errors';
import { DateProvider } from '@/shared/providers/date';
import { makeAddWordControllerRequest, throwError } from '@tests/helpers/mocks';

describe('AddWordRequestToDTOMapper', () => {
  const dto = makeAddWordControllerRequest();
  let sut: AddWordRequestToDTOMapper;
  let dateProviderMock: MockProxy<DateProvider>;

  const parsed_date = 'parsed_date' as unknown as Date;

  const makeDateProviderMock = () => {
    dateProviderMock = mock<DateProvider>();
    dateProviderMock.startOfDay.mockReturnValue(parsed_date);
    return dateProviderMock;
  };

  beforeEach(() => {
    sut = new AddWordRequestToDTOMapper(makeDateProviderMock());
  });

  it('should call DateProvider.startOfDay with correct values', () => {
    sut.map(dto);
    expect(dateProviderMock.startOfDay).toHaveBeenCalledWith(dto.date);
    expect(dateProviderMock.startOfDay).toReturnWith(parsed_date);
  });

  it('should rethrow if DateProvider.startOfDay throws', () => {
    dateProviderMock.startOfDay.mockImplementationOnce(throwError());
    expect(() => sut.map(dto)).toThrowError(MapperError);
  });

  it('should return AddWordDTO if valid data is provided', () => {
    expect(sut.map(dto)).toEqual({
      word: dto.word.toLowerCase(),
      date: parsed_date,
    });
  });
});
