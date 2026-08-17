# Adapter package anatomy (modeled on libs/mui)

File-by-file map of `libs/mui/` — replicate this structure for a new `libs/<kit>/`. `libs/tamagui/` mirrors it 1:1 and is the newest instance; diff both when in doubt.

## Top level

```
libs/<kit>/
├── CHANGELOG.md          # created by nx release — do not hand-edit
├── README.md             # package docs (compatibility, install, namespaces, registration, usage)
├── package.json          # publishable manifest (below)
├── project.json          # nx targets (below)
├── rollup.config.cjs     # copy from libs/mui, usually unchanged
├── tsconfig.json
├── tsconfig.lib.json
└── src/
    ├── index.ts
    ├── core/
    │   ├── Form/       {index.tsx, inner.tsx, props.ts, README.md}
    │   ├── FormItem/   {index.tsx, props.ts, README.md}
    │   ├── FormSubmit/ {index.tsx, props.ts, README.md}
    │   ├── FormReset/  {index.tsx, props.ts, README.md}
    │   └── FormErrors/ {index.tsx, props.ts, README.md}
    ├── components/
    │   ├── Checkbox/       {index.tsx, props.ts, README.md}
    │   ├── CheckboxGroup/  {...}
    │   ├── RadioGroup/     {...}
    │   ├── Switch/         {...}
    │   └── Select/         {...}
    └── views/
        ├── GridRenderView/  {index.tsx, props.ts, README.md}
        └── StackRenderView/ {index.tsx, props.ts, README.md}
```

## package.json (shape from libs/mui/package.json)

```jsonc
{
  "name": "@formzk/<kit>",
  "version": "0.1.0",            // never bump manually — nx release does it
  "license": "MIT",
  "description": "...",
  "author": "...", "homepage": "...", "bugs": { ... },
  "repository": { "type": "git", "url": "https://github.com/louiskhenghao/formzk.git", "directory": "libs/<kit>" },
  "keywords": ["forms", "react", "<kit>", "react-hook-form", ...],
  "sideEffects": false,
  "engines": { "node": ">=18" },
  "exports": {
    ".": { "types": "./index.d.ts", "import": "./index.esm.mjs", "require": "./index.cjs.js" },
    "./package.json": "./package.json"
  },
  "dependencies": { "lodash": "^4.17.21", "tslib": "^2.3.0" },
  "peerDependencies": {
    "@formzk/core": ">=1.0.0",
    "react": ">=18",
    "react-hook-form": ">=7.40.0",
    "<ui-kit>": "<supported range>"   // e.g. "@mui/material": ">=5 <10"
  }
}
```

## project.json (targets from libs/mui/project.json)

```jsonc
{
  "name": "<kit>",
  "sourceRoot": "libs/<kit>/src",
  "projectType": "library",
  "targets": {
    "lint": { "executor": "@nx/eslint:lint", "outputs": ["{options.outputFile}"] },
    "nx-release-publish": {
      "executor": "@nx/js:release-publish",
      "dependsOn": ["build"],
      "options": { "packageRoot": "dist/libs/<kit>" }
    },
    "build": {
      "executor": "@nx/rollup:rollup",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/libs/<kit>",
        "tsConfig": "libs/<kit>/tsconfig.lib.json",
        "project": "libs/<kit>/package.json",
        "entryFile": "libs/<kit>/src/index.ts",
        "format": ["cjs", "esm"],
        "external": [
          "@formzk/core", "<ui-kit>", "react", "react-hook-form",
          "lodash", "lodash/map.js", "lodash/filter.js", "lodash/some.js",
          "lodash/toString.js", "lodash/isEmpty.js", "lodash/isNil.js"
        ],
        "rollupConfig": "libs/<kit>/rollup.config.cjs",
        "compiler": "babel",
        "assets": [{ "glob": "libs/<kit>/README.md", "input": ".", "output": "." }]
      }
    }
  }
}
```

Also: if the new package's `publishConfig` needs public access (scoped package), copy `libs/tamagui/package.json`'s `"publishConfig": { "access": "public" }`.

## src/index.ts pattern (from libs/mui/src/index.ts)

```ts
import {
  FormzkProvider, FormzkFormContext, FormzkForm, FormzkFormInput,
  FormzkFormSubmit, FormzkFormReset, FormzkFormErrors,
} from '@formzk/core';
import { FormzkForm<Kit> } from './core/Form';
import { FormzkFormItem<Kit> } from './core/FormItem';
// ... Submit/Reset/Errors

export const Formzk = {
  Native: {
    Provider: FormzkProvider, FormContext: FormzkFormContext, Form: FormzkForm,
    Input: FormzkFormInput, Submit: FormzkFormSubmit, Reset: FormzkFormReset, Errors: FormzkFormErrors,
  },
  <Kit>: {
    Provider: FormzkProvider,           // alias — same provider
    Form: FormzkForm<Kit>, Item: FormzkFormItem<Kit>,
    Submit: ..., Reset: ..., Errors: ...,
  },
};

export { useFormzk, useFormzkForm } from '@formzk/core';
export * from './components/Checkbox';   // component + Props type, for every component
export * from './core/Form';             // etc.
export * from './views/GridRenderView';
export * from './views/StackRenderView';
```

## Component conventions

- Controlled only: `value` + `onChange(next)`; booleans `checked` + `onChange(boolean)`.
- `options: { label: ReactNode; value: string | number; disabled?: boolean }[]` for Select/RadioGroup/CheckboxGroup; CheckboxGroup value is `(string | number)[]`.
- Each `props.ts` exports the `XxxProps` type; each folder README documents props with a table.
- FormItem `layout` modes: `wrapped` (default; kit's form-control wrapper, label above, helper below), `normal` (clone label/error into the component), `contained` (plain container + helper), `none`. Provide escape-hatch props for each wrapper element plus its own `render`.
- Submit button: kit button with `type="submit"`, disabled on `isLoading || isSubmitting || isValidating`, `text?: ReactNode` prop.

## Release wiring recap

1. `nx.json` → `"release": { "projects": [..., "<kit>"] }` (independent versioning, tag `<kit>@{version}`).
2. `.github/workflows/release-<kit>.yml` — copy `release-mui.yml`, replace the project/scope.
3. First publish after merge: `npx nx release --projects=<kit> --first-release`.
