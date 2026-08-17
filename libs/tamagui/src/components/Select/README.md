# Select

Tamagui Select bound to an options list, exposed as a controlled `value`/`onChange` input. Numeric option values are preserved: `onChange` emits the original option value.

---

## Example

```tsx
import { Select } from '@formzk/tamagui';

<Select
  placeholder="Pick a fruit"
  value={value}
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]}
  onChange={(updates) => setValue(updates)}
/>;
```

Escape hatches: `selectProps`, `triggerProps`, `valueProps`, `contentProps`, `viewportProps`, `itemProps`.

> On native platforms Tamagui's Select requires an `Adapt`/`Sheet` setup to present its content; on web it works out of the box. Pass `selectProps={{ native: 'web' }}` to render a native `<select>` element on web.
