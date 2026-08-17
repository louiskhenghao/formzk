import { ComponentPropsMap as LibraryComponentPropsMap } from '@formzk/core';
import {
  CheckboxGroupProps,
  CheckboxProps,
  RadioGroupProps,
  SelectProps,
  SwitchProps,
} from '@formzk/mui';
import {
  CheckboxGroupProps as TamaguiCheckboxGroupProps,
  CheckboxProps as TamaguiCheckboxProps,
  RadioGroupProps as TamaguiRadioGroupProps,
  SelectProps as TamaguiSelectProps,
  SwitchProps as TamaguiSwitchProps,
} from '@formzk/tamagui';
import { InputProps, OutlinedInputProps } from '@mui/material';
import { InputProps as TamaguiInputProps } from 'tamagui';

import {
  ChipsInputProps,
  ColorPickerProps,
  CurrencyInputProps,
  DateInputProps,
  FileUploadProps,
  RatingInputProps,
  SliderInputProps,
} from './src/components';

declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '*.css';

declare module '@formzk/core' {
  export interface ComponentPropsMap extends LibraryComponentPropsMap {
    MyInput: InputProps;
    MyTextField: OutlinedInputProps;
    MyCheckbox: CheckboxProps;
    TextField: OutlinedInputProps;
    Checkbox: CheckboxProps;
    Switch: SwitchProps;
    RadioGroup: RadioGroupProps;
    CheckboxGroup: CheckboxGroupProps;
    Select: SelectProps;
    CurrencyInput: CurrencyInputProps;
    RatingInput: RatingInputProps;
    SliderInput: SliderInputProps;
    ColorPicker: ColorPickerProps;
    DateInput: DateInputProps;
    FileUpload: FileUploadProps;
    ChipsInput: ChipsInputProps;
    TamaguiInput: TamaguiInputProps;
    TamaguiCheckbox: TamaguiCheckboxProps;
    TamaguiCheckboxGroup: TamaguiCheckboxGroupProps;
    TamaguiRadioGroup: TamaguiRadioGroupProps;
    TamaguiSwitch: TamaguiSwitchProps;
    TamaguiSelect: TamaguiSelectProps;
  }
}
