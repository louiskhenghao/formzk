# @formzk/mui

`@formzk/mui` was created to bridge the gap between headless form management and Material-UI's rich component library. While `@formzk/core` provides the foundation for flexible form logic, developers often need to invest additional effort to integrate UI components. `@formzk/mui` addresses this by offering a set of ready-to-use, pre-configured Material-UI components that work seamlessly with the core architecture. This reduces the overhead of setting up forms and ensures that developers can leverage the full potential of Material-UI with the powerful form handling capabilities of `@formzk/core`

---

# Table of contents

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

## Installation

```bash
yarn add @formzk/core @formzk/mui react-hook-form lodash @mui/material @mui/lab
# or
npm install @formzk/core @formzk/mui react-hook-form lodash @mui/material @mui/lab

# install yup validation (optional)
yarn add yup @hookform/resolvers
# or
npm install yup @hookform/resolvers
```

---

## Getting Started

`@formzk/mui` allows developer to seamlessly utilize both the native components from `@formzk/core` package and providing a robust toolkit for creating and managing forms with Material-UI's component library

To begin using `@formzk/mui`, ensure that you have `@formzk/core` set up in your project. If you need guidance on the initial setup, please refer to the `@formzk/core` [documentation](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#getting-started)

---

## Accessing Components

### Native Components

With `@formzk/mui` package, you can still access the native components provided by `@formzk/core` without importing the core package separately. Just use the `Formzk.Native` namespace to access these components:

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

`Formzk.MUI.Form` works similarly to `Formzk.Native.Form` or `Formzk.Form` but includes additional functionality for layout rendering. It allows developer to define the form layout using a `config` prop that accepts a multi-dimensional array. Each sub-array represents a row, and each object within a sub-array represents a column

Please refer the example below

```ts
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/material';

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
    defaultValues: {
      email: 'xxxx@xyz.com',
      password: '',
    },
  }}
  onSubmit={(values) => {
    console.log('Formzk.Form submit ---->', values);
  }}
  config={[
    [
      {
        name: 'email',
        label: 'Email Address',
        component: 'TextField',
        disabled: false,
        props: {
          required: true,
          placeholder: 'Email Address',
        },
      },
      {
        name: 'password',
        label: 'Password',
        component: 'TextField',
        disabled: false,
        props: { type: 'password', placeholder: 'Password' },
      },
    ],
    [
      {
        // render custom view by node
        content: <Box>Render custom view</Box>,
      },
      {
        // render custom views with function
        content: () => <Box>Render custom view with render function</Box>,
      },
    ],
  ]}
>
  // custom button
  <Formzk.Native.Submit
    render={(e, { formState: { isSubmitting } }) => {
      return (
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      );
    }}
  />
  <Formzk.Native.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
  // mui button
  <Formzk.MUI.Submit text="Login" />
  <Formzk.MUI.Reset text="Clear" />
</Formzk.MUI.Form>;
```

To customize the width of columns, please use the `configLayoutProps` [property](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/Form/README.md?plain=1#L56) or `layoutProps` [property](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/Form/README.md?plain=1#L34) on config item

```ts
<Formzk.MUI.Form<InputPayload>
  configLayoutProps={{
    containerProps: { spacing: 1 }, // to adjust grid spacing (by default is 2)
    itemProps: {
      // <-- this will apply for all rows column (can be override by config item)
      sm: 4,
      md: 4,
    },
  }}
  config={[
    [
      {
        name: 'email',
        label: 'Email Address',
        component: 'TextField',
        disabled: false,
        props: {
          required: true,
          placeholder: 'Email Address',
        },
        layoutProps: {
          // <-- this will override `configLayoutProps`
          sm: 4,
          md: 4,
        },
      },
      {
        name: 'password',
        label: 'Password',
        component: 'TextField',
        disabled: false,
        props: { placeholder: 'Password' },
        layoutProps: {
          // <-- this
          sm: 8,
          md: 8,
        },
      },
    ],
  ]}
/>
```

In this example, the email input field occupies 4 columns in both small (sm) and medium (md) screen sizes, while the password input field occupies 8 columns in the same screen sizes

---

## Custom Layout

If you prefer to create your own layout without using the config props, you can structure your form in the traditional manner. Here’s an example:

```ts
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { useRef } from 'react';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

<Formzk.MUI.Form
  name="login-form"
  options={{
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'xxx@gmail.com',
      password: '',
      rememberMe: false,
    },
  }}
  onSubmit={(values) => {
    console.log('Formzk.Form submit values ---->', JSON.stringify(values, null, 2));
  }}
>
  <Formzk.MUI.Item
    name="email"
    label="Email Address"
    component="TextField"
    props={{
      required: true,
      placeholder: 'Email Address',
    }}
  />

  <Formzk.MUI.Item
    name="password"
    label="Password"
    component="TextField"
    props={{
      type: 'password',
      placeholder: 'Password',
    }}
  />

  <Formzk.MUI.Item name="rememberMe" valueKey="checked" component="Checkbox" label="Remember me?" />

  <Formzk.Mui.Reset text="Clear" />
  <Formzk.Native.Submit text="Login" />
</Formzk.MUI.Form>;
```

In this example, the form components are arranged manually without relying on configuration properties. This approach allows you to freely design the form layout as per your requirements

---

## Available Components

While developers can create their own input components, `@formzk/mui` comes with several built-in components designed to integrate seamlessly with the package. These components are tailored to provide a smooth and efficient form-building experience

### Input Components

The following input components are included and optimized for use with `@formzk/mui`

- Checkbox: A standard checkbox input. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/Checkbox/README.md)
- CheckboxGroup: A group of checkboxes for selecting multiple options [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/CheckboxGroup/README.md)
- RadioGroup: A group of radio buttons for selecting one option from multiple choices [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/RadioGroup/README.md)
- Switch: A toggle switch input for binary choices [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/Switch/README.md)
- Select: A single selection dropdown from multiple options [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/Select/README.md)

These components are designed to work effortlessly with `@formzk/mui`, ensuring consistency and ease of use. In the future, more input components will be added to expand the library's capabilities.

To consume the component, can register components at the entry point of your application (e.g: app.tsx) or any other preferred location

```ts
import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps, Formzk, RadioGroup, RadioGroupProps, Select, SelectProps, Switch, SwitchProps } from '@formzk/mui';
import TextField, { TextFieldProps } from '@mui/material/TextField';

<Formzk.Native.Provider
  config={[
    {
      name: 'TextField',
      component: TextField,
      props: {
        fullWidth: true,
        variant: 'outlined',
        margin: 'normal',
      } as TextFieldProps,
    },
    {
      name: 'Checkbox',
      component: Checkbox,
      props: {} as CheckboxProps,
    },
    {
      name: 'Switch',
      component: Switch,
      props: {} as SwitchProps,
    },
    {
      name: 'RadioGroup',
      component: RadioGroup,
      props: {} as RadioGroupProps,
    },
    {
      name: 'CheckboxGroup',
      component: CheckboxGroup,
      props: {} as CheckboxGroupProps,
    },
    {
      name: 'Select',
      component: Select,
      props: {} as SelectProps,
    },
  ]}
>
  {/* ... your component */}
</Formzk.Native.Provider>;
```

For module Augmentation

```ts
import { ComponentPropsMap as LibraryComponentPropsMap } from '@formzk/core';
import { CheckboxGroupProps, CheckboxProps, RadioGroupProps, SelectProps, SwitchProps } from '@formzk/mui';
import { TextFieldProps } from '@mui/material/TextField';

declare module '@formzk/core' {
  export interface ComponentPropsMap extends LibraryComponentPropsMap {
    TextField: TextFieldProps;
    Checkbox: CheckboxProps;
    Switch: SwitchProps;
    RadioGroup: RadioGroupProps;
    CheckboxGroup: CheckboxGroupProps;
    Select: SelectProps;
  }
}
```

### Other Components

In addition to input components, the package includes components focused on view rendering

- **GridRenderView**: A component for rendering views in a grid layout. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/views/GridRenderView/README.md)

  ```ts
  import { GridRenderView } from '@formzk/mui';

  <GridRenderView
    items={[
      [
        { children: '1-1', xs: 12, sm: 'auto', md: 6 },
        { children: '1-2' },
        { children: '1-3' },
        { children: '1-4' },
      ],

      [{ children: '2-1' }, { children: '2-2' }],
      [{ children: '3-1' }, { children: '3-2' }],
    ]}
  />

  <GridRenderView
    items={[
      {
        items: [
          { children: '1-1' },
          { children: '1-2' },
          { children: '1-3' },
        ],
      },
      { items: [{ children: '2-1' }, { children: '2-2' }] },
      { items: [{ children: '3-1' }, { children: '3-2' }] },
    ]}
  />
  ```

- **StackRenderView**: A component for rendering views in a stack layout. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/views/StackRenderView/README.md)

  ```ts
  import { StackRenderView } from '@formzk/mui';
  import Button from '@mui/material/Button';

  <StackRenderView
    direction="row"
    items={[
      {
        key: 'button-one',
        content: () => {
          return <Button>Button One</Button>;
        },
      },
      {
        key: 'button-two',
        content: () => {
          return <Button>Button Two</Button>;
        },
      },
    ]}
  />;
  ```

These view rendering components help structure and organize your form layouts effectively, providing flexibility in design.

---

### Snippets

Below are some code snippets demonstrating how to utilize the registered input components within the package for quick integration and efficient usage."

1. With `Formzk.MUI.Item`

```ts
// usage of `RadioGroup` component
<Formzk.MUI.Item
  name="selection"
  component="RadioGroup"
  label="Single Selection"
  layout="wrapped"
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
  layout="wrapped"
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
  label="Enable Something"
/>

// usage of `Checkbox` component
<Formzk.MUI.Item
  name="rememberMe"
  component="Checkbox"
  valueKey="checked"
  label="Remember me?"
  caption="Please check if you wants"
/>

// usage of `Select` component
<Formzk.MUI.Item
  name="select"
  label="Select Example"
  component="Select"
  layout="wrapped"
  props={{
    options: [
      { label: 'One', value: '1', disabled: true },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
      { label: 'Four', value: '4' },
      { label: 'One-str', value: '1-str' },
      { label: 'Two-str', value: '2-str' },
      { label: 'Three-str', value: '3-str' },
      { label: 'Four-str', value: '4-str' },
    ],
  }}
/>
```

2. With `Formzk.MUI.Form` component `config` props

```ts
<Formzk.MUI.Form
  config={[
    // first row
    [
      // usage of `CheckboxGroup` component
      {
        label: 'Multi Selection',
        name: 'multiSelection',
        component: 'CheckboxGroup',
        layout: 'wrapped',
        props: {
          options: [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
            { label: 'Four', value: 4 },
          ],
        },
      },
      // usage of `RadioGroup` component
      {
        label: 'Single Options',
        name: 'selection',
        component: 'RadioGroup',
        layout: 'wrapped',
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
      // usage of `Switch` component
      {
        name: 'enabled',
        label: 'Enable Action',
        component: 'Switch',
        valueKey: 'checked',
      },
      // usage of `Checkbox` component
      {
        name: 'checked',
        component: 'Switch',
        valueKey: 'checked',
        label: 'Checkbox to check',
      },
      // usage of `Select` component
      {
        label: 'Select Example',
        name: 'select',
        layout: 'wrapped',
        component: 'Select',
        props: {
          options: [
            { label: 'One', value: '1' },
            { label: 'Two', value: '2' },
            { label: 'Three', value: '3' },
            { label: 'Four', value: '4' },
            { label: 'One-str', value: '1-str' },
            { label: 'Two-str', value: '2-str' },
            { label: 'Three-str', value: '3-str' },
            { label: 'Four-str', value: '4-str' },
          ],
        },
      },
    ],
  ]}
/>
```
