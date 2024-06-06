import { OpenAPIV3 } from 'openapi-types';

export const badRequest: OpenAPIV3.ResponseObject = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        allOf: [{ $ref: '#/schemas/error' }, { $ref: '#/schemas/paramError' }],
      },
    },
  },
};
