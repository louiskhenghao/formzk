# FormSubmitButton

Added on 1.0.1

Material UI Submit button that handle form submission

---

## Props

```TypeScript
import { ReactNode } from 'react';
import { ButtonProps } from '@mui/material/Button';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormSubmitButtonProps = Omit<ButtonProps, "type"> & {
  /**
   * the button text
   * default to "Submit"
   */
  text?: ReactNode;
};
```

---

## Example

```tsx
import { FormSubmitButton, Formzk } from '@formzk/mui';

<FormSubmitButton text="CREATE" />;

// or with formzk mui
<Formzk.MUI.Submit text="CREATE" />;
```
