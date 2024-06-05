import { IParamErrors } from '../protocols';

type ValidationErrorProps = {
  params: IParamErrors;
  message?: string;
};

export class ValidationError extends Error {
  readonly params: IParamErrors;

  constructor({
    params,
    message = 'Ocorreram um ou mais erros de validação.',
  }: ValidationErrorProps) {
    super(message);
    this.params = params;
  }
}
