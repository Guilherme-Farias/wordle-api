import { Brand } from '@/shared/@types';

export type WordId = Brand<string, 'word_id'>;
export type WordString = Brand<string, 'word_string'>;

export type Word = {
  id: WordId;
  word: WordString;
  date: Date;
};
