# @formzk/core setup (headless — any or no UI kit)

Use this route when the app has no formzk adapter for its UI kit (Chakra, antd, shadcn, custom design system, plain HTML). You register the app's own components against the `value`/`onChange` contract.

## Install

```bash
yarn add @formzk/core react-hook-form
yarn add yup @hookform/resolvers   # optional schema validation
```

## 1. Components must satisfy the contract

Any React component whose props include `value` + `onChange(next)` can be registered. Wrap kit components whose APIs differ:

```tsx
// components/MyTextField.tsx — plain HTML example
export type MyTextFieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (next: string) => void;
  disabled?: boolean;
};

export const MyTextField = ({ label, value, onChange, ...rest }: MyTextFieldProps) => (
  <label>
    {label}
    <input value={value ?? ''} onChange={(e) => onChange?.(e.target.value)} {...rest} />
  </label>
);
```

If a component already uses different prop names (e.g. `checked`/`onCheckedChange`), you can skip the wrapper and set `valueKey` / `eventKey` on `Formzk.Input` instead.

## 2. Register in the provider (app root)

```tsx
import { Formzk, ComponentConfig } from '@formzk/core';
import { MyTextField } from './components/MyTextField';
import { MyCheckbox } from './components/MyCheckbox';

const config: ComponentConfig[] = [
  { name: 'MyTextField', component: MyTextField },
  // registry `props` are global defaults — they OVERRIDE per-usage props, keep minimal
  { name: 'MyCheckbox', component: MyCheckbox, props: {} },
];

export function AppProviders({ children }) {
  return <Formzk.Provider config={config}>{children}</Formzk.Provider>;
}
```

(`Formzk.Provider` and `FormzkProvider` are the same component — both are exported.)

## 3. Augment `ComponentPropsMap`

```ts
// types/formzk.d.ts
import type { MyTextFieldProps } from '../components/MyTextField';
import type { MyCheckboxProps } from '../components/MyCheckbox';

declare module '@formzk/core' {
  export interface ComponentPropsMap {
    MyTextField: MyTextFieldProps; // keys must match registered names exactly
    MyCheckbox: MyCheckboxProps;
  }
}
```

## 4. Build the form

```tsx
import { Formzk, CloneElement } from '@formzk/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type InputPayload = { email: string; password: string; rememberMe: boolean };

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(8, 'Minimum length is 8 characters'),
});

export function LoginForm() {
  return (
    <Formzk.Form<InputPayload>
      options={{
        resolver: yupResolver(schema),
        defaultValues: { email: '', password: '', rememberMe: false },
      }}
      onSubmit={(values) => console.log('submitted', values)}
    >
      <Formzk.Input name="email" component="MyTextField" props={{ label: 'Email' }} />

      {/* render prop + CloneElement = inject error/placeholder into the resolved component */}
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

      {/* boolean input: checked, not value */}
      <Formzk.Input name="rememberMe" component="MyCheckbox" valueKey="checked" props={{ label: 'Remember me?' }} />

      <Formzk.Errors
        render={(hasError, errors) =>
          hasError ? (
            <ul style={{ color: '#d33' }}>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
          ) : null
        }
      />
      <Formzk.Submit render={(submit) => <button onClick={submit}>Submit</button>} />
      <Formzk.Reset render={(reset) => <button onClick={reset}>Reset</button>} />
    </Formzk.Form>
  );
}
```

## Extras

- **Per-field react-hook-form options** go through the `field` prop: `<Formzk.Input field={{ rules: { required: true }, shouldUnregister: true, defaultValue: '' }} ... />`.
- **External form instance**: create your own `useForm()` and pass it via the `form` prop on `Formzk.Form` (useful for multi-step wizards sharing one instance).
- **Imperative access**: `const ref = useRef<FormzkFormRefProps<Payload>>(null)` → `ref.current.submit()`, `ref.current.reset()`, `ref.current.form.setValue(...)` / `.getValues()` / `.watch(...)`.
- **Inside the form tree**: `useFormzkForm()` returns `{ form, nativeSubmit, submit, reset }`; plain `useFormContext()` from react-hook-form also works (a `FormProvider` is set up), so raw `Controller`/`register` usage can be mixed in.
- **Contribute an adapter**: if the wrappers you build for a popular kit would help others, formzk welcomes new `@formzk/<kit>` adapter packages — see `CONTRIBUTING.md` in https://github.com/louiskhenghao/formzk (the `formzk-new-adapter` skill automates this).
