# Checkbox

Material UI Checkbox component wrapped with FormControl

---

## Props

```TypeScript
import { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material/FormControlLabel';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type CheckboxProps = Omit<
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
import { Checkbox } from '@formzk/mui';

<Checkbox
  label="Checkbox example"
  onChange={(state) => {
    console.log('onChange', state);
  }}
/>;
```
