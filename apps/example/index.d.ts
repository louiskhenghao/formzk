import { ComponentPropsMap as LibraryComponentPropsMap } from '@formzk/core';
import {
  CheckboxGroupProps,
  CheckboxProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
} from '@formzk/mui';
import { InputProps, TextFieldProps } from '@mui/material';

declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '@formzk/core' {
  export interface ComponentPropsMap extends LibraryComponentPropsMap {
    MyInput: InputProps;
    MyTextField: TextFieldProps;
    MyCheckbox: CheckboxProps;
    TextField: TextFieldProps;
    Checkbox: CheckboxProps;
    Switch: SwitchProps;
    RadioGroup: RadioGroupProps;
    CheckboxGroup: CheckboxGroupProps;
    Select: SelectProps;
  }
}
