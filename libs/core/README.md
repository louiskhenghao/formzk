# @formzk/core

`@formzk/core` was born out of the necessity to overcome the limitations of existing form solutions that often tightly couple form logic with UI components. This coupling can lead to duplicated code and hinder the flexibility needed to adapt to different use cases. By leveraging the power of react-hook-form and introducing a headless architecture, `@formzk/core` allows developers to register and manage form components globally, ensuring consistency and reducing redundancy. This results in cleaner, more maintainable code and a more efficient development process

---

# Table of contents

- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Registering components](#registering-components)
  - [Module Augmentation](#module-augmentation)
  - [Basic Usage](#basic-usage)
- [Reference](#reference)
  - [Formzk.Provider](#formzkprovider)
  - [Formzk.Form](#formzkform)
  - [Formzk.Input](#formzkinput)
  - [Formzk.Submit](#formzksubmit)
  - [Formzk.Reset](#formzkreset)
  - [Formzk.Errors](#formzkerrors)
- [Quick Implementation](#quick-implementation)
- [Extending with Other UI Libraries](#extending-with-other-ui-libraries)

---

## Installation

```bash
yarn add @formzk/core react-hook-form lodash
# or
npm install @formzk/core react-hook-form lodash

# install yup validation (optional)
yarn add yup @hookform/resolvers
# or
npm install yup @hookform/resolvers
```

---

## Getting Started

### Registering components

Registering components with `@formzk/core` is straightforward and can be done at the entry point of your application (e.g: app.tsx) or any other preferred location. This flexibility means that there are no restrictions on which UI library you can use. You can seamlessly integrate any UI library that best suits your business needs, allowing for a highly adaptable and customizable form management system. This approach ensures that `@formzk/core` can fit into any project, regardless of the UI framework in use, providing developers with the freedom to choose the tools that work best for them

The below snippet used `@mui/material` as example

```tsx
import { Formzk } from '@formzk/core';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import TextField, { TextFieldProps } from '@mui/material/TextField';

<Formzk.Provider
  config={[
    {
      name: 'MyTextField',
      component: TextField,
      props: {
        size: 'small',
        fullWidth: true,
      } as TextFieldProps,
    },
    {
      name: 'MyCheckbox',
      component: Checkbox,
      props: {
        variant: 'outlined',
      } as CheckboxProps,
    },
  ]}
>
  {/* ... your component */}
</Formzk.Provider>;
```

### Module Augmentation

To extend and customize the `@formzk/core` library with your own component props, you can use TypeScript's module augmentation feature. This allows you to define additional properties and types that can be used within the `@formzk` ecosystem

In your project, create a type definition file (e.g: index.d.ts). This file will contain the type augmentations for `@formzk`

```ts
import { ComponentPropsMap as LibraryComponentPropsMap } from '@formzk/core';
import { TextFieldProps } from '@mui/material';
import { CheckboxProps } from '@mui/material/Checkbox';

declare module '@formzk/core' {
  export interface ComponentPropsMap extends LibraryComponentPropsMap {
    MyTextField: TextFieldProps;
    MyCheckbox: CheckboxProps;
    // register over here
  }
}
```

> NOTE: Do remember that if your TypeScript configuration isn't picking up the typings by default, you might have to adjust the include or types fields in your tsconfig.json

### Basic Usage

The following example demonstrates how to use `@formzk/core` to create a form with validation using `yup`, integrate custom components, and handle form submission and reset actions. This example shows the flexibility and power of `@formzk/core` in managing form components and configurations

```ts
import { Formzk } from '@formzk/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// define type for form input
type InputPayload = {
  email: string;
  password: string;
};

// define form validation schema
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(8, 'Minimum length is 8 characters'),
});

// create the form
<Formzk.Form<InputPayload>
  options={{
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'xxx.gmail.com',
      password: '',
    },
  }}
  onSubmit={(values) => {
    console.log('Formzk.Form submission ---->', values);
  }}
>
  <Formzk.Input name="email" component="MyTextField" />

  <Formzk.Input
    name="password"
    component="MyTextField"
    render={(comp, { fieldState }) => {
      const error = fieldState.error?.message;
      return (
        <CloneElement placeholder="Password" error={!!error} helperText={error}>
          {comp}
        </CloneElement>
      );
    }}
  />

  <Formzk.Input name="rememberMe" component="MyCheckbox" props={{ label: 'Remember Me?' }} />

  <Formzk.Submit render={(e) => <Button onClick={e}>Submit</Button>} />
  <Formzk.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
</Formzk.Form>;
```

> Since `@formzk/core` is headless, the layout and styling are left to the developer's discretion, while this package focuses on form validation, input field rendering, form submission, and other form-related functionalities. Developers can build on top of this package to further extend its features and customize it to fit their needs

---

## Reference

This section provides a brief overview of each component provided by `@formzk/core` and their respective props. Each component is designed to facilitate form management, including validation, input field rendering, form submission, and reset functionalities

### Formzk.Provider

The FormProvider component is used to register and provide form components throughout your application

> Refer `Formzk.Provider` documentation over [here](https://github.com/louiskhenghao/formzk/blob/main/libs/core/src/core/Config/README.md)

### Formzk.Form

The `Form` component wraps the form logic and integrates with `react-hook-form`. It handles validation, form submission, and provides a ref to the form instance

> Refer `Formzk.Form` documentation over [here](https://github.com/louiskhenghao/formzk/blob/main/libs/core/src/core/Form/README.md)

### Formzk.Input

The `Input` component registers an input field with the form. It connects the input field to the form state and validation logic

> Refer `Formzk.Input` documentation over [here](https://github.com/louiskhenghao/formzk/blob/main/libs/core/src/core/FormInput/README.md)

### Formzk.Submit

The `Submit` component renders a button that triggers form submission

> Refer `Formzk.Submit` documentation over [here](https://github.com/louiskhenghao/formzk/blob/main/libs/core/src/core/FormSubmit/README.md)

### Formzk.Reset

The `Reset` component renders a button that resets the form to its default values

> Refer `Formzk.Reset` documentation over [here](https://github.com/louiskhenghao/formzk/blob/main/libs/core/src/core/FormReset/README.md)

### Formzk.Errors

The `Errors` component displays a list of form validation errors. It provides a customizable way to render error messages

> Refer `Formzk.Errors` documentation over [here](https://github.com/louiskhenghao/formzk/blob/main/libs/core/src/core/FormErrors/README.md)

---

# Quick Implementation

For those who prefer to use Material-UI, we've created a companion package called `@formzk/mui`. This package provides pre-configured Material-UI components that seamlessly integrate with `@formzk/core`, making it quick and easy to implement forms with consistency. Do checkout the [@formzk/mui](https://github.com/louiskhenghao/formzk/tree/main/libs/mui#readme) documentation for more details on how to get started

---

# Extending with Other UI Libraries

If you would like to implement support for other UI libraries, we encourage you to create a pull request and contribute to the project. We are happy to assist and provide guidance to ensure your contribution fits well within the `@formzk` ecosystem. Your efforts will help expand the flexibility and usability of @formzk for everyone. Please reach out if you need any assistance while working on your contribution
