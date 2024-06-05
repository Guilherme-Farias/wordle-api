export class WordDateAlreadyExistisError extends Error {
  constructor() {
    super('Já existe uma palavra para data selecionada');
  }
}
