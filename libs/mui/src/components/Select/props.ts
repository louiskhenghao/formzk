import { ReactNode } from 'react';
import { FormControlProps } from '@mui/material/FormControl';
import { InputLabelProps } from '@mui/material/InputLabel';
import { MenuItemProps } from '@mui/material/MenuItem';
import { SelectProps as MuiSelectProps } from '@mui/material/Select';

/**
 * ===========================
 * MAIN
 * ===========================
 */
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
