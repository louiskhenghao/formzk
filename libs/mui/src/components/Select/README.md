# Select

Material UI Select component wrapped with FormControl

---

## Props

```TypeScript
import { ReactNode } from 'react';
import { FormControlProps } from '@mui/material/FormControl';
import { InputLabelProps } from '@mui/material/InputLabel';
import { MenuItemProps } from '@mui/material/MenuItem';
import { SelectProps as MuiSelectProps } from '@mui/material/Select';

export type SelectProps = {
  /**
   * label to display beside input
   */
  label?: ReactNode;
  /**
   * option items
   */
  options?: { label: ReactNode; value: string; disabled?: boolean }[];
  /**
   * the value of the input
   */
  value?: MuiSelectProps<string>['value'];
  /**
   * the onChange event of the input
   */
  onChange?: (updates: string) => void;

  /**
   * custom props
   * --------------------
   */
  wrapperProps?: Omit<FormControlProps, 'children'>;
  labelProps?: InputLabelProps;
  selectProps?: Omit<MuiSelectProps<string>, 'label' | 'value' | 'onChange'>;
  itemProps?: Omit<MenuItemProps, 'value' | 'children'>;
};
```

---

## Example

```tsx
import { Select } from '@formzk/mui';

<Select
  label="Select example"
  options={[
    { label: 'One', value: 1, disabled: true },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
    { label: 'One-str', value: '1-str' },
    { label: 'Two-str', value: '2-str' },
    { label: 'Three-str', value: '3-str' },
    { label: 'Four-str', value: '4-str' },
  ]}
  onChange={(value) => {
    console.log('Select onChanges: ', value);
  }}
/>

// usage with Formzk.MUI.Item
<Formzk.MUI.Item
  name="select"
  label="Select"
  component="Select"
  layout="wrapped"
  props={{
    options: [
      { label: 'One', value: 1, disabled: true },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 },
      { label: 'Four', value: 4 },
      { label: 'One-str', value: '1-str' },
      { label: 'Two-str', value: '2-str' },
      { label: 'Three-str', value: '3-str' },
      { label: 'Four-str', value: '4-str' },
    ],
  }}
/>

// usage with Formzk config
{
  label: 'Select',
  name: 'select',
  layout: 'wrapped',
  component: 'Select',
  props: {
    options: [
      { label: 'One', value: 1, disabled: true },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 },
      { label: 'Four', value: 4 },
      { label: 'One-str', value: '1-str' },
      { label: 'Two-str', value: '2-str' },
      { label: 'Three-str', value: '3-str' },
      { label: 'Four-str', value: '4-str' },
    ],
  },
}
```
