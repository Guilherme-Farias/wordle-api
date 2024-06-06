import { MockProxy, mock } from 'vitest-mock-extended';

import {
  AddWordController,
  AddWordControllerAPI,
} from '@/modules/word/controllers';
import { WordDateAlreadyExistsError } from '@/modules/word/errors';
import { IAddWordRequestToDTOMapper } from '@/modules/word/mapper';
import { WordId, WordString } from '@/modules/word/models';
import { IAddWordUseCase } from '@/modules/word/use-cases';
import { MapperError, ValidationError } from '@/shared/errors';
import { HttpResponseHelper } from '@/shared/helpers';
import { IValidation } from '@/shared/protocols';
import { makeAddWordControllerRequest, throwError } from '@tests/helpers/mocks';

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

  it('should return 400 if IValidation throws', async () => {
    const error = new ValidationError({ params: { param: 'any_error' } });
    validatorMock.validate.mockImplementation(throwError(error));
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(HttpResponseHelper.badRequest(error));
  });

  it('should return 400 if IMapper throws', async () => {
    const error = new MapperError();
    mapperMock.map.mockImplementationOnce(throwError(error));
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(HttpResponseHelper.badRequest(error));
  });

  it('should return 403 if IAddWordUseCase throws WordDateAlreadyExistisError', async () => {
    const error = new WordDateAlreadyExistsError();
    useCaseMock.execute.mockRejectedValueOnce(error);
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      HttpResponseHelper.forbidden({ message: error.message }),
    );
  });

  it('should return 500 if IAddWordUseCase throws not mapped error', async () => {
    useCaseMock.execute.mockRejectedValueOnce(new Error('not_mapped_error'));
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      HttpResponseHelper.internalServerError({ message: 'Erro no servidor' }),
    );
  });

  it('should return 201 and Word if valid data is provided', async () => {
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(HttpResponseHelper.created({ word }));
  });
});
