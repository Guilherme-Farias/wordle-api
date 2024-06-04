/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUseCase<DTO = any, Response = any> {
  execute(dto: DTO): Response;
}
