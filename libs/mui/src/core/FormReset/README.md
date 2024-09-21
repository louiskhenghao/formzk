# FormResetButton

Added on 1.0.1

Material UI Reset button with loading state handle

---

## Props

```TypeScript
import { LoadingButtonProps } from '@mui/lab/LoadingButton';

export type FormResetButtonProps = LoadingButtonProps & {
  /**
   * the button text
   * default to "Reset"
   */
  text?: string;
};

```

---

## Example

```tsx
import { FormResetButton, Formzk } from '@formzk/mui';

<FormResetButton text="CLEAR" />;

// or with formzk mui
<Formzk.MUI.Reset text="CLEAR" />;
```
