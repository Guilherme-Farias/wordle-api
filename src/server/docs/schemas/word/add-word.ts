import { OpenAPIV3 } from 'openapi-types';

export const addWord: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    word: {
      type: 'string',
      example: 'guess',
      description: 'The secret word to be added (must be 5 letters long).',
      minLength: 5,
      maxLength: 5,
    },
    date: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['word', 'date'],
};
