import { IHttpResponse, IParamErrors } from '../protocols';

type HttpErrorProps = {
  error?: string;
};

type BadRequestProps = HttpErrorProps & {
  params?: IParamErrors;
};

export class HttpResponseHelper {
  public static created<T>(data: T): IHttpResponse<T> {
    return { statusCode: 201, body: data };
  }

  public static badRequest(props?: BadRequestProps): IHttpResponse {
    const error = props?.error ?? 'Bad Request';
    const params = props?.params ?? undefined;
    return { statusCode: 400, body: { error, params } };
  }
  public static forbidden(props?: HttpErrorProps): IHttpResponse {
    const error = props?.error ?? 'Forbidden';
    return { statusCode: 403, body: { error } };
  }

  public static internalServerError(props?: HttpErrorProps): IHttpResponse {
    const error = props?.error ?? 'Internal Server Error';
    return { statusCode: 500, body: { error } };
  }
}
