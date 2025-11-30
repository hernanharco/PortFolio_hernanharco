import CJS_COMPAT_NODE_URL_4t0754alsh from 'node:url';
import CJS_COMPAT_NODE_PATH_4t0754alsh from 'node:path';
import CJS_COMPAT_NODE_MODULE_4t0754alsh from "node:module";

var __filename = CJS_COMPAT_NODE_URL_4t0754alsh.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_4t0754alsh.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_4t0754alsh.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  compile
} from "./_node-chunks/chunk-DDMYYDGQ.js";
import "./_node-chunks/chunk-NRCTQI7I.js";
import "./_node-chunks/chunk-HF6ZJVDF.js";
import {
  __name
} from "./_node-chunks/chunk-7AQLU7TL.js";

// src/mdx-loader.ts
var DEFAULT_RENDERER = `
import React from 'react';
`;
async function loader(content) {
  const callback = this.async();
  const options = { ...this.getOptions(), filepath: this.resourcePath };
  try {
    const result = await compile(content, options);
    const code = `${DEFAULT_RENDERER}
${result}`;
    return callback(null, code);
  } catch (err) {
    console.error("Error loading:", this.resourcePath);
    return callback(err);
  }
}
__name(loader, "loader");
var mdx_loader_default = loader;
export {
  mdx_loader_default as default
};
