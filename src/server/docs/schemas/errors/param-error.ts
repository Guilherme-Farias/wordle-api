import { OpenAPIV3 } from 'openapi-types';

export const paramError: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    field: { type: 'string' },
  },
};
