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
  selectProps?: Omit<MuiSelectProps<string>, 'label' | 'value' | 'onChange'>;
  itemProps?: Omit<MenuItemProps, 'value' | 'children'>;
};
