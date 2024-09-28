import { ReactNode } from 'react';
import { FormControlLabelProps as MuiFormControlLabelProps } from '@mui/material/FormControlLabel';
import { FormGroupProps as MuiFormGroupProps } from '@mui/material/FormGroup';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type CheckboxGroupProps = Omit<MuiFormGroupProps, 'children'> & {
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
  value?: (string | number)[];
  /**
   * the onChange event of the input
   */
  onChange?: (updates: (string | number)[]) => void;
  /**
   * custom props
   */
  optionProps?: Omit<
    MuiFormControlLabelProps,
    'label' | 'checked' | 'name' | 'value' | 'control' | 'onChange'
  >;
};
