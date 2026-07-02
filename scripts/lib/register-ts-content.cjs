/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const ts = require("typescript");

function registerTypescriptContent(root = path.resolve(__dirname, "../..")) {
  const originalResolveFilename = Module._resolveFilename;

  Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      return originalResolveFilename.call(this, path.join(root, "src", request.slice(2)), parent, isMain, options);
    }

    return originalResolveFilename.call(this, request, parent, isMain, options);
  };

  for (const extension of [".ts", ".tsx"]) {
    require.extensions[extension] = function compileTypescript(module, filename) {
      const source = fs.readFileSync(filename, "utf8");
      const output = ts.transpileModule(source, {
        compilerOptions: {
          esModuleInterop: true,
          jsx: ts.JsxEmit.ReactJSX,
          module: ts.ModuleKind.CommonJS,
          moduleResolution: ts.ModuleResolutionKind.NodeJs,
          target: ts.ScriptTarget.ES2020,
        },
        fileName: filename,
      });

      module._compile(output.outputText, filename);
    };
  }
}

module.exports = { registerTypescriptContent };
