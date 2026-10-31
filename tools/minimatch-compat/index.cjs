/* eslint-disable @typescript-eslint/no-require-imports */
const core = require("minimatch-core");

// ESLint plugins need v3's callable export; newer consumers need named exports.
// All parsing and matching stays in the patched, unmodified upstream engine.
module.exports = Object.assign(core.minimatch, core, {
  // eslint-plugin-import only calls .test(); v11 deliberately removed RegExp
  // generation. Do not reintroduce the old recursive regex matching engine.
  makeRe(pattern, options) {
    const compiled = new core.Minimatch(pattern, options);
    return { test: value => compiled.match(value) };
  },
});
