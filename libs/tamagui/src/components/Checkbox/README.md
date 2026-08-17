# Checkbox

Tamagui Checkbox paired with a Label, exposed as a controlled `checked`/`onChange` input.

---

## Example

```tsx
import { Checkbox } from '@formzk/tamagui';

<Checkbox
  label="Remember me"
  checked={checked}
  onChange={(updates) => setChecked(updates)}
/>;
```

Customize the inner pieces via `checkboxProps`, `labelProps` and `indicator` (the content shown when checked). Any other prop is applied to the wrapping `XStack`.
