# @formzk/tamagui

`@formzk/tamagui` bridges the gap between headless form management and the [Tamagui](https://tamagui.dev) UI kit. While `@formzk/core` provides the foundation for flexible form logic, `@formzk/tamagui` offers a set of ready-to-use, pre-configured Tamagui components that work seamlessly with the core architecture — on the web **and** in React Native, from a single codebase.

Full documentation: **https://louiskhenghao.github.io/formzk/**

---

# Table of contents

- [Compatibility](#compatibility)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Accessing Components](#accessing-components)
  - [Native Components](#native-components)
  - [Tamagui Components](#tamagui-components)
- [Using Formzk.Tamagui.Form](#using-formzktamaguiform)
- [Custom Layout](#custom-layout)
- [Available Components](#available-components)
  - [Input Components](#input-components)
  - [Other Components](#other-components)

---

## Compatibility

| Peer              | Supported range          |
| ----------------- | ------------------------ |
| React             | `>= 18` (React 18 & 19)  |
| react-hook-form   | `>= 7.40`                |
| @formzk/core      | `>= 1.0`                 |
| tamagui           | `>= 1.100 < 3` (v1 & v2) |
| Node.js (tooling) | `>= 18`                  |

> Works with React 18 and 19, and with Tamagui v1 and v2. Note that Tamagui `2.x` itself requires React 19, while the `1.x` line also runs on React 18. All components are cross-platform — the same code renders on web (react-native-web) and native React Native.

---

## Installation

```bash
yarn add @formzk/core @formzk/tamagui react-hook-form tamagui
# or
npm install @formzk/core @formzk/tamagui react-hook-form tamagui

# install yup validation (optional)
yarn add yup @hookform/resolvers
# or
npm install yup @hookform/resolvers
```

Your app must be wrapped in a configured `TamaguiProvider` — see the [Tamagui installation guide](https://tamagui.dev/docs/intro/installation).

---

## Getting Started

To begin using `@formzk/tamagui`, ensure that you have `@formzk/core` set up in your project. If you need guidance on the initial setup, please refer to the `@formzk/core` [documentation](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#getting-started).

Register your input components once with the provider, then reference them by name everywhere:

```tsx
import { Formzk, Checkbox, Select, Switch } from '@formzk/tamagui';
import { Input, TextArea } from 'tamagui';

<Formzk.Tamagui.Provider
  config={[
    { name: 'Input', component: Input },
    { name: 'TextArea', component: TextArea },
    { name: 'Checkbox', component: Checkbox },
    { name: 'Select', component: Select },
    { name: 'Switch', component: Switch },
  ]}
>
  <App />
</Formzk.Tamagui.Provider>;
```

---

## Accessing Components

### Native Components

With the `@formzk/tamagui` package, you can still access the native components provided by `@formzk/core` without importing the core package separately. Just use the `Formzk.Native` namespace to access them:

| Namespace              | Reference                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Formzk.Native.Provider | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkprovider) |
| Formzk.Native.Form     | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkform)     |
| Formzk.Native.Input    | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkinput)    |
| Formzk.Native.Submit   | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzksubmit)   |
| Formzk.Native.Reset    | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkreset)    |
| Formzk.Native.Errors   | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkerrors)   |

### Tamagui Components

| Namespace               | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| Formzk.Tamagui.Provider | Same as `Formzk.Native.Provider`                            |
| Formzk.Tamagui.Form     | Config-driven form rendered on Tamagui's `Form` element     |
| Formzk.Tamagui.Item     | Form input with label / caption / error layouts             |
| Formzk.Tamagui.Submit   | Submit `Button` wired to the form context                   |
| Formzk.Tamagui.Reset    | Reset `Button` wired to the form context                    |
| Formzk.Tamagui.Errors   | Themed error summary (red card) fed from validation state   |

---

## Using Formzk.Tamagui.Form

Build an entire form from a config — each top-level array is a row, each entry a column:

```tsx
import { Formzk } from '@formzk/tamagui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Payload = { name: string; email: string; subscribe: boolean };

<Formzk.Tamagui.Form<Payload>
  options={{
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
      })
    ),
    defaultValues: { name: '', email: '', subscribe: false },
  }}
  config={[
    [
      { name: 'name', component: 'Input', label: 'Name' },
      { name: 'email', component: 'Input', label: 'Email' },
    ],
    [{ name: 'subscribe', component: 'Switch', label: 'Subscribe', layout: 'none' }],
    [{ content: <Formzk.Tamagui.Errors /> }],
    [
      { content: <Formzk.Tamagui.Reset />, layoutProps: { span: 1 } },
      { content: <Formzk.Tamagui.Submit />, layoutProps: { span: 2 } },
    ],
  ]}
  onSubmit={(values) => console.log(values)}
/>;
```

`layoutProps.span` is a flex weight: two items with span `2` and `1` split the row 2:1. To stack a row vertically on small screens, pass responsive props on the row, e.g. `configLayoutProps={{ containerProps: { flexDirection: 'column', $gtSm: { flexDirection: 'row' } } }}`.

---

## Custom Layout

Every input can also be placed manually with `Formzk.Tamagui.Item`:

```tsx
<Formzk.Tamagui.Form options={{ defaultValues: { name: '' } }} onSubmit={console.log}>
  <Formzk.Tamagui.Item
    name="name"
    component="Input"
    label="Name"
    caption="Your public display name"
    layout="wrapped"
  />
  <Formzk.Tamagui.Submit text="Save" />
</Formzk.Tamagui.Form>
```

`layout` options: `none`, `normal` (inject label/error into the component), `contained` (wrapped in `YStack` + helper text) and `wrapped` (label above, helper text below — the default).

---

## Available Components

### Input Components

Controlled Tamagui inputs that follow the `value`/`onChange` contract of the formzk component registry:

- [Checkbox](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/components/Checkbox/README.md)
- [CheckboxGroup](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/components/CheckboxGroup/README.md)
- [RadioGroup](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/components/RadioGroup/README.md)
- [Switch](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/components/Switch/README.md)
- [Select](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/components/Select/README.md)

> On native platforms Tamagui's `Select` needs an `Adapt`/`Sheet` setup to present its content; on web it works out of the box.

### Other Components

- [FormzkFormTamagui](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/core/Form/README.md)
- [FormzkFormItemTamagui](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/core/FormItem/README.md)
- [FormSubmitButton](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/core/FormSubmit/README.md)
- [FormResetButton](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/core/FormReset/README.md)
- [FormErrorsView](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/core/FormErrors/README.md)
- [GridRenderView](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/views/GridRenderView/README.md)
- [StackRenderView](https://github.com/louiskhenghao/formzk/blob/main/libs/tamagui/src/views/StackRenderView/README.md)
