/**
 * Rollup override for @formzk/mui. Extends the default @nx/react bundle
 * config to rename the ESM output to `.esm.mjs` so Node correctly identifies
 * it as ES module at resolution time (without emitting
 * MODULE_TYPELESS_PACKAGE_JSON warnings).
 */
const nxReactRollup = require('@nx/react/plugins/bundle-rollup');

module.exports = (config) => {
  const next = nxReactRollup(config);
  const remap = (out) => {
    if (out.format === 'es' || out.format === 'esm') {
      if (out.file) out.file = out.file.replace(/\.esm\.js$/, '.esm.mjs');
      if (out.entryFileNames) {
        out.entryFileNames = String(out.entryFileNames).replace(
          /\.esm\.js$/,
          '.esm.mjs'
        );
      }
    }
    return out;
  };
  if (Array.isArray(next.output)) {
    next.output = next.output.map(remap);
  } else if (next.output) {
    next.output = remap(next.output);
  }
  return next;
};
