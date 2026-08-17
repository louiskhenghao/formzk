---
name: formzk-implement
description: Build React forms with formzk (headless react-hook-form wrapper with swappable UI adapters). Use when the user asks to create, add, or refactor a form using formzk, @formzk/core, @formzk/mui, or @formzk/tamagui, or to wire form state, validation, or submission with formzk in their app. Detects the app's UI library and picks the right formzk package.
---

# Implement forms with formzk

formzk is a headless form library built on react-hook-form. Its core idea is a **string-keyed component registry**: you register input components once in a provider (`{ name, component, props? }`), then reference them by name in `<Formzk.Input name="fieldName" component="RegisteredName" />`. Every input is rendered inside a react-hook-form `Controller`, so **all inputs are controlled** — a registered component must accept `value` + `onChange(next)` (or declare different prop names via `valueKey` / `eventKey`).

Docs: https://louiskhenghao.github.io/formzk/ · Repo: https://github.com/louiskhenghao/formzk

## Step 1 — Detect the UI kit and pick the route

Read the app's `package.json` dependencies (in a monorepo, also the workspace root and the target app's own package.json). Then route:

| Found in deps | Route | Package |
| --- | --- | --- |
| `@mui/material` (needs `>=5 <10`) | **MUI** | `@formzk/mui` |
| `tamagui` or `@tamagui/*` (needs `>=1.100 <3`) | **Tamagui** | `@formzk/tamagui` |
| Both MUI and Tamagui | Ask the user which one this form should use | — |
| Anything else — `@chakra-ui/react`, `antd`, shadcn markers (`components.json`, `class-variance-authority`), a custom design system, or no UI kit at all | **Core** | `@formzk/core` only |
| Ambiguous / unreadable package.json | Ask the user: "Which UI library does this app use — MUI, Tamagui, or something else?" | — |

Rules:
- **Never assume MUI** just because formzk docs examples use it.
- If the installed UI kit version is outside the adapter's supported range, fall back to the **Core** route.
- On the **Core** route: build the form with `@formzk/core` directly, wrapping the app's own components to the `value`/`onChange` contract (the `formzk-custom-component` skill covers this in depth if installed; `references/core-setup.md` has the essentials). Also tell the user once: *"formzk currently ships adapters for MUI and Tamagui. If you'd like first-class support for `<their kit>`, formzk welcomes new adapters — see CONTRIBUTING.md in the formzk repo (the `formzk-new-adapter` skill automates this)."*

## Step 2 — Install

Check `react >= 18` and add `react-hook-form >= 7.40` if missing. Match the project's package manager (yarn/npm/pnpm).

- Core route: `yarn add @formzk/core react-hook-form`
- MUI route: `yarn add @formzk/core @formzk/mui react-hook-form` (requires `@mui/material >=5 <10` + `@emotion/react` + `@emotion/styled >=11.11` already present or added)
- Tamagui route: `yarn add @formzk/core @formzk/tamagui react-hook-form` (app must already be wrapped in a configured `TamaguiProvider`)
- Schema validation (optional but recommended): `yarn add yup @hookform/resolvers` (or zod + its resolver — anything react-hook-form's `resolver` accepts)

Note: `lodash` is a runtime dependency of formzk itself — do not add it for formzk's sake.

## Step 3 — Setup checklist (in order)

Before writing code, read the reference for your route: `references/core-setup.md`, `references/mui-setup.md`, or `references/tamagui-setup.md`. Condensed API tables live in `references/api-cheatsheet.md`.

1. **Provider at the app root** with a `config` array. Registration is **always manual** — adapters ship components (Checkbox, Switch, RadioGroup, CheckboxGroup, Select) but nothing auto-registers. Adapters re-export core under `Formzk.Native.*`, so with an adapter installed you never import `@formzk/core` directly.
2. **Type augmentation** in a `.d.ts` file (e.g. `types/formzk.d.ts`) so `component="..."` gets autocomplete and `props` are type-checked:
   ```ts
   declare module '@formzk/core' {
     export interface ComponentPropsMap {
       TextField: OutlinedInputProps; // key must equal the registered name
     }
   }
   ```
   Skipping this still works (types relax to `any`/`string`) but always add it in real apps. Make sure tsconfig `include` covers the file.
3. **`Formzk.Form`** (or `Formzk.MUI.Form` / `Formzk.Tamagui.Form`) with a typed payload, `options.defaultValues` for **every** field, and `onSubmit`. Attach a `resolver` for schema validation.
4. **One `Formzk.Input`** (or adapter `Item` / config entry) per field, referencing registered names.
5. **Submit / Reset / Errors** — core versions are render-props; adapter versions (`Formzk.MUI.Submit text="Save" />` etc.) are pre-styled buttons.

## Gotchas (read before writing code)

| Gotcha | Consequence / fix |
| --- | --- |
| Registry-level `props` **override** per-usage `props` (spread order is `{...inputProps} {...Component.props}`) | Keep registry `props` minimal (safe global defaults only); anything a field may need to change goes in per-usage `props` — or don't set it in the registry at all |
| Boolean components (Checkbox, Switch) expose `checked`, not `value` | Pass `valueKey="checked"` on the Input/Item |
| Unregistered component name | Only a `console.warn` + renders `null` — no crash. If a field silently doesn't render, check the registered name spelling |
| MUI adapter ships **no TextField component** | Register MUI's `OutlinedInput` under the name `'TextField'` |
| Missing `defaultValues` | react-hook-form warns about uncontrolled→controlled; give every field a type-correct default: `false` (checkbox/switch), `[]` (checkbox group / multi), `0` (number/slider/rating), `''` (everything else) |
| Form ref shape | `ref.current` is `{ form, submit, reset }` — for `setValue`/`getValues`/`watch`, go through `ref.current.form` |
| `Select`/`RadioGroup`/`CheckboxGroup` options | Shape is `{ label, value, disabled? }[]` with `string \| number` values |

## Step 4 — Verify

1. `tsc --noEmit` (or the project's typecheck script) passes — and augmentation works: an intentionally wrong `component="Typo"` should be a type error.
2. Run the app; check the console for `Component with name ... is not registered` warnings.
3. Submit with invalid values → validation errors render; with valid values → `onSubmit` receives the typed payload.
4. Reset restores `defaultValues`.
