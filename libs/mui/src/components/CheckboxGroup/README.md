# CheckboxGroup

Checkbox group component

---

## Props

```TypeScript
import { ReactNode } from "react";
import { FormControlLabelProps as MuiFormControlLabelProps } from "@mui/material/FormControlLabel";
import { RadioGroupProps as MuiRadioGroupProps } from "@mui/material/RadioGroup";

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type CheckboxGroupProps = Omit<MuiRadioGroupProps, "children"> & {
  /**
   * whether to disabled input
   */
  disabled?: boolean;
  /**
   * option items
   */
  options?: { label: ReactNode; value: string | number; disabled?: boolean }[];
  /**
   * the value of the input
   */
  value?: MuiRadioGroupProps["value"];
  /**
   * the onChange event of the input
   */
  onChange?: (updates: (string | number)[]) => void;
  /**
   * custom props
   */
  optionProps?: Omit<
    MuiFormControlLabelProps,
    "label" | "checked" | "name" | "value" | "control" | "onChange"
  >;
};
```

---

## Example

```tsx
import { CheckboxGroup } from '@formzk/mui';

<CheckboxGroup
  options={[
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
  ]}
  onChange={(e) => {
    console.log('CheckboxGroup changes: ', e);
  }}
/>;

<CheckboxGroup
  options={[
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
    { label: 'Four', value: 'four' },
  ]}
  onChange={(e) => {
    console.log('CheckboxGroup changes: ', e);
  }}
/>;
```
