import { MockProxy, mock } from 'vitest-mock-extended';

import { WordDateAlreadyExistisError } from '@/modules/word/errors';
import { WordId, WordString } from '@/modules/word/models';
import { WordRepository } from '@/modules/word/repositories';
import { AddWordUseCase } from '@/modules/word/use-cases';
import { makeAddWordUseCaseDTO } from '@tests/helpers/mocks';

describe('AddWordUseCase', () => {
  const dto = makeAddWordUseCaseDTO();
  let sut: AddWordUseCase;
  let wordRepositoryMock: MockProxy<WordRepository>;

  const word = {
    id: 'valid_id' as WordId,
    word: dto.word as WordString,
    date: dto.date,
  } as const;

  const makeAppointmentRepositoryMock = () => {
    wordRepositoryMock = mock<WordRepository>();
    wordRepositoryMock.findByDate.mockReturnValue(Promise.resolve(null));
    wordRepositoryMock.create.mockReturnValue(Promise.resolve(word));
    return wordRepositoryMock;
  };

  beforeEach(() => {
    sut = new AddWordUseCase(makeAppointmentRepositoryMock());
  });

  it('should call WordRepository.findByDate with available date', async () => {
    await sut.execute(dto);
    expect(wordRepositoryMock.findByDate).toHaveBeenCalledWith(dto.date);
    expect(wordRepositoryMock.findByDate).toReturnWith(null);
  });

  it('should throw WordDateAlreadyExistisError if WordRepository.findByDate return word', async () => {
    wordRepositoryMock.findByDate.mockReturnValueOnce(Promise.resolve(word));
    const promise = sut.execute(dto);
    await expect(promise).rejects.toThrowError(WordDateAlreadyExistisError);
  });

  it('should call WordRepository.create with correct values', async () => {
    await sut.execute(dto);
    expect(wordRepositoryMock.create).toHaveBeenCalledWith(dto);
    expect(wordRepositoryMock.create).toReturnWith(word);
  });

  it('should rethrow if WordRepository.create throws', async () => {
    const error = new Error('create_error');
    wordRepositoryMock.create.mockRejectedValueOnce(error);
    await expect(sut.execute(dto)).rejects.toThrow(error);
  });

  it('should return Word if valid data is provided', async () => {
    const returnedWord = await sut.execute(dto);
    expect(returnedWord).toEqual(word);
  });
});
