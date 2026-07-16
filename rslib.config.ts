import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
      shims: {
        esm: {
          require: true,
        },
      },
      output: {
        externals: {
          'jest-canvas-mock/lib/window.js':
            'commonjs jest-canvas-mock/lib/window.js',
        },
      },
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
    },
  ],
});
