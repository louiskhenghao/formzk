# FormErrorsView

Themed (red) summary card listing the current validation errors. Renders nothing when the form is valid. Also available as `Formzk.Tamagui.Errors`.

---

## Example

```tsx
import { Formzk } from '@formzk/tamagui';

<Formzk.Tamagui.Errors title="Please fix the following" />;
```

Customize via `containerProps` (YStack), `titleProps` and `messageProps` (SizableText).
