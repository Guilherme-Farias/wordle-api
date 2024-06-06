import { OpenAPIV3 } from 'openapi-types';

import { components } from './components';
import { externalDocs } from './external-docs';
import { info } from './info';
import { paths } from './paths';
import { schemas } from './schemas';
import { tags } from './tags';

export default <OpenAPIV3.Document>{
  openapi: '3.0.0',
  info,
  tags,
  externalDocs,
  schemas,
  components,
  paths,
};
