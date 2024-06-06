import { OpenAPIV3 } from 'openapi-types';

export const error: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
  required: ['error'],
};
