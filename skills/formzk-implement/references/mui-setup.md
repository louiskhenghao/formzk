# @formzk/mui setup (Material UI apps)

> Import style: `import { Formzk } from '@formzk/mui'` → `Formzk.Native.*` (core primitives re-exported) + `Formzk.MUI.*` (MUI-flavored Form/Item/Submit/Reset/Errors). Never import `@formzk/core` directly, and do NOT use `FormzkMUI` — that identifier appears in one older docs page but is not a real export.

## Compatibility & install

Peers: `react >=18`, `react-hook-form >=7.40`, `@mui/material >=5 <10`, `@emotion/react` + `@emotion/styled >=11.11`.

```bash
yarn add @formzk/core @formzk/mui react-hook-form
yarn add yup @hookform/resolvers   # optional
```

## 1. Register components (app root)

`@formzk/mui` ships **Checkbox, CheckboxGroup, RadioGroup, Switch, Select** (all controlled, options as `{ label, value, disabled? }[]` with `string | number` values). There is **no TextField export** — register MUI's `OutlinedInput` under the name `'TextField'`. Nothing auto-registers.

```tsx
import {
  Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps,
  Formzk, RadioGroup, RadioGroupProps, Select, SelectProps, Switch, SwitchProps,
} from '@formzk/mui';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

<Formzk.Native.Provider
  config={[
    { name: 'TextField', component: OutlinedInput, props: { fullWidth: true, size: 'small' } as OutlinedInputProps },
    { name: 'Checkbox', component: Checkbox, props: {} as CheckboxProps },
    { name: 'Switch', component: Switch, props: {} as SwitchProps },
    { name: 'RadioGroup', component: RadioGroup, props: {} as RadioGroupProps },
    { name: 'CheckboxGroup', component: CheckboxGroup, props: {} as CheckboxGroupProps },
    { name: 'Select', component: Select, props: {} as SelectProps },
  ]}
>
  <App />
</Formzk.Native.Provider>;
```

Registry `props` override per-usage `props` — keep them to safe global defaults.

## 2. Augment types

```ts
// types/formzk.d.ts
import { CheckboxGroupProps, CheckboxProps, RadioGroupProps, SelectProps, SwitchProps } from '@formzk/mui';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

declare module '@formzk/core' {
  export interface ComponentPropsMap {
    TextField: OutlinedInputProps;
    Checkbox: CheckboxProps;
    Switch: SwitchProps;
    RadioGroup: RadioGroupProps;
    CheckboxGroup: CheckboxGroupProps;
    Select: SelectProps;
  }
}
```

## 3a. Manual layout with `Formzk.MUI.Item`

`Item` = `Formzk.Input` + label/caption/error chrome. Key props: `name`, `component` (registered name), `label`, `caption`, `labelType: 'FormLabel' | 'InputLabel'`, `valueKey`, `props`, `layout`:

- `wrapped` (default) — `FormControl fullWidth margin="normal"`, label above, helper text below
- `normal` — label + error cloned into the component
- `contained` — `Box` wrapper + helper text (use for Checkbox/Switch so the label sits inline)
- `none` — just the input

```tsx
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Payload = { email: string; password: string; rememberMe: boolean; plan: string | number };

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

<Formzk.MUI.Form<Payload>
  name="login-form"
  options={{
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '', rememberMe: false, plan: '' },
  }}
  onSubmit={(values) => console.log(values)}
>
  <Formzk.MUI.Item name="email" label="Email Address" component="TextField" props={{ required: true, placeholder: 'Email Address' }} />
  <Formzk.MUI.Item name="password" label="Password" component="TextField" props={{ type: 'password' }} />
  <Formzk.MUI.Item name="rememberMe" component="Checkbox" valueKey="checked" layout="contained" label="Remember me?" />
  <Formzk.MUI.Item
    name="plan"
    label="Plan"
    component="Select"
    props={{ options: [ { label: 'Free', value: 'free' }, { label: 'Pro', value: 'pro', disabled: false } ] }}
  />

  <Formzk.MUI.Errors containerProps={{ sx: { mt: 2 } }} />
  <Formzk.MUI.Submit text="Login" />
  <Formzk.MUI.Reset text="Clear" />
</Formzk.MUI.Form>;
```

`Formzk.MUI.Submit` renders a `type="submit" variant="contained"` Button, auto-disabled while submitting/validating; both Submit/Reset accept `text` + MUI `ButtonProps`.

## 3b. Config-driven layout with `Formzk.MUI.Form config`

`config` is a 2-D array: outer = rows, inner = columns (rendered on a MUI Grid). Each cell is either an Item spec (`{ name, label, component, props?, valueKey?, layout?, layoutProps? }`) or a custom cell (`{ content: ReactNode | () => ReactNode, layoutProps? }`).

```tsx
<Formzk.MUI.Form<Payload>
  name="signup"
  options={{ defaultValues: { email: '', password: '' } }}
  onSubmit={(v) => console.log(v)}
  configLayoutProps={{
    containerProps: { spacing: 1 },
    itemProps: { sm: 6 },              // default column width for every cell
  }}
  config={[
    [
      { name: 'email', label: 'Email', component: 'TextField', layoutProps: { sm: 4 } },          // v5 shorthand
      { name: 'password', label: 'Password', component: 'TextField', props: { type: 'password' }, layoutProps: { size: { sm: 8 } } }, // v6+ size API
    ],
    [{ content: <Formzk.MUI.Errors /> }],
  ]}
>
  <Formzk.MUI.Submit text="Sign up" />
</Formzk.MUI.Form>
```

Both the legacy `xs/sm/md/lg/xl` shorthand and the v6+ `size` prop are accepted (normalized internally).

## Common field snippets

```tsx
<Formzk.MUI.Item name="selection" component="RadioGroup" label="Single Selection"
  props={{ options: [ { label: 'One', value: 1 }, { label: 'Two', value: 2 } ] }} />

<Formzk.MUI.Item name="multi" component="CheckboxGroup" label="Multi options"
  props={{ options: [ { label: 'One', value: 1 }, { label: 'Two', value: 2 } ] }} />   // value type: (string|number)[]

<Formzk.MUI.Item name="enabled" component="Switch" valueKey="checked" layout="contained" label="Enable" />
```

## Wrapping other MUI components (Autocomplete, Slider, Rating)

MUI components whose change signature isn't `(next) => void` need a thin shim before registering:

```tsx
const SliderInput = ({ value, onChange, ...rest }) => (
  <Slider {...rest} value={value ?? 0} onChange={(_, v) => onChange?.(v)} />
);
const RatingInput = ({ value, onChange, ...rest }) => (
  <Rating {...rest} value={value ?? null} onChange={(_, v) => onChange?.(v)} />
);
// Autocomplete: map value <-> option object
const AutocompleteInput = ({ value, onChange, options = [], placeholder, ...rest }) => {
  const selected = options.find((o) => o.value === value) ?? null;
  return (
    <Autocomplete {...rest} options={options} value={selected}
      onChange={(_, opt) => onChange?.(opt ? opt.value : '')}
      getOptionLabel={(opt) => opt?.label ?? ''}
      isOptionEqualToValue={(a, b) => a?.value === b?.value}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} size="small" fullWidth />}
    />
  );
};
```

Register each (`{ name: 'SliderInput', component: SliderInput }`), augment `ComponentPropsMap`, use like any other name. Layout helpers `GridRenderView` / `StackRenderView` are also exported for non-form layout needs.
