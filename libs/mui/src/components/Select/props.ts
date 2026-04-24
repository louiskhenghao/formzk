import { ReactNode } from 'react';
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
  options?: {
    label: ReactNode;
    value: string | number;
    disabled?: boolean;
  }[];
  /**
   * the value of the input
   */
  value?: MuiSelectProps<string | number>['value'];
  /**
   * the onChange event of the input
   */
  onChange?: (updates: string | number) => void;

  /**
   * custom props
   * --------------------
   */
  selectProps?: Omit<
    MuiSelectProps<string | number>,
    'label' | 'value' | 'onChange'
  >;
  itemProps?: Omit<MenuItemProps, 'value' | 'children'>;
};
