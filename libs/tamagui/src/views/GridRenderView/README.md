# GridRenderView

Row/column layout helper built on Tamagui stacks. Rows render as `XStack`, items as `YStack` with a `span`-based flex weight — no 12-column math, so it works identically on web and React Native.

---

## Example

```tsx
import { GridRenderView } from '@formzk/tamagui';

<GridRenderView
  items={[
    [
      { span: 2, children: <Left /> },
      { span: 1, children: <Right /> },
    ],
    [{ children: <FullWidth /> }],
  ]}
/>;
```

`containerProps` applies to every row, `itemProps` to every item. To stack items vertically on small screens pass responsive row props, e.g. `containerProps={{ flexDirection: 'column', $gtSm: { flexDirection: 'row' } }}`. A row can also be an object `{ props, items }` to style a single row.
