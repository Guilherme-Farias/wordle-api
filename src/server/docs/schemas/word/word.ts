import { OpenAPIV3 } from 'openapi-types';

export const word: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    word: {
      type: 'string',
      example: 'guess',
      description: 'The secret word to be guessed (must be 5 letters long).',
      minLength: 5,
      maxLength: 5,
    },
    date: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'word', 'date'],
};
