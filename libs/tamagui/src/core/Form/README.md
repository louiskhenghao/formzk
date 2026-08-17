# FormzkFormTamagui

Config-driven form rendered on Tamagui's `Form` element. Also available as `Formzk.Tamagui.Form`.

Each top-level entry of `config` is a row, each nested entry a column — either an input item (forwarded to [FormzkFormItemTamagui](../FormItem/README.md)) or a custom `content` node. Rows are laid out by [GridRenderView](../../views/GridRenderView/README.md); use `layoutProps.span` for proportional widths and `configLayoutProps` for row/item defaults.

---

## Example

```tsx
import { Formzk } from '@formzk/tamagui';

<Formzk.Tamagui.Form
  options={{ defaultValues: { name: '', email: '' } }}
  config={[
    [
      { name: 'name', component: 'Input', label: 'Name' },
      { name: 'email', component: 'Input', label: 'Email' },
    ],
    [{ content: <Formzk.Tamagui.Submit /> }],
  ]}
  onSubmit={(values) => console.log(values)}
/>;
```

Pass `formProps` to customize the underlying Tamagui `Form` stack. A `ref` exposes `{ form, submit, reset }`.
