import { PrismaWordRepository } from '../../repositories';
import { GetWordByDateUseCase } from '../../use-cases';

export const makeGetWordByDateUseCase = () => {
  const repository = new PrismaWordRepository();
  return new GetWordByDateUseCase(repository);
};
