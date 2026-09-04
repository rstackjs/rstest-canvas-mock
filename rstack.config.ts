// Configuration guide: https://rstack.rs/config
import { fileURLToPath } from 'node:url';
import { define } from 'rstack';

define.lib({
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

define.test(async () => {
  const { defineInlineProject } = await import('rstack/test');
  const cjsEntry = fileURLToPath(new URL('./dist/index.cjs', import.meta.url));

  return {
    projects: [
      defineInlineProject({
        name: 'esm',
        testEnvironment: 'jsdom',
        setupFiles: ['./rstest.setup.ts'],
      }),
      defineInlineProject({
        name: 'cjs',
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
      }),
    ],
  };
});

define.fmt({
  singleQuote: true,
  sortPackageJson: true,
});

define.staged({
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['rs lint', 'rs fmt'],
  '*.{json,md,mdx,css,scss,less,html,yml,yaml}': 'rs fmt',
});

define.lint(({ js, ts }) => [
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  {
    files: ['src/index.ts'],
    rules: {
      // jest-canvas-mock is untyped and must load after global.jest is initialized.
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
]);
