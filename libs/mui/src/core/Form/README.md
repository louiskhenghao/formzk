# Formzk.MUI.Form

Form provider that has integrated with Material UI

---

## Props

```TypeScript
import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import { ComponentPropsMap, FormzkFormProps } from '@formzk/core';
import { GridProps } from '@mui/material/Grid';
import { FormzkFormItemMUIProps } from '../FormItem';

export type FormzkFormMUILayoutItemCustom = {
  content: ReactNode;
  layoutProps?: Omit<
    GridProps,
    'item' | 'container' | 'spacing' | 'columns' | 'children'
  >;
};

export type FormzkFormMUILayoutItemInput<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = FormzkFormItemMUIProps<F, K> & {
  layoutProps?: Omit<
    GridProps,
    'item' | 'container' | 'spacing' | 'columns' | 'children'
  >;
};

export type FormzkFormMUILayoutProps<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = FormzkFormMUILayoutItemInput<F, K> | FormzkFormMUILayoutItemCustom;

export type FormzkFormMUIProps<
  F extends FieldValues = FieldValues,
  T = any
> = FormzkFormProps<F, T> & {
  name?: string;
  /**
   * the config that used to build form layout
   */
  config?: FormzkFormMUILayoutProps<F, keyof ComponentPropsMap>[][];
};

```

---

## Example

```tsx
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type InputPayload = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(8, 'Minimum length is 8 characters'),
});

// custom layout
<Formzk.MUI.Form<InputPayload>
  options={{
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'xxx.gmail.com',
      password: '',
      rememberMe: false,
    },
  }}
  onSubmit={(values) => {
    console.log('Formzk.MUI.Form submission ---->', values);
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
    label="Password"
    name="password"
    component="TextField"
    caption="Password must include 1234567890*!"
    props={{
      type: 'password',
      required: true,
      placeholder: 'Password',
    }}
  />

  <Formzk.MUI.Item valueKey="checked" name="rememberMe" component="Checkbox" label="Remember me?" />

  <Formzk.Native.Submit render={(e) => <Button onClick={e}>Submit</Button>} />
  <Formzk.Native.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
</Formzk.MUI.Form>;

// dynamic layout

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

<Formzk.MUI.Form<InputPayload>
  name="login-form"
  ref={ref}
  options={{
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'louiskhenghao@gmail.com',
      password: '',
      rememberMe: false,
      switch: false,
      checkboxes: [],
    },
  }}
  onSubmit={(values) => {
    console.log('Formzk.MUI.Form submission ---->', values);
  }}
  config={[
    [
      {
        name: 'email',
        label: 'Email Address',
        component: 'TextField',
        disabled: disabled,
        props: {
          required: true,
          placeholder: 'Email Address',
        },
        layoutProps: {
          sm: 4,
          md: 4,
        },
      },
      {
        label: 'Password',
        name: 'password',
        component: 'TextField',
        disabled: disabled,
        props: { placeholder: 'Password' },
        layoutProps: {
          sm: 8,
          md: 8,
        },
      },
    ],
    [
      {
        label: 'Radio',
        name: 'radio',
        layout: 'wrapped',
        disabled: disabled,
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
      {
        label: 'Checkbox',
        name: 'checkboxes',
        layout: 'wrapped',
        disabled: disabled,
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
    ],
    [
      {
        content: (
          <>
            <Formzk.Native.Errors
              render={(errors, error) => {
                if (!error) return null;
                return (
                  <Box>
                    {errors.map((e, i) => {
                      return (
                        <Alert key={i} severity="error">
                          {e}
                        </Alert>
                      );
                    })}
                  </Box>
                );
              }}
            />
          </>
        ),
      },
    ],
    [
      {
        content: (
          <>
            <Formzk.Native.Submit render={(e) => <Button type="submit">Submit</Button>} />
            <Formzk.Native.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
          </>
        ),
      },
    ],
  ]}
/>;
```
