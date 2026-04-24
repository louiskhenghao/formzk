/**
 * Rollup override for @formzk/core. Extends the default @nx/react bundle
 * config to:
 *   1. Rename the ESM output to `.esm.mjs` so Node identifies it as ES
 *      module (no MODULE_TYPELESS_PACKAGE_JSON warnings).
 *   2. Force `output.interop = 'auto'` on the CJS output so default imports
 *      from CJS externals are unwrapped via `_interopDefault` at runtime.
 *      Rollup 4 defaults to `'default'` which skips the helper and produces
 *      a bundle that passes the whole module namespace object to React —
 *      which crashes with "Element type is invalid ... got: object".
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
    if (out.format === 'cjs') {
      out.interop = 'auto';
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
