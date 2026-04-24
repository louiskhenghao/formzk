# @formzk/mui

`@formzk/mui` was created to bridge the gap between headless form management and Material-UI's rich component library. While `@formzk/core` provides the foundation for flexible form logic, developers often need to invest additional effort to integrate UI components. `@formzk/mui` addresses this by offering a set of ready-to-use, pre-configured Material-UI components that work seamlessly with the core architecture. This reduces the overhead of setting up forms and ensures that developers can leverage the full potential of Material-UI with the powerful form handling capabilities of `@formzk/core`.

Full documentation: **https://louiskhenghao.github.io/formzk/**

---

# Table of contents

- [Compatibility](#compatibility)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Accessing Components](#accessing-components)
  - [Native Components](#native-components)
  - [Material-UI Components](#material-ui-components)
- [Using Formzk.MUI.Form](#using-formzkmuiform)
- [Custom Layout](#custom-layout)
- [Available Components](#available-components)
  - [Input Components](#input-components)
  - [Other Components](#other-components)
- [Snippets](#snippets)

---

## Compatibility

| Peer                          | Supported range |
| ----------------------------- | --------------- |
| React                         | `>= 18`         |
| react-hook-form               | `>= 7.40`       |
| @formzk/core                  | `>= 1.0`        |
| @mui/material                 | `>= 5 <10` (MUI v5, v6, v7, v8, v9) |
| @emotion/react, @emotion/styled | `>= 11.11`    |
| Node.js (tooling)             | `>= 18`         |

> `GridRenderView` uses MUI v6+'s `size` prop internally but keeps a backwards-compatible `xs/sm/md/lg/xl` sugar for consumers still on the v5-style API.

---

## Installation

```bash
yarn add @formzk/core @formzk/mui react-hook-form @mui/material @emotion/react @emotion/styled
# or
npm install @formzk/core @formzk/mui react-hook-form @mui/material @emotion/react @emotion/styled

# install yup validation (optional)
yarn add yup @hookform/resolvers
# or
npm install yup @hookform/resolvers
```

---

## Getting Started

`@formzk/mui` allows developers to seamlessly utilize both the native components from `@formzk/core` and a robust toolkit for creating and managing forms with Material-UI's component library.

To begin using `@formzk/mui`, ensure that you have `@formzk/core` set up in your project. If you need guidance on the initial setup, please refer to the `@formzk/core` [documentation](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#getting-started).

---

## Accessing Components

### Native Components

With the `@formzk/mui` package, you can still access the native components provided by `@formzk/core` without importing the core package separately. Just use the `Formzk.Native` namespace to access them:

| Namespace              | Reference                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Formzk.Native.Provider | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkprovider) |
| Formzk.Native.Form     | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkform)     |
| Formzk.Native.Input    | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkinput)    |
| Formzk.Native.Submit   | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzksubmit)   |
| Formzk.Native.Reset    | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkreset)    |
| Formzk.Native.Errors   | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkerrors)   |

### Material-UI Components

To access the enhanced Material-UI components, use the `Formzk.MUI` namespace:

| Namespace           | Reference                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| Formzk.MUI.Provider | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkprovider)     |
| Formzk.MUI.Form     | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/Form/README.md)       |
| Formzk.MUI.Item     | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/FormItem/README.md)   |
| Formzk.MUI.Submit   | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/FormSubmit/README.md) |
| Formzk.MUI.Reset    | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/FormReset/README.md)  |
| Formzk.MUI.Errors   | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/FormErrors/README.md) |

---

## Using Formzk.MUI.Form

`Formzk.MUI.Form` works similarly to `Formzk.Native.Form` (from `@formzk/core`) but includes additional functionality for layout rendering. It allows developers to define the form layout using a `config` prop that accepts a multi-dimensional array. Each sub-array represents a row, and each object within a sub-array represents a column.

Example:

```tsx
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Box } from '@mui/material';

type InputPayload = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(8, 'Minimum length is 8 characters'),
});

<Formzk.MUI.Form<InputPayload>
  name="login-form"
  options={{
    resolver: yupResolver(schema),
    defaultValues: { email: 'xxxx@xyz.com', password: '' },
  }}
  onSubmit={(values) => {
    console.log('Submit values: ', values);
  }}
  config={[
    [
      {
        name: 'email',
        label: 'Email Address',
        component: 'TextField',
        props: { required: true, placeholder: 'Email Address' },
      },
      {
        name: 'password',
        label: 'Password',
        component: 'TextField',
        props: { type: 'password', placeholder: 'Password' },
      },
    ],
    [
      { content: <Box>Render custom view</Box> },
      { content: () => <Box>Render custom view with render function</Box> },
    ],
  ]}
>
  <Formzk.Native.Submit
    render={(e, { formState: { isSubmitting } }) => (
      <Button disabled={isSubmitting} type="submit">Submit</Button>
    )}
  />
  <Formzk.Native.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
  <Formzk.MUI.Submit text="Login" />
  <Formzk.MUI.Reset text="Clear" />
</Formzk.MUI.Form>;
```

### Controlling column width

Use the `configLayoutProps` [property](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/Form/README.md?plain=1#L56) for workspace-wide defaults, or the `layoutProps` [property](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/Form/README.md?plain=1#L34) on each config item to override per-column.

**Both the legacy MUI v5 `xs/sm/md/lg/xl` shorthand AND the MUI v6+ `size` prop are accepted** — internally they're normalized to `size={{ ... }}`.

```tsx
<Formzk.MUI.Form<InputPayload>
  configLayoutProps={{
    containerProps: { spacing: 1 },
    itemProps: { sm: 4, md: 4 }, // default per column (applies to all items)
  }}
  config={[
    [
      {
        name: 'email',
        label: 'Email Address',
        component: 'TextField',
        layoutProps: { sm: 4, md: 4 }, // legacy shorthand
      },
      {
        name: 'password',
        label: 'Password',
        component: 'TextField',
        layoutProps: { size: { sm: 8, md: 8 } }, // v6+ API (also supported)
      },
    ],
  ]}
/>
```

---

## Custom Layout

If you prefer to create your own layout without the `config` prop, you can structure your form in the traditional manner:

```tsx
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/material';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

<Formzk.MUI.Form
  name="login-form"
  options={{
    resolver: yupResolver(schema),
    defaultValues: { email: 'xxx@gmail.com', password: '', rememberMe: false },
  }}
  onSubmit={(values) => {
    console.log('Submit values: ', JSON.stringify(values, null, 2));
  }}
>
  <Formzk.MUI.Item
    name="email"
    label="Email Address"
    component="TextField"
    labelType="InputLabel"
    props={{ required: true, placeholder: 'Email Address' }}
  />

  <Formzk.MUI.Item
    name="password"
    label="Password"
    component="TextField"
    labelType="InputLabel"
    props={{ type: 'password', placeholder: 'Password' }}
  />

  <Formzk.MUI.Item
    name="rememberMe"
    valueKey="checked"
    component="Checkbox"
    label="Remember me?"
  />

  <Formzk.MUI.Reset text="Clear" />
  <Formzk.MUI.Submit text="Login" />
</Formzk.MUI.Form>;
```

In this example, the form components are arranged manually without relying on configuration properties. This approach gives you free rein over layout.

---

## Available Components

`@formzk/mui` ships with several built-in input components tailored for form usage, plus two layout-view helpers. You can still register your own components on top of these.

### Input Components

The following input components are included and optimized for use with `@formzk/mui`:

- **Checkbox** — a standard checkbox input. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/Checkbox/README.md)
- **CheckboxGroup** — a group of checkboxes for selecting multiple options. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/CheckboxGroup/README.md) Accepts `string | number` option values.
- **RadioGroup** — a group of radio buttons for selecting one option. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/RadioGroup/README.md) Accepts `string | number` option values.
- **Switch** — a toggle switch input for binary choices. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/Switch/README.md)
- **Select** — a single-selection dropdown. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/Select/README.md) Accepts `string | number` option values.

Register them once at your app's entry point:

```tsx
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxProps,
  Formzk,
  RadioGroup,
  RadioGroupProps,
  Select,
  SelectProps,
  Switch,
  SwitchProps,
} from '@formzk/mui';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

<Formzk.Native.Provider
  config={[
    { name: 'TextField', component: OutlinedInput, props: { fullWidth: true } as OutlinedInputProps },
    { name: 'Checkbox', component: Checkbox, props: {} as CheckboxProps },
    { name: 'Switch', component: Switch, props: {} as SwitchProps },
    { name: 'RadioGroup', component: RadioGroup, props: {} as RadioGroupProps },
    { name: 'CheckboxGroup', component: CheckboxGroup, props: {} as CheckboxGroupProps },
    { name: 'Select', component: Select, props: {} as SelectProps },
  ]}
>
  {/* ... your component */}
</Formzk.Native.Provider>;
```

For module augmentation:

```ts
import { ComponentPropsMap as LibraryComponentPropsMap } from '@formzk/core';
import {
  CheckboxGroupProps,
  CheckboxProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
} from '@formzk/mui';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

declare module '@formzk/core' {
  export interface ComponentPropsMap extends LibraryComponentPropsMap {
    TextField: OutlinedInputProps;
    Checkbox: CheckboxProps;
    Switch: SwitchProps;
    RadioGroup: RadioGroupProps;
    CheckboxGroup: CheckboxGroupProps;
    Select: SelectProps;
  }
}
```

### Other Components

In addition to input components, the package includes layout helpers:

- **GridRenderView** — renders views in a grid layout. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/views/GridRenderView/README.md)

  ```tsx
  import { GridRenderView } from '@formzk/mui';

  // legacy shorthand (still supported)
  <GridRenderView
    items={[
      [
        { children: '1-1', xs: 12, sm: 'auto', md: 6 },
        { children: '1-2' },
        { children: '1-3' },
        { children: '1-4' },
      ],
      [{ children: '2-1' }, { children: '2-2' }],
    ]}
  />

  // v6+ size API
  <GridRenderView
    items={[
      [
        { children: '1-1', size: { xs: 12, md: 6 } },
        { children: '1-2', size: { xs: 12, md: 6 } },
      ],
      [{ children: '2-1' }, { children: '2-2' }],
    ]}
  />

  // with row wrapper props
  <GridRenderView
    items={[
      { items: [{ children: '1-1' }, { children: '1-2' }, { children: '1-3' }] },
      { items: [{ children: '2-1' }, { children: '2-2' }] },
    ]}
  />
  ```

- **StackRenderView** — renders views in a stack layout. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/views/StackRenderView/README.md)

  ```tsx
  import { StackRenderView } from '@formzk/mui';
  import Button from '@mui/material/Button';

  <StackRenderView
    direction="row"
    items={[
      { key: 'button-one', content: () => <Button>Button One</Button> },
      { key: 'button-two', content: () => <Button>Button Two</Button> },
    ]}
  />;
  ```

These view components help structure and organize your form layouts effectively, providing flexibility in design.

---

### Snippets

Below are some code snippets demonstrating how to utilize the registered input components within the package:

1. With `Formzk.MUI.Item`:

```tsx
// usage of `RadioGroup` component
<Formzk.MUI.Item
  name="selection"
  component="RadioGroup"
  label="Single Selection"
  props={{
    options: [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 },
      { label: 'Four', value: 4 },
    ],
  }}
/>

// usage of `CheckboxGroup` component
<Formzk.MUI.Item
  name="multiSelection"
  component="CheckboxGroup"
  label="Multi options"
  props={{
    options: [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 },
      { label: 'Four', value: 4 },
    ],
  }}
/>

// usage of `Switch` component
<Formzk.MUI.Item
  name="enabled"
  component="Switch"
  valueKey="checked"
  layout="contained"
  label="Enable Something"
/>

// usage of `Checkbox` component
<Formzk.MUI.Item
  name="rememberMe"
  component="Checkbox"
  valueKey="checked"
  layout="contained"
  label="Remember me?"
  caption="Please check if you want"
/>

// usage of `Select` component (mixed string | number values are supported)
<Formzk.MUI.Item
  name="select"
  label="Select Example"
  component="Select"
  props={{
    options: [
      { label: 'One', value: 1, disabled: true },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 },
      { label: 'One-str', value: '1-str' },
      { label: 'Two-str', value: '2-str' },
    ],
  }}
/>
```

2. With `Formzk.MUI.Form` `config` props:

```tsx
<Formzk.MUI.Form
  config={[
    // first row
    [
      // usage of `CheckboxGroup`
      {
        label: 'Multi Selection',
        name: 'multiSelection',
        component: 'CheckboxGroup',
        props: {
          options: [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
            { label: 'Four', value: 4 },
          ],
        },
      },
      // usage of `RadioGroup`
      {
        label: 'Single Options',
        name: 'selection',
        component: 'RadioGroup',
        props: {
          options: [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
            { label: 'Four', value: 4 },
          ],
        },
      },
    ],
    // second row
    [
      // usage of `Switch`
      {
        name: 'enabled',
        label: 'Enable Action',
        component: 'Switch',
        valueKey: 'checked',
        layout: 'contained',
      },
      // usage of `Checkbox`
      {
        name: 'checked',
        component: 'Checkbox',
        valueKey: 'checked',
        label: 'Checkbox to check',
        layout: 'contained',
      },
      // usage of `Select`
      {
        label: 'Select Example',
        name: 'select',
        component: 'Select',
        props: {
          options: [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
            { label: 'One-str', value: '1-str' },
            { label: 'Two-str', value: '2-str' },
          ],
        },
      },
    ],
  ]}
/>
```
