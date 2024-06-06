import { Word } from '../models';

export namespace GetWordControllerAPI {
  export type Request = string;
  export type Response = Word;
}
