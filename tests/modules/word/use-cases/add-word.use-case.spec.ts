import { Word } from '@/modules/word/models';
import { WordRepository } from '@/modules/word/repositories';
import { AddWordUseCase } from '@/modules/word/use-cases';
import { makeAddWordUseCaseDTO } from '@tests/mocks';
import {
  MockProxy,
  describe,
  mock,
  beforeEach,
  it,
  expect,
} from '@tests/utils';

describe('AddWordUseCase', () => {
  const dto = makeAddWordUseCaseDTO();
  let sut: AddWordUseCase;
  let wordRepositoryMock: MockProxy<WordRepository>;

  const makeAppointmentRepositoryMock = () => {
    wordRepositoryMock = mock<WordRepository>();

    wordRepositoryMock.create.mockReturnValue(
      Promise.resolve({
        id: 'valid_id',
        word: dto.word,
        date: dto.date,
      } as Word),
    );
    return wordRepositoryMock;
  };

  beforeEach(() => {
    sut = new AddWordUseCase(makeAppointmentRepositoryMock());
  });

  it('should call WordRepository.create with correct values', async () => {
    await sut.execute(dto);
    expect(wordRepositoryMock.create).toHaveBeenCalledWith(dto);
    expect(wordRepositoryMock.create).toReturnWith({
      id: 'valid_id',
      ...dto,
    });
  });

  it('should rethrow if WordRepository.create throws', async () => {
    const error = new Error('create_error');
    wordRepositoryMock.create.mockRejectedValueOnce(error);
    await expect(sut.execute(dto)).rejects.toThrow(error);
  });
});
