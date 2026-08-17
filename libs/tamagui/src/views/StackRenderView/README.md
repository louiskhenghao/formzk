# StackRenderView

Horizontal `XStack` that renders a keyed list of nodes (or render functions), centered vertically with a default gap.

---

## Example

```tsx
import { StackRenderView } from '@formzk/tamagui';

<StackRenderView
  gap="$4"
  items={[
    { key: 'reset', content: <Formzk.Tamagui.Reset /> },
    { key: 'submit', content: () => <Formzk.Tamagui.Submit /> },
  ]}
/>;
```

Any other prop is applied to the underlying `XStack`.
