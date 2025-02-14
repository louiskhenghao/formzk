import {
  CheckboxGroupProps,
  CheckboxProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
} from '@formzk/mui';
import { InputProps, OutlinedInputProps, TextFieldProps } from '@mui/material';

declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '@formzk/core' {
  export type ComponentPropsMap = {
    MyInput: InputProps;
    MyTextField: TextFieldProps;
    MyCheckbox: CheckboxProps;
    TextField: OutlinedInputProps;
    Checkbox: CheckboxProps;
    Switch: SwitchProps;
    RadioGroup: RadioGroupProps;
    CheckboxGroup: CheckboxGroupProps;
    Select: SelectProps;
  };

  export type ComponentConfig = {
    [K in keyof ComponentPropsMap]: {
      name: K;
      component: React.ElementType;
      props?: ComponentPropsMap[K];
    };
  };

  export type FormzkConfig = ComponentConfig[keyof ComponentPropsMap];
}
