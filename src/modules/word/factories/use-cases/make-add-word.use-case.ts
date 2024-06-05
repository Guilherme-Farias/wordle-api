import { PrismaWordRepository } from '../../repositories';
import { AddWordUseCase } from '../../use-cases';

export const makeAddWordUseCase = () => {
  const repository = new PrismaWordRepository();
  return new AddWordUseCase(repository);
};
