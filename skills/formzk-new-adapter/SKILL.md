---
name: formzk-new-adapter
description: Contribute a new @formzk/<kit> UI adapter package (e.g. Chakra, antd, shadcn, Mantine) to the formzk Nx monorepo. Use when working inside the formzk repo and the user wants to add, scaffold, or publish a new adapter library, or wants to upstream custom-registered formzk components as an official adapter. Not for using formzk in an app — that is the formzk-implement skill.
---

# Contribute a new formzk adapter package

An adapter wraps a UI kit's inputs to formzk's `value`/`onChange` contract and ships them with layout chrome (Form/Item/Submit/Reset/Errors) as `@formzk/<kit>`.

## Preflight

This skill only applies **inside the formzk monorepo**. Verify `nx.json` and `libs/core/` exist at the repo root. If not, tell the user to clone https://github.com/louiskhenghao/formzk first, and stop. Read `CONTRIBUTING.md` § "Adding a new adapter package" — it is the source of truth if anything below has drifted.

## Scaffold checklist (from CONTRIBUTING.md)

Using `<kit>` as the adapter name (lowercase, e.g. `chakra`):

1. Generate the library:
   ```bash
   npx nx g @nx/js:library <kit> --directory=libs/<kit> --publishable --importPath=@formzk/<kit>
   ```
2. Depend on `@formzk/core`: mark it `external` in the lib's rollup/build config (see `libs/mui/project.json` → `targets.build.options.external`, which also lists `react`, `react-hook-form`, the UI kit, `lodash` and its subpath imports).
3. `libs/<kit>/package.json`: `"version": "0.1.0"`, `"license": "MIT"` — copy the shape from `libs/mui/package.json` (exports map with `types`/`import`/`require`, `sideEffects: false`, `peerDependencies` for react, react-hook-form, `@formzk/core >=1.0.0`, and the UI kit's supported range).
4. Add `<kit>` to `nx.json` → `release.projects`.
5. Add an `nx-release-publish` target to `libs/<kit>/project.json` pointing at `dist/libs/<kit>` (copy from `libs/mui/project.json`).
6. Add `.github/workflows/release-<kit>.yml` (copy `release-mui.yml`, swap the scope).
7. Open a PR titled `feat(<kit>): initial @formzk/<kit> package`. After merge, publish with `npx nx release --projects=<kit> --first-release` (locally or via `workflow_dispatch`).

Rules: **never bump versions manually** (CI runs `nx release`); **no new runtime dependencies in `@formzk/core`** — it stays UI-agnostic; ensure `yarn build:libs` and `yarn example:build` pass before pushing.

## Adapter API contract

Mirror `libs/mui/` and `libs/tamagui/` (the newest, cleanest template) file-for-file — see `references/adapter-package-checklist.md` for the full anatomy. The essentials:

- `src/index.ts` exports the namespaced object:
  ```ts
  export const Formzk = {
    Native: { Provider, FormContext, Form, Input, Submit, Reset, Errors }, // re-exported from @formzk/core
    <Kit>:  { Provider, Form, Item, Submit, Reset, Errors },              // e.g. Chakra
  };
  export { useFormzk, useFormzkForm } from '@formzk/core';
  // plus named exports of every component and its Props type
  ```
- `core/Form` — thin wrapper over core's `Formzk.Form` adding a native `<form onSubmit={nativeSubmit}>` and a config-driven grid (`config` 2-D array: rows → columns; cells are Item specs or `{ content }`).
- `core/FormItem` — wraps core `Formzk.Input`'s `render` with `label` / `caption` and the four `layout` modes: `wrapped` (default), `normal`, `contained`, `none`.
- `core/FormSubmit` / `FormReset` — kit buttons (`text` prop + kit button props); submit disables while submitting/validating. `core/FormErrors` — themed error summary.
- `components/` — controlled `Checkbox`, `CheckboxGroup`, `RadioGroup`, `Switch`, `Select` following the `value`/`onChange` contract; booleans expose **`checked`**; option lists are `{ label, value, disabled? }[]` with `string | number` values; `CheckboxGroup` value is `(string | number)[]`.
- `views/GridRenderView` + `views/StackRenderView` — kit-native layout helpers used by `core/Form`.
- Registration stays **manual** (documented in the README) — adapters never auto-register.
- Every component folder gets its own `README.md`, linked from the package README (match `libs/mui`'s doc style).

## Docs & example obligations

- Package `README.md` modeled on `libs/mui/README.md` (compatibility table, installation, `Formzk.Native` vs `Formzk.<Kit>` namespaces, registration snippet, augmentation snippet, Form/Item usage).
- Docs site: add `apps/docs/docs/<kit>/overview.mdx` (and `grid-render-view.mdx` if applicable) plus a `@formzk/<kit>` category in `apps/docs/sidebars.ts`, following the existing mui/tamagui categories.
- Optionally add a showcase page to `apps/example`.

## Verify

1. `yarn build:libs` and `yarn example:build` pass.
2. `dist/libs/<kit>/package.json` has correct `exports`, peers, and version `0.1.0`.
3. In a scratch app (or apps/example), register the new components and run a form end-to-end: typecheck, submit, reset, error display.
4. PR follows repo conventions (small, focused, PR template, no manual version bumps).
