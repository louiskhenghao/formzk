# Switch

Switch component wrapped with FormControl

---

## Props

```TypeScript
import { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material/FormControlLabel';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type SwitchProps = Omit<
  MuiFormControlLabelProps,
  'label' | 'checked' | 'name' | 'value' | 'control' | 'onChange'
> & {
  /**
   * label to display beside input
   */
  label?: MuiFormControlLabelProps['label'];
  /**
   * indicate input whether is checked
   */
  checked?: MuiFormControlLabelProps['checked'];
  /**
   * the onChange event of the input
   */
  onChange?: (updates: boolean) => void;
};
```

---

## Example

```tsx
import { Switch } from '@formzk/mui';

<Switch
  label="Switch input"
  onChange={(e) => {
    console.log('Switch changes: ', e);
  }}
/>;
```
