# Switch

Tamagui Switch paired with a Label, exposed as a controlled `checked`/`onChange` input.

---

## Example

```tsx
import { Switch } from '@formzk/tamagui';

<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={(updates) => setEnabled(updates)}
/>;
```

Customize the inner pieces via `switchProps`, `thumbProps` and `labelProps`. Any other prop is applied to the wrapping `XStack`.
