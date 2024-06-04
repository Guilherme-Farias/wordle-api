import { describe, expect, it } from 'vitest';

import { env } from '@/env';

describe('env', () => {
  it('should be .env.test', () => {
    expect(env).toHaveProperty('NODE_ENV', 'test');
  });
});
