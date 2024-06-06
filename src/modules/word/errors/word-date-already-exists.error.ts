export class WordDateAlreadyExistsError extends Error {
  constructor() {
    super('Já existe uma palavra para data selecionada');
  }
}
