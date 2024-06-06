import { faker } from '@faker-js/faker';
import { MockProxy, mock } from 'vitest-mock-extended';

import { WordRepository } from '@/modules/word/repositories';
import { GetWordByDateUseCase } from '@/modules/word/use-cases';
import { ResourceNotFoundError } from '@/shared/errors';
import { makeWord } from '@tests/helpers/mocks';

describe('GetWordByDateUseCase', () => {
  let sut: GetWordByDateUseCase;
  let wordRepositoryMock: MockProxy<WordRepository>;
  const date = faker.date.soon();
  const word = makeWord({ date: date });

  const makeAppointmentRepositoryMock = () => {
    wordRepositoryMock = mock<WordRepository>();
    wordRepositoryMock.findByDate.mockReturnValue(Promise.resolve(word));
    return wordRepositoryMock;
  };

  beforeEach(() => {
    sut = new GetWordByDateUseCase(makeAppointmentRepositoryMock());
  });

  it('should call WordRepository.findByDate with valid date', async () => {
    await sut.execute(date);
    expect(wordRepositoryMock.findByDate).toHaveBeenCalledWith(date);
    expect(wordRepositoryMock.findByDate).toReturnWith(word);
  });

  it('should throw ResourceNotFoundError if WordRepository.findByDate return null', async () => {
    wordRepositoryMock.findByDate.mockReturnValueOnce(Promise.resolve(null));
    const promise = sut.execute(date);
    await expect(promise).rejects.toThrowError(ResourceNotFoundError);
  });

  it('should return Word if valid data is provided', async () => {
    expect(await sut.execute(date)).toEqual(word);
  });
});
