import { faker } from '@faker-js/faker';
import { MockProxy, mock } from 'vitest-mock-extended';

import {
  GetWordController,
  GetWordControllerAPI,
} from '@/modules/word/controllers';
import { IGetWordRequestToDateMapper } from '@/modules/word/mapper';
import { IGetWordByDateUseCase } from '@/modules/word/use-cases';
import {
  MapperError,
  ResourceNotFoundError,
  ValidationError,
} from '@/shared/errors';
import { HttpResponseHelper } from '@/shared/helpers';
import { IValidation } from '@/shared/protocols';
import { makeWord, throwError } from '@tests/helpers/mocks';

describe('GetWordController', () => {
  let sut: GetWordController;
  const httpRequest = faker.date.soon().toISOString();
  let validatorMock: MockProxy<IValidation<GetWordControllerAPI.Request>>;
  let mapperMock: MockProxy<IGetWordRequestToDateMapper>;
  let useCaseMock: MockProxy<IGetWordByDateUseCase>;

  const parsed_date = 'parsed_date' as unknown as Date;
  const word = makeWord({ date: parsed_date });

  const makeValidatorMock = () => {
    validatorMock = mock<IValidation>();
    validatorMock.validate.mockReturnValue();
    return validatorMock;
  };
  const makeMapperMock = () => {
    mapperMock = mock<IGetWordRequestToDateMapper>();
    mapperMock.map.mockReturnValue(parsed_date);
    return mapperMock;
  };

  const makeUseCaseMock = () => {
    useCaseMock = mock<IGetWordByDateUseCase>();
    useCaseMock.execute.mockReturnValue(Promise.resolve(word));
    return useCaseMock;
  };

  beforeEach(() => {
    sut = new GetWordController(
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

  it('should return 404 if IGetWordByDateUseCase throws ResourceNotFoundError', async () => {
    const error = new ResourceNotFoundError();
    useCaseMock.execute.mockRejectedValueOnce(error);
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      HttpResponseHelper.notFound({ message: error.message }),
    );
  });

  it('should return 500 if IGetWordByDateUseCase throws not mapped error', async () => {
    useCaseMock.execute.mockRejectedValueOnce(new Error('not_mapped_error'));
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      HttpResponseHelper.internalServerError({ message: 'Erro no servidor' }),
    );
  });

  it('should return 200 and Word if valid data is provided', async () => {
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(HttpResponseHelper.ok(word));
  });
});
