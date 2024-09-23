# FormResetButton

Added on 1.0.1

Material UI Reset button handle form resetting

---

## Props

```TypeScript
import { ReactNode } from 'react';
import { ButtonProps } from '@mui/material/Button';

export type FormResetButtonProps = Omit<ButtonProps, "type"> & {
  /**
   * the button text
   * default to "Reset"
   */
  text?: ReactNode;
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
