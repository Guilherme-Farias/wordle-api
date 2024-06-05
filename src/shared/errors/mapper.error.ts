export class MapperError extends Error {
  constructor() {
    super('Ocorreram uma ou mais inconsistências nos dados de entrada');
  }
}
