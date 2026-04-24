## 1.1.0 (2026-04-25)

### 🚀 Features

- **Types: `ComponentPropsOf<K>` helper.** Resolves to `any` when `ComponentPropsMap` has not
  been augmented via declaration merging, otherwise to the merged prop shape. Prevents JSX
  usage from collapsing to `never` for consumers that haven't set up the registry yet.  
  ([#4](https://github.com/louiskhenghao/formzk/pull/4))
- **Types: `ComponentName` helper.** Resolves to `keyof ComponentPropsMap` when augmented, or
  `string` when the map is empty. Routed through `FormzkContextType.getComponent` and  
  `isRegistered`, so `getComponent('Foo')` now type-checks in unaugmented projects.
  ([#4](https://github.com/louiskhenghao/formzk/pull/4))
- **Publishable dist is now installable + runnable.** `package.json` gains a proper `exports`
  map (`import` → `index.esm.mjs`, `require` → `index.cjs.js`, `types` → `index.d.ts`),  
  `peerDependencies` (`react >=18`, `react-hook-form >=7.40`), runtime `dependencies`
  (`lodash`, `tslib`), plus `sideEffects: false`, `engines.node >=18`, `repository`, and `bugs`
  metadata. ([#4](https://github.com/louiskhenghao/formzk/pull/4))
- **ESM bundle emitted as `.esm.mjs`.** Custom rollup config renames the ESM output so Node
  identifies it as ES module at resolution time — no more `MODULE_TYPELESS_PACKAGE_JSON`  
  warnings on import. ([#4](https://github.com/louiskhenghao/formzk/pull/4))

### 🩹 Fixes

- **`listComponents()` return type.** Corrected from `ComponentPropsMap[]` (wrong) to  
  `ComponentConfig<keyof ComponentPropsMap>[]`. No runtime change — the returned array was
  always the right shape, only the type was off.  
  ([#4](https://github.com/louiskhenghao/formzk/pull/4))
- **`ComponentPropsMap` not collapsing to `never`.** When consumers skip the `declare module
'@formzk/core'` augmentation step, `component` / `props` slots now fall back to `any` instead
  of `never`, so `<Formzk.Input component="Foo" />` and `getComponent('Foo')` work without
  declaration merging. Extends the fix from  
  [#3](https://github.com/louiskhenghao/formzk/pull/3).  
  ([#4](https://github.com/louiskhenghao/formzk/pull/4))
- **Strict Node ESM resolution for `lodash`.** All internal `import find from 'lodash/find'`
  statements now use the explicit `.js` extension (`'lodash/find.js'`) so they resolve under  
  Node's strict ESM resolver — `lodash` has no `exports` map and Node 20+ requires extensions
  in that case. ([#4](https://github.com/louiskhenghao/formzk/pull/4))  


### 🔧 Internals

- Build: switched to a per-project rollup config (`libs/core/rollup.config.cjs`) that extends
  the Nx React rollup preset and renames the ESM output.
- Lint: ignore `tslib` in `@nx/dependency-checks` — it's used at runtime via TypeScript  
  `importHelpers`, not directly imported in source.

### ❤️ Thank You

- Louis Loo @louiskhenghao
