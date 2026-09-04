# rstest-canvas-mock

Mock canvas when running tests with rstest. Uses [jest-canvas-mock](https://github.com/hustcc/jest-canvas-mock).

## Install

```bash
npm install rstest-canvas-mock -D
```

## Usage

1. Create a new setup file that imports `rstest-canvas-mock` or add it to an existing setup file.

```ts
// rstest.setup.ts
import 'rstest-canvas-mock';
```

2. In your `rstest.config.ts` file, create a `setupFiles` array and add that file:

```ts
import { defineConfig } from '@rstest/core';

export default defineConfig({
  setupFiles: ['./rstest.setup.ts'],
  testEnvironment: 'jsdom',
});
```

## Mock Strategy

Reference [jest-canvas-mock#mock-strategy](https://github.com/hustcc/jest-canvas-mock#mock-strategy).

## Snapshots

Reference [jest-canvas-mock#snapshots](https://github.com/hustcc/jest-canvas-mock#snapshots)

## License

[MIT](./LICENSE).
