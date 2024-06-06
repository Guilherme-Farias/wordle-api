import { OpenAPIV3 } from 'openapi-types';

import { post } from './post';

export const word: OpenAPIV3.PathsObject = {
  '/words': { post },
};
