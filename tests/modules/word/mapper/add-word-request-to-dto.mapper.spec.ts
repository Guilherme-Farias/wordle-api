import { beforeEach, describe, expect, it } from 'vitest';
import { MockProxy, mock } from 'vitest-mock-extended';

import { AddWordRequestToDTOMapper } from '@/modules/word/mapper';
import { MapperError } from '@/shared/errors';
import { DateProvider } from '@/shared/providers/date-provider';
import { makeAddWordControllerRequest, throwError } from '@tests/helpers/mocks';

describe('AddWordRequestToDTOMapper', () => {
  const dto = makeAddWordControllerRequest();
  let sut: AddWordRequestToDTOMapper;
  let dateProviderMock: MockProxy<DateProvider>;

  const parsed_date = 'parsed_date' as unknown as Date;

  const makeDateProviderMock = () => {
    dateProviderMock = mock<DateProvider>();
    dateProviderMock.parseISO.mockReturnValue(parsed_date);
    return dateProviderMock;
  };

  beforeEach(() => {
    sut = new AddWordRequestToDTOMapper(makeDateProviderMock());
  });

  it('should call DateProvider.parseISO with correct values', () => {
    sut.map(dto);
    expect(dateProviderMock.parseISO).toHaveBeenCalledWith(dto.date);
    expect(dateProviderMock.parseISO).toReturnWith(parsed_date);
  });

  it('should rethrow if DateProvider.parseISO throws', () => {
    dateProviderMock.parseISO.mockImplementationOnce(throwError());
    expect(() => sut.map(dto)).toThrowError(MapperError);
  });

  it('should return AddWordDTO if valid data is provided', () => {
    expect(sut.map(dto)).toEqual({ word: dto.word, date: parsed_date });
  });
});