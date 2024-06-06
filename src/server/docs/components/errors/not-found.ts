import { OpenAPIV3 } from 'openapi-types';

export const notFound: OpenAPIV3.ResponseObject = {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
