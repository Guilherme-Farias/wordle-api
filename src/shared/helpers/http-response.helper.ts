import { IHttpResponse, IParamErrors } from '../protocols';

type HttpErrorProps = {
  message?: string;
};

type BadRequestProps = HttpErrorProps & {
  params?: IParamErrors;
};

export class HttpResponseHelper {
  public static ok<T>(data: T): IHttpResponse<T> {
    return { statusCode: 200, body: data };
  }

  public static created<T>(data: T): IHttpResponse<T> {
    return { statusCode: 201, body: data };
  }

  public static noContent(): IHttpResponse {
    return { statusCode: 204, body: null };
  }

  public static badRequest(props?: BadRequestProps): IHttpResponse {
    const error = props?.message ?? 'Bad Request';
    const params = props?.params ? { params: props.params } : {};
    return { statusCode: 400, body: { error, ...params } };
  }

  public static forbidden(props?: HttpErrorProps): IHttpResponse {
    const error = props?.message ?? 'Forbidden';
    return { statusCode: 403, body: { error } };
  }

  public static notFound(props?: HttpErrorProps): IHttpResponse {
    const error = props?.message ?? 'Not Found';
    return { statusCode: 404, body: { error } };
  }

  public static internalServerError(props?: HttpErrorProps): IHttpResponse {
    const error = props?.message ?? 'Internal Server Error';
    return { statusCode: 500, body: { error } };
  }
}
