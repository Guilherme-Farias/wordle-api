import { MockProxy, mock } from 'vitest-mock-extended';

import {
  AddWordController,
  AddWordControllerAPI,
} from '@/modules/word/controllers';
import { IAddWordRequestToDTOMapper } from '@/modules/word/mapper';
import { WordId, WordString } from '@/modules/word/models';
import { IAddWordUseCase } from '@/modules/word/use-cases';
import { IValidation } from '@/shared/protocols';
import { makeAddWordControllerRequest, throwError } from '@tests/helpers/mocks';
import { HttpResponseHelper } from '@/shared/helpers';
import { WordDateAlreadyExistisError } from '@/modules/word/errors';

describe('AddWordController', () => {
  let sut: AddWordController;
  const httpRequest = makeAddWordControllerRequest();
  let validatorMock: MockProxy<IValidation<AddWordControllerAPI.Request>>;
  let mapperMock: MockProxy<IAddWordRequestToDTOMapper>;
  let useCaseMock: MockProxy<IAddWordUseCase>;

  const valid_id = 'valid_id' as WordId;
  const parsed_word = httpRequest.word as WordString;
  const parsed_date = 'parsed_date' as unknown as Date;
  const word = {
    id: valid_id,
    word: parsed_word,
    date: parsed_date,
  } as const;

  const makeValidatorMock = () => {
    validatorMock = mock<IValidation>();
    validatorMock.validate.mockReturnValue();
    return validatorMock;
  };
  const makeMapperMock = () => {
    mapperMock = mock<IAddWordRequestToDTOMapper>();
    mapperMock.map.mockReturnValue({ word: parsed_word, date: parsed_date });
    return mapperMock;
  };

  const makeUseCaseMock = () => {
    useCaseMock = mock<IAddWordUseCase>();
    useCaseMock.execute.mockReturnValue(Promise.resolve(word));
    return useCaseMock;
  };

  beforeEach(() => {
    sut = new AddWordController(
      makeValidatorMock(),
      makeMapperMock(),
      makeUseCaseMock(),
    );
  });

  it('should call IValidation with correct values', async () => {
    await sut.handle(httpRequest);
    expect(validatorMock.validate).toHaveBeenCalledWith(httpRequest);
    expect(validatorMock.validate).not.toThrowError();
  });

  it('should rethrow if IValidation throws', async () => {
    validatorMock.validate.mockImplementationOnce(
      throwError('validator_error'),
    );
    const promise = sut.handle(httpRequest);
    await expect(promise).rejects.toThrowError('validator_error');
  });

  it('should call IMapper with correct values', async () => {
    await sut.handle(httpRequest);
    expect(mapperMock.map).toHaveBeenCalledWith(httpRequest);
    expect(mapperMock.map).not.toThrowError();
  });

  it('should rethrow if IMapper throws', async () => {
    mapperMock.map.mockImplementationOnce(throwError('mapper_error'));
    const promise = sut.handle(httpRequest);
    await expect(promise).rejects.toThrowError('mapper_error');
  });

  it('should return 403 if IAddWordUseCase throws WordDateAlreadyExistisError', async () => {
    const error = new WordDateAlreadyExistisError();
    useCaseMock.execute.mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      HttpResponseHelper.forbidden({ error: error.message }),
    );
  });

  it('should return 500 if IAddWordUseCase throws not mapped error', async () => {
    useCaseMock.execute.mockRejectedValueOnce(new Error('not_mapped_error'));
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      HttpResponseHelper.internalServerError({ error: 'Erro no servidor' }),
    );
  });

  it('should return 201 and Word if valid data is provided', async () => {
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(HttpResponseHelper.created({ word }));
  });
});
