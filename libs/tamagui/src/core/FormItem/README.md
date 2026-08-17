# FormzkFormItemTamagui

Form input wrapper with label / caption / error presentation. Also available as `Formzk.Tamagui.Item`.

`layout` options:

- `none`: show original component
- `normal`: inject `label` & `error` props into the component
- `contained`: wrapped with `YStack`, label injected, helper text underneath
- `wrapped` (default): wrapped with `YStack`, label above, helper text underneath

---

## Example

```tsx
import { Formzk } from '@formzk/tamagui';

<Formzk.Tamagui.Item
  name="email"
  component="Input"
  label="Email"
  caption="We never share your email"
/>;
```

Customize via `wrappedContainerProps` / `normalWrappedProps` (YStack), `labelProps`, `captionHighlightProps` and `errorHighlightTextProps` (SizableText). A `render` function receives the composed view plus react-hook-form state for full control.
