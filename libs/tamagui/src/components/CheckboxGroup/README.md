# CheckboxGroup

A vertical group of [Checkbox](../Checkbox/README.md) inputs bound to an array value.

---

## Example

```tsx
import { CheckboxGroup } from '@formzk/tamagui';

<CheckboxGroup
  value={['react']}
  options={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular', disabled: true },
  ]}
  onChange={(updates) => console.log(updates)}
/>;
```

Per-option checkbox props go through `optionProps`; any other prop is applied to the wrapping `YStack` (e.g. `flexDirection="row"` for a horizontal group).
