/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHttpResponse<Response = any> {
  statusCode: number;
  body: Response;
}
