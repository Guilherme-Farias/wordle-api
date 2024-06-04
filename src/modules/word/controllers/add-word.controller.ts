import { Word } from '../models';

export namespace AddWordControllerAPI {
  export type Request = {
    word: string;
    date: string;
  };
  export type Response = {
    word: Word;
  };
}
