import type { ZodIssue } from 'zod';

import { IParamErrors } from '@/shared/protocols';

export function getFieldErrors(zodErrors: ZodIssue[]): IParamErrors {
  const errors: IParamErrors = {};

  zodErrors.forEach((error) => {
    errors[error.path.join('.')] = error.message;
  });

  return errors;
}
