# RadioGroup

Tamagui RadioGroup with labeled options, exposed as a controlled `value`/`onChange` input.

---

## Example

```tsx
import { RadioGroup } from '@formzk/tamagui';

<RadioGroup
  value="yes"
  options={[
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]}
  onChange={(updates) => console.log(updates)}
/>;
```

Customize option rows via `optionProps` (XStack), radio items via `itemProps` and labels via `labelProps`. Stack-style props on the group itself control direction and spacing (e.g. `flexDirection="row"`).
