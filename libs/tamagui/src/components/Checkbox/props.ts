import { ReactNode } from 'react';
import {
  CheckboxProps as TamaguiCheckboxProps,
  LabelProps,
  XStackProps,
} from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type CheckboxProps = Omit<XStackProps, 'onPress'> & {
  /**
   * label to display beside input
   */
  label?: ReactNode;
  /**
   * indicate input whether is checked
   */
  checked?: boolean;
  /**
   * whether to disabled input
   */
  disabled?: boolean;
  /**
   * the onChange event of the input
   */
  onChange?: (updates: boolean) => void;
  /**
   * the indicator content shown when checked
   * default: a check mark text
   */
  indicator?: ReactNode;

  /**
   * custom props
   * --------------------
   */
  checkboxProps?: Omit<
    TamaguiCheckboxProps,
    'checked' | 'onCheckedChange' | 'children'
  >;
  labelProps?: Omit<LabelProps, 'htmlFor'>;
};
