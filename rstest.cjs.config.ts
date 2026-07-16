import { defineConfig } from '@rstest/core';
import { fileURLToPath } from 'node:url';

const cjsEntry = fileURLToPath(new URL('./dist/index.cjs', import.meta.url));

export default defineConfig({
  testEnvironment: 'jsdom',
  setupFiles: ['./rstest.setup.ts'],
  resolve: {
    alias: {
      'rstest-canvas-mock': cjsEntry,
    },
  },
  output: {
    module: false,
    bundleDependencies: false,
    externals: [cjsEntry],
  },
});
