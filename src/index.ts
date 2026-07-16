import { afterAll, rs } from '@rstest/core';

declare global {
  var jest: typeof rs | undefined;
}

// should works before 'jest-canvas-mock'
global.jest = rs;

afterAll(() => {
  delete global.jest;
  delete global.window.jest;
});

const { default: getCanvasWindow } = require('jest-canvas-mock/lib/window.js');

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap',
] as const;

const canvasWindow = getCanvasWindow({ document: window.document });

apis.forEach((api) => {
  global[api] = canvasWindow[api];
  global.window[api] = canvasWindow[api];
});
