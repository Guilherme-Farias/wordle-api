/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpResponse } from './http';

export interface IController<Request = any, Response = any> {
  handle(request: Request): Promise<IHttpResponse<Response>>;
}
