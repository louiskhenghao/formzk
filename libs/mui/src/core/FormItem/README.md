# Formzk.MUI.Item

Form Item rendering with registered input component

---

## Props

```TypeScript
import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import { ComponentPropsMap, FormzkFormInputProps } from '@formzk/core';
import { BoxProps } from '@mui/material/Box';
import { FormControlProps } from '@mui/material/FormControl';
import { FormHelperTextProps } from '@mui/material/FormHelperText';

export type FormzkFormItemMUIProps<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = Omit<FormzkFormInputProps<F, K>, 'render'> & {
  /**
   * whether to have FormControl wrapped
   * normal: show original component
   * wrapped: wrapped with FormControl
   * contained: wrapped with Box & have error capability
   *
   * default: contained
   */
  layout?: 'normal' | 'wrapped' | 'contained';
  /**
   * whether to highlight error if error message present
   * default: true
   */
  enableHighlightError?: boolean;
  /**
   * label of the form item
   */
  label?: ReactNode;
  /**
   * * Added 1.0.3
   * The label type
   * NOTE: only applied for `wrapped` layout
   *
   * default `FormLabel`
   */
  labelType: 'FormLabel' | 'InputLabel';
  /**
   * caption to show below form input
   */
  caption?: ReactNode;

  /**
   * custom props
   */
  formControlWrappedProps?: FormControlProps;
  normalWrappedProps?: BoxProps;
  captionHighlightProps?: FormHelperTextProps;
  errorHighlightTextProps?: FormHelperTextProps;
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

  <Formzk.Native.Errors
    render={(errors) => {
      if (errors.length === 0) return null;
      return (
        <div style={{ padding: '0.5rem', background: '#f87171' }}>
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      );
    }}
  />

  <Formzk.Native.Submit render={(e) => <Button onClick={e}>Submit</Button>} />
  <Formzk.Native.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
</Formzk.MUI.Form>;
```
