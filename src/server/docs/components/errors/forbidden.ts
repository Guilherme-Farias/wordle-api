import { OpenAPIV3 } from 'openapi-types';

export const forbidden: OpenAPIV3.ResponseObject = {
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
