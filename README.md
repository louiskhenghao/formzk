# formzk

[![@formzk/core on npm](https://img.shields.io/npm/v/@formzk/core.svg?label=%40formzk%2Fcore)](https://www.npmjs.com/package/@formzk/core)
[![@formzk/mui on npm](https://img.shields.io/npm/v/@formzk/mui.svg?label=%40formzk%2Fmui)](https://www.npmjs.com/package/@formzk/mui)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A headless React form library built on top of [react-hook-form](https://react-hook-form.com/), with **swappable UI adapters**. Declare your form once and render it through any UI stack — native HTML, Material UI, or your own component set.

> **Documentation:** **https://louiskhenghao.github.io/formzk/**

## Why formzk?

- **Headless core, swappable adapters** — `@formzk/core` owns form state, validation, and a component registry. UI adapters plug in on top.
- **Strongly typed** — augment `ComponentPropsMap` once via declaration merging and every `<Formzk.Input component="..." />` gets autocomplete and prop type-safety.
- **Layer-thin** — the core is a declarative wrapper around `useForm` / `Controller`, no hidden state.
- **Config-driven layout** — the MUI adapter lets you describe an entire form (rows, columns, fields) as a single config array.

---

## Packages

| Package | Version | Description |
| ------- | ------- | ----------- |
| [`@formzk/core`](./libs/core/README.md) | [![npm](https://img.shields.io/npm/v/@formzk/core.svg)](https://www.npmjs.com/package/@formzk/core) | Headless form state, validation, and component registry. |
| [`@formzk/mui`](./libs/mui/README.md) | [![npm](https://img.shields.io/npm/v/@formzk/mui.svg)](https://www.npmjs.com/package/@formzk/mui) | Material UI adapter — pre-wired inputs, layout helpers, error views. Supports MUI v5–v9. |
| `@formzk/tamagui` | — | Upcoming. |

---

## Install

```sh
# headless core
yarn add @formzk/core react-hook-form

# optional — Material UI adapter
yarn add @formzk/mui @mui/material @emotion/react @emotion/styled

# optional — yup validation
yarn add yup @hookform/resolvers
```

## Quick start

```tsx
import { Formzk } from '@formzk/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type LoginPayload = { email: string; password: string };

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export function LoginForm() {
  return (
    <Formzk.Form<LoginPayload>
      options={{ resolver: yupResolver(schema) }}
      onSubmit={(values) => console.log(values)}
    >
      <Formzk.Input name="email" component="MyTextField" />
      <Formzk.Input name="password" component="MyTextField" />
      <Formzk.Submit render={(submit) => <button onClick={submit}>Sign in</button>} />
    </Formzk.Form>
  );
}
```

You register the components referenced by `component="..."` once at your app entry — see [Registering components](https://louiskhenghao.github.io/formzk/docs/core/register-components).

---

## UI Builder

The docs site ships with an interactive **[UI Builder](https://louiskhenghao.github.io/formzk/docs/builder)** that lets you visually compose a form, preview it live in Sandpack, and copy or download the generated `App.tsx` straight into your project.

---

## Examples

Live runnable examples are on the docs site under [Examples](https://louiskhenghao.github.io/formzk/docs/examples/overview). The Next.js source for each is in [`apps/example`](./apps/example):

| Example | Source |
| ------- | ------ |
| Module augmentation setup | [`apps/example/index.d.ts`](./apps/example/index.d.ts) |
| `@formzk/core` basics | [`apps/example/src/pages/core.tsx`](./apps/example/src/pages/core.tsx) |
| `@formzk/mui` basics | [`apps/example/src/pages/mui.tsx`](./apps/example/src/pages/mui.tsx) |
| `@formzk/mui` with `config` layout | [`apps/example/src/pages/mui-config.tsx`](./apps/example/src/pages/mui-config.tsx) |
| Multi-step claim form | [`apps/example/src/pages/claim.tsx`](./apps/example/src/pages/claim.tsx) |
| Custom-component adapter | [`apps/example/src/pages/custom-components.tsx`](./apps/example/src/pages/custom-components.tsx) |
| Onboarding flow | [`apps/example/src/pages/onboarding.tsx`](./apps/example/src/pages/onboarding.tsx) |

Run the example app locally:

```sh
yarn install
yarn example:dev   # http://localhost:3333
```

---

## Contributing

PRs welcome — including new UI adapters (Tamagui, Mantine, Chakra, …). See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setup, commit conventions, and the checklist for adding a new adapter package.

## License

[MIT](./LICENSE) © Louis Loo
