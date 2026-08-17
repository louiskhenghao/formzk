import { ReactNode } from 'react';
import {
  LabelProps,
  SwitchProps as TamaguiSwitchProps,
  SwitchThumbProps,
  XStackProps,
} from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type SwitchProps = Omit<XStackProps, 'onPress'> & {
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
   * custom props
   * --------------------
   */
  switchProps?: Omit<
    TamaguiSwitchProps,
    'checked' | 'onCheckedChange' | 'children'
  >;
  thumbProps?: SwitchThumbProps;
  labelProps?: Omit<LabelProps, 'htmlFor'>;
};
