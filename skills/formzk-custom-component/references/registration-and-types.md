# Registration and type augmentation patterns

Both patterns below are lifted from the formzk example app (`apps/example/index.d.ts` + `apps/example/src/pages/_app.tsx`), which registers 16+ names — MUI pre-wired, custom, and Tamagui — in one place.

## One provider at the app root

Register everything once at the entry point (Next.js `_app.tsx` / `app/layout.tsx` provider, Vite `main.tsx`, Expo root). With an adapter installed use `Formzk.Native.Provider` from the adapter; core-only apps use `Formzk.Provider` from `@formzk/core` — same component.

```tsx
import { Formzk } from '@formzk/mui'; // or: import { Formzk } from '@formzk/core'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

import {
  ChipsInput, ChipsInputProps,
  CurrencyInput, CurrencyInputProps,
  RatingInput, RatingInputProps,
} from '../components';

<Formzk.Native.Provider
  config={[
    // kit component registered under a generic name, with minimal safe defaults
    { name: 'TextField', component: OutlinedInput, props: { fullWidth: true } as OutlinedInputProps },
    // custom components — empty registry props so per-field props always apply
    { name: 'CurrencyInput', component: CurrencyInput, props: {} as CurrencyInputProps },
    { name: 'RatingInput', component: RatingInput, props: {} as RatingInputProps },
    { name: 'ChipsInput', component: ChipsInput, props: {} as ChipsInputProps },
  ]}
>
  <App />
</Formzk.Native.Provider>;
```

Notes:
- The `as XxxProps` casts on `props` give the config entries typing even before augmentation is in place.
- **Registry `props` override per-usage `props`** — only put values there that should be identical on every usage (e.g. `fullWidth: true`).
- One component can be registered under several names with different defaults (e.g. `MyTextField` small + `TextField` regular).

## The augmentation file

One `declare module` block for the whole app, keys exactly matching registered names:

```ts
// index.d.ts (or types/formzk.d.ts — anywhere tsconfig `include` covers)
import { ComponentPropsMap as LibraryComponentPropsMap } from '@formzk/core';
import { OutlinedInputProps } from '@mui/material';

import {
  ChipsInputProps,
  CurrencyInputProps,
  RatingInputProps,
} from './src/components';

declare module '@formzk/core' {
  export interface ComponentPropsMap extends LibraryComponentPropsMap {
    TextField: OutlinedInputProps;
    CurrencyInput: CurrencyInputProps;
    RatingInput: RatingInputProps;
    ChipsInput: ChipsInputProps;
  }
}
```

After this compiles, `component="..."` narrows to the union of registered names, and `props` on each usage typechecks against that component's props.

Troubleshooting:
- Augmentation not picked up → check the `.d.ts` is inside tsconfig `include` (or listed in `types`), and that the file has at least one top-level `import` (it must be a module, not a global script).
- `props` collapsing to `never`/`any` unexpectedly → key in `ComponentPropsMap` doesn't exactly match the `name` string in the provider config.
- Restart the TS server after adding the file.

## Using the registered components

```tsx
<Formzk.Form
  options={{ defaultValues: { amount: null, tags: [], score: null } }}
  onSubmit={(v) => console.log(v)}
>
  <Formzk.Input name="amount" component="CurrencyInput" props={{ currency: 'MYR', decimals: 2 }} />
  <Formzk.Input name="tags" component="ChipsInput" props={{ placeholder: 'Add tag, press Enter' }} />
  <Formzk.Input name="score" component="RatingInput" />
  <Formzk.Submit render={(submit) => <button onClick={submit}>Save</button>} />
</Formzk.Form>
```

With `@formzk/mui` / `@formzk/tamagui` installed, custom names also work inside `Formzk.MUI.Item` / `Formzk.Tamagui.Item` and the config-driven `Form` — you get label/caption/error layout for free:

```tsx
<Formzk.MUI.Item name="amount" label="Amount" component="CurrencyInput" props={{ currency: 'MYR' }} />
```
