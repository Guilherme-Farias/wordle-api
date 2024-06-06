import { OpenAPIV3 } from 'openapi-types';

import * as words from './words';
import * as wordsByDate from './words-by-date';

export default <OpenAPIV3.PathsObject>{
  '/words': words,
  '/words/{date}': wordsByDate,
};
