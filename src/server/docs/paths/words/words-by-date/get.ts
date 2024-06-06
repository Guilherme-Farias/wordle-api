import { OpenAPIV3 } from 'openapi-types';

export const get: OpenAPIV3.OperationObject = {
  tags: ['Word'],
  summary: 'Retrieves the daily word',
  description: 'Provides the word associated with the date.',
  parameters: [
    {
      in: 'path',
      name: 'date',
      description: 'The date for which the word is requested.',
      required: true,
      schema: {
        type: 'string',
        format: 'date',
      },
    },
  ],
  responses: {
    200: {
      description: 'Returns the word associated with the provided date.',
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
    404: {
      $ref: '#/components/notFound',
    },
    500: {
      $ref: '#/components/internalServerError',
    },
  },
};
