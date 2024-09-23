# FormSubmitButton

Added on 1.0.1

Material UI Submit button with loading state handle

---

## Props

```TypeScript
import { LoadingButtonProps } from '@mui/lab/LoadingButton';

export type FormSubmitButtonProps = LoadingButtonProps & {
  /**
   * the button text
   * default to "Submit"
   */
  text?: string;
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
