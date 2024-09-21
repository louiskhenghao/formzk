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

---

## Installation

```bash
yarn add @formzk/core @formzk/mui react-hook-form lodash @mui/material
# or
npm install @formzk/core @formzk/mui react-hook-form lodash @mui/material

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

| Namespace           | Reference                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Formzk.MUI.Provider | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/core/README.md#formzkprovider)   |
| Formzk.MUI.Form     | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/FormItem/README.md) |
| Formzk.MUI.Item     | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/FormItem/README.md) |

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
        // can do this to render custom component
        content: (
          <>
            <Formzk.Native.Submit render={(e) => <Button type="submit">Submit</Button>} />
            <Formzk.Native.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
          </>
        ),
      },
    ],
  ]}
>
  {/* ANY CONTENT ADDED WILL SHOWS BELOW CONFIG */}
  <Formzk.Native.Submit render={(e) => <Button type="submit">Submit</Button>} />
  <Formzk.Native.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
</Formzk.MUI.Form>;
```

To customize the width for columns, please use the `layoutProps` [property](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/core/Form/README.md)

```ts
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
      layoutProps: { // <-- this
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
      layoutProps: { // <-- this
        sm: 8,
        md: 8,
      },
    },
  ],
]}
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

  <Formzk.Native.Reset
    render={(e) => (
      <Button onClick={e} variant="outlined">
        Reset
      </Button>
    )}
  />
  <Formzk.Native.Submit
    render={(e) => (
      <Button type="submit" variant="contained">
        Submit
      </Button>
    )}
  />
</Formzk.MUI.Form>;
```

In this example, the form components are arranged manually without relying on configuration properties. This approach allows you to freely design the form layout as per your requirements

---

## Available Components

While developers can create their own input components, `@formzk/mui` comes with several built-in components designed to integrate seamlessly with the package. These components are tailored to provide a smooth and efficient form-building experience

### Input Components

The following input components are included and optimized for use with `@formzk/mui`

- Checkbox: A standard checkbox input. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/Checkbox/props.ts)
- CheckboxGroup: A group of checkboxes for selecting multiple options [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/CheckboxGroup/props.ts)
- RadioGroup: A group of radio buttons for selecting one option from multiple choices [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/RadioGroup/props.ts)
- Switch: A toggle switch input for binary choices [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/components/Switch/props.ts)

These components are designed to work effortlessly with `@formzk/mui`, ensuring consistency and ease of use. In the future, more input components will be added to expand the library's capabilities.

To consume the component, can register components at the entry point of your application (e.g: app.tsx) or any other preferred location

```ts
import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps, Formzk, RadioGroup, RadioGroupProps, Switch, SwitchProps } from '@formzk/mui';
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
  ]}
>
  {/* ... your component */}
</Formzk.Native.Provider>;
```

For module Augmentation

```ts
import { ComponentPropsMap as LibraryComponentPropsMap } from '@formzk/core';
import { CheckboxGroupProps, CheckboxProps, RadioGroupProps, SwitchProps } from '@formzk/mui';
import { TextFieldProps } from '@mui/material/TextField';

declare module '@formzk/core' {
  export interface ComponentPropsMap extends LibraryComponentPropsMap {
    TextField: TextFieldProps;
    Checkbox: CheckboxProps;
    Switch: SwitchProps;
    RadioGroup: RadioGroupProps;
    CheckboxGroup: CheckboxGroupProps;
  }
}
```

### Other Components

In addition to input components, the package includes components focused on view rendering

- GridRenderView: A component for rendering views in a grid layout. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/views/GridRenderView/README.md)
- StackRenderView: A component for rendering views in a stack layout. [(documentation)](https://github.com/louiskhenghao/formzk/blob/main/libs/mui/src/views/StackRenderView/README.md)

These view rendering components help structure and organize your form layouts effectively, providing flexibility in design.
