import { HttpResponseHelper } from '@/shared/helpers';
import { IController, IHttpResponse, IValidation } from '@/shared/protocols';
import { MapperError, ValidationError } from '@/shared/errors';

import { IAddWordRequestToDTOMapper } from '../mapper';
import { Word } from '../models';
import { IAddWordUseCase } from '../use-cases';
import { WordDateAlreadyExistisError } from '../errors';

export namespace AddWordControllerAPI {
  export type Request = {
    word: string;
    date: string;
  };
  export type Response = {
    word: Word;
  };
}

export class AddWordController
  implements
    IController<AddWordControllerAPI.Request, AddWordControllerAPI.Response>
{
  constructor(
    private readonly validator: IValidation<AddWordControllerAPI.Request>,
    private readonly mapper: IAddWordRequestToDTOMapper,
    private readonly addWordUseCase: IAddWordUseCase,
  ) {}

  async handle(
    request: AddWordControllerAPI.Request,
  ): Promise<IHttpResponse<AddWordControllerAPI.Response>> {
    try {
      this.validator.validate(request);
      const dto = this.mapper.map(request);
      const word = await this.addWordUseCase.execute(dto);
      return HttpResponseHelper.created({ word });
    } catch (error) {
      if (error instanceof WordDateAlreadyExistisError) {
        return HttpResponseHelper.forbidden({ message: error.message });
      }
      if (error instanceof ValidationError || error instanceof MapperError) {
        return HttpResponseHelper.badRequest(error);
      }
      return HttpResponseHelper.internalServerError({
        message: 'Erro no servidor',
      });
    }
  }
}
