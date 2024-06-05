import { z } from 'zod';

export const fieldErrors = z.object({
  word: z
    .string({ message: 'Deve ser um texto válido' })
    .length(5, { message: 'Deve conter 5 letras' }),
  date: z
    .string({ message: 'Deve ser uma data válida' })
    .datetime({ message: 'Deve ser uma data válida' }),
});
