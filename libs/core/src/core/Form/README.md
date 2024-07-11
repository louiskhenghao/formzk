# Formzk.Form

Form provider

---

## Props

```TypeScript
import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';

export type FormzkFormContextProps<
  F extends FieldValues = FieldValues,
  T = any
> = {
  /**
   * form context from react-hook-form
   */
  form: UseFormReturn<F, T>;

  /**
   * form submission function
   */
  submit: () => void;
};

export type FormzkFormProps<F extends FieldValues = FieldValues, T = any> = {
  /**
   * overriding form instance
   */
  form?: UseFormReturn<F, T>;
  /**
   * options for react-hook-form
   */
  options?: UseFormProps<F, T>;
  /**
   * the submit function callback with form values
   */
  onSubmit?: (values: F) => void;
};

export type FormzkFormRefProps<F extends FieldValues = FieldValues, T = any> = {
  /**
   * form context from react-hook-form
   */
  form: UseFormReturn<F, T>;

  /**
   * form submission function
   */
  submit: () => void;
};
```

---

## Example

```tsx
import { Formzk } from '@formzk/core';
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

<Formzk.Form<InputPayload>
  ref={ref}
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

  <Formzk.Errors
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

  <Formzk.Submit render={(e) => <Button onClick={e}>Submit</Button>} />
  <Formzk.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
</Formzk.Form>;
```
