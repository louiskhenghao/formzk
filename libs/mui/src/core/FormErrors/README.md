# FormErrorsView

Added on 1.0.1

A list of form errors to be display upon form submission

---

## Props

```TypeScript
import { AlertProps } from '@mui/material/Alert';
import { AlertTitleProps } from '@mui/material/AlertTitle';
import { TypographyProps } from '@mui/material/Typography';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormErrorsViewProps = {
  /**
   * the title text
   * default to "Error"
   */
  title?: string;
  /**
   * the box props for alert container
   */
  containerProps?: AlertProps;
  /**
   * the title props for alert title
   */
  titleProps?: AlertTitleProps;
  /**
   * typography props for error message
   */
  messageProps?: TypographyProps;
};
```

---

## Example

```tsx
import { FormErrorsView, Formzk } from '@formzk/mui';

<FormErrorsView />;

// or with formzk mui
<Formzk.MUI.FormErrors />;
```
