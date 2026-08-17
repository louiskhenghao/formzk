# @formzk/tamagui setup (Tamagui apps — web + React Native)

> Import style: `import { Formzk } from '@formzk/tamagui'` → `Formzk.Native.*` (core primitives) + `Formzk.Tamagui.*` (Form/Item/Submit/Reset/Errors). All components are cross-platform (react-native-web on web, native RN on mobile).

## Compatibility & install

Peers: `react >=18`, `react-hook-form >=7.40`, `tamagui >=1.100 <3` (Tamagui 2.x itself requires React 19; 1.x also runs on React 18). The app **must already be wrapped in a configured `TamaguiProvider`**.

```bash
yarn add @formzk/core @formzk/tamagui react-hook-form
yarn add yup @hookform/resolvers   # optional
```

## 1. Register components (inside TamaguiProvider)

`@formzk/tamagui` ships **Checkbox, CheckboxGroup, RadioGroup, Switch, Select** (controlled `value`/`onChange`; options `{ label, value, disabled? }[]`). Text inputs come from Tamagui itself — register Tamagui's `Input` / `TextArea` directly. Nothing auto-registers. (`Formzk.Tamagui.Provider` is the same component as `Formzk.Native.Provider`.)

```tsx
import { Formzk, Checkbox, CheckboxGroup, RadioGroup, Select, Switch } from '@formzk/tamagui';
import { Input, TextArea } from 'tamagui';

<Formzk.Native.Provider
  config={[
    { name: 'Input', component: Input },
    { name: 'TextArea', component: TextArea },
    { name: 'Checkbox', component: Checkbox },
    { name: 'Switch', component: Switch },
    { name: 'RadioGroup', component: RadioGroup },
    { name: 'CheckboxGroup', component: CheckboxGroup },
    { name: 'Select', component: Select },
  ]}
>
  <App />
</Formzk.Native.Provider>;
```

> On native platforms Tamagui's `Select` needs an `Adapt`/`Sheet` setup to present its content; on web it works out of the box.

## 2. Augment types

```ts
// types/formzk.d.ts
import {
  CheckboxGroupProps, CheckboxProps, RadioGroupProps, SelectProps, SwitchProps,
} from '@formzk/tamagui';
import { InputProps, TextAreaProps } from 'tamagui';

declare module '@formzk/core' {
  export interface ComponentPropsMap {
    Input: InputProps;
    TextArea: TextAreaProps;
    Checkbox: CheckboxProps;
    Switch: SwitchProps;
    RadioGroup: RadioGroupProps;
    CheckboxGroup: CheckboxGroupProps;
    Select: SelectProps;
  }
}
```

## 3a. Manual layout with `Formzk.Tamagui.Item`

`layout` options: `wrapped` (default — label above, helper text below), `normal` (label/error injected into the component), `contained` (`YStack` + helper text), `none`.

```tsx
import { Formzk } from '@formzk/tamagui';
import { XStack, YStack } from 'tamagui';

type Payload = { name: string; bio: string; subscribe: boolean };

<Formzk.Tamagui.Form<Payload>
  options={{ defaultValues: { name: '', bio: '', subscribe: false } }}
  onSubmit={(values) => console.log(values)}
>
  <YStack gap="$2">
    <Formzk.Tamagui.Item name="name" component="Input" label="Name" caption="Your public display name" />
    <Formzk.Tamagui.Item name="bio" component="TextArea" label="Bio" props={{ numberOfLines: 3 }} />
    <Formzk.Tamagui.Item name="subscribe" component="Switch" label="Subscribe" layout="none" valueKey="checked" />
  </YStack>

  <Formzk.Tamagui.Errors containerProps={{ marginTop: '$3' }} />
  <XStack gap="$2" marginTop="$3">
    <Formzk.Tamagui.Submit text="Save" />
    <Formzk.Tamagui.Reset text="Reset" />
  </XStack>
</Formzk.Tamagui.Form>;
```

## 3b. Config-driven layout

`config` outer array = rows (`XStack`), entries = columns (`YStack`). `layoutProps.span` is a **flex weight**: spans `2` and `1` split a row 2:1.

```tsx
import { Formzk } from '@formzk/tamagui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Payload = { name: string; email: string; subscribe: boolean };

<Formzk.Tamagui.Form<Payload>
  options={{
    resolver: yupResolver(yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    })),
    defaultValues: { name: '', email: '', subscribe: false },
  }}
  config={[
    [
      { name: 'name', component: 'Input', label: 'Name' },
      { name: 'email', component: 'Input', label: 'Email' },
    ],
    [{ name: 'subscribe', component: 'Switch', label: 'Subscribe', layout: 'none', valueKey: 'checked' }],
    [{ content: <Formzk.Tamagui.Errors /> }],
    [
      { content: <Formzk.Tamagui.Reset />, layoutProps: { span: 1 } },
      { content: <Formzk.Tamagui.Submit />, layoutProps: { span: 2 } },
    ],
  ]}
  onSubmit={(values) => console.log(values)}
/>;
```

Responsive stacking: `configLayoutProps={{ containerProps: { flexDirection: 'column', $gtSm: { flexDirection: 'row' } } }}`.

## Standalone sandbox scaffold (no existing Tamagui setup)

```tsx
import { createTamagui, TamaguiProvider } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';

const tamaguiConfig = createTamagui(defaultConfig);
// <TamaguiProvider config={tamaguiConfig} defaultTheme="light"> ...provider + form... </TamaguiProvider>
```
