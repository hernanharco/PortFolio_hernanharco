#!/usr/bin/env node
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
  versions_default
} from "../_node-chunks/chunk-YFJZFOCY.js";
import {
  resolvePackageDir
} from "../_node-chunks/chunk-VOOIMEQA.js";
import {
  join
} from "../_node-chunks/chunk-Q5A4LYDI.js";
import {
  require_dist
} from "../_node-chunks/chunk-E3ZVPOWE.js";
import {
  __name,
  __toESM
} from "../_node-chunks/chunk-M7JK3PHD.js";

// src/bin/dispatcher.ts
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import { logger } from "storybook/internal/node-logger";
var import_ts_dedent = __toESM(require_dist(), 1);
var [majorNodeVersion, minorNodeVersion] = process.versions.node.split(".").map(Number);
if (majorNodeVersion < 20 || majorNodeVersion === 20 && minorNodeVersion < 19 || majorNodeVersion === 22 && minorNodeVersion < 12) {
  logger.error(
    import_ts_dedent.dedent`To run Storybook, you need Node.js version 20.19+ or 22.12+.
    You are currently running Node.js ${process.version}. Please upgrade your Node.js installation.`
  );
  process.exit(1);
}
async function run() {
  const args = process.argv.slice(2);
  if (["dev", "build", "index"].includes(args[0])) {
    const coreBin = pathToFileURL(join(resolvePackageDir("storybook"), "dist/bin/core.js")).href;
    await import(coreBin);
    return;
  }
  const targetCli = args[0] === "init" ? {
    pkg: "create-storybook",
    args: args.slice(1)
  } : {
    pkg: "@storybook/cli",
    args
  };
  let command;
  try {
    const { default: targetCliPackageJson } = await import(`${targetCli.pkg}/package.json`, {
      with: { type: "json" }
    });
    if (targetCliPackageJson.version === versions_default[targetCli.pkg]) {
      command = [
        "node",
        `"${join(resolvePackageDir(targetCli.pkg), "dist/bin/index.js")}"`,
        ...targetCli.args
      ];
    }
  } catch (e) {
  }
  command ??= ["npx", "--yes", `${targetCli.pkg}@${versions_default[targetCli.pkg]}`, ...targetCli.args];
  const child = spawn(command[0], command.slice(1), { stdio: "inherit", shell: true });
  child.on("exit", (code) => {
    process.exit(code);
  });
}
__name(run, "run");
run();
