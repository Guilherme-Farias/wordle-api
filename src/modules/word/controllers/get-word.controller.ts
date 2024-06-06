import {
  MapperError,
  ResourceNotFoundError,
  ValidationError,
} from '@/shared/errors';
import { HttpResponseHelper } from '@/shared/helpers';
import { IController, IHttpResponse, IValidation } from '@/shared/protocols';

import { IGetWordRequestToDateMapper } from '../mapper';
import { Word } from '../models';
import { IGetWordByDateUseCase } from '../use-cases';

export namespace GetWordControllerAPI {
  export type Request = {
    date: string;
  };
  export type Response = Word;
}

export class GetWordController
  implements
    IController<GetWordControllerAPI.Request, GetWordControllerAPI.Response>
{
  constructor(
    private readonly validator: IValidation<GetWordControllerAPI.Request>,
    private readonly mapper: IGetWordRequestToDateMapper,
    private readonly getWordByDateUseCase: IGetWordByDateUseCase,
  ) {}

  async handle(
    request: GetWordControllerAPI.Request,
  ): Promise<IHttpResponse<GetWordControllerAPI.Response>> {
    try {
      this.validator.validate(request);
      const date = this.mapper.map(request);
      const word = await this.getWordByDateUseCase.execute(date);
      return HttpResponseHelper.ok(word);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return HttpResponseHelper.notFound(error);
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
