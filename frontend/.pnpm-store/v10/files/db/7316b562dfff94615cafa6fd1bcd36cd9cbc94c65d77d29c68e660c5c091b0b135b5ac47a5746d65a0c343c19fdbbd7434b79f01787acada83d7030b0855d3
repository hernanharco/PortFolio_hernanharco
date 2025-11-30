import CJS_COMPAT_NODE_URL_n7xewhgh6ep from 'node:url';
import CJS_COMPAT_NODE_PATH_n7xewhgh6ep from 'node:path';
import CJS_COMPAT_NODE_MODULE_n7xewhgh6ep from "node:module";

var __filename = CJS_COMPAT_NODE_URL_n7xewhgh6ep.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_n7xewhgh6ep.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_n7xewhgh6ep.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  rewriteSbMockImportCalls
} from "../../../../_node-chunks/chunk-BNNW3RUO.js";
import "../../../../_node-chunks/chunk-Q5A4LYDI.js";
import {
  __name
} from "../../../../_node-chunks/chunk-M7JK3PHD.js";

// src/core-server/presets/webpack/loaders/storybook-mock-transform-loader.ts
import { logger } from "storybook/internal/node-logger";
var storybookMockTransformLoader = /* @__PURE__ */ __name(function mockTransformLoaderFn(source, sourceMap, meta) {
  const callback = this.async();
  try {
    const result = rewriteSbMockImportCalls(source);
    callback(null, result.code, result.map || void 0, meta);
  } catch (error) {
    const filePath = this.resourcePath;
    logger.debug(`Could not transform sb.mock(import(...)) calls in ${filePath}: ${error}`);
    callback(null, source, sourceMap, meta);
  }
}, "mockTransformLoaderFn");
var storybook_mock_transform_loader_default = storybookMockTransformLoader;
export {
  storybook_mock_transform_loader_default as default
};
