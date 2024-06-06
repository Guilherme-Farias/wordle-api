import { OpenAPIV3 } from 'openapi-types';

export const internalServerError: OpenAPIV3.ResponseObject = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
