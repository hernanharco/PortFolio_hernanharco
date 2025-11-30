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
  getAutomockCode
} from "../../../../_node-chunks/chunk-7UFF3UBM.js";
import {
  babelParser
} from "../../../../_node-chunks/chunk-BNNW3RUO.js";
import "../../../../_node-chunks/chunk-Q5A4LYDI.js";
import {
  __name
} from "../../../../_node-chunks/chunk-M7JK3PHD.js";

// src/core-server/presets/webpack/loaders/webpack-automock-loader.ts
function webpackAutomockLoader(source) {
  const options = this.getOptions();
  const isSpy = options.spy === "true";
  const mocked = getAutomockCode(source, isSpy, babelParser);
  return mocked.toString();
}
__name(webpackAutomockLoader, "webpackAutomockLoader");
export {
  webpackAutomockLoader as default
};
