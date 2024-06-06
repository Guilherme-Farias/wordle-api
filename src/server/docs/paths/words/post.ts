import { OpenAPIV3 } from 'openapi-types';

export const post: OpenAPIV3.OperationObject = {
  tags: ['Words'],
  summary: 'Add a new word to the game',
  description: 'This operation allows adding a new secret word to the game.',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addWord',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Word added successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/word',
          },
        },
      },
    },
    400: {
      $ref: '#/components/badRequest',
    },
    403: {
      $ref: '#/components/forbidden',
    },
    500: {
      $ref: '#/components/internalServerError',
    },
  },
};
