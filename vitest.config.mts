import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      include: ['src/**', '!src/**/index.ts', '!src/server/server.ts'],
    },
  },
});
