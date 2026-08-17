import { ReactNode } from 'react';
import {
  LabelProps,
  RadioGroupItemProps,
  RadioGroupProps as TamaguiRadioGroupProps,
  XStackProps,
} from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type RadioGroupProps = Omit<
  TamaguiRadioGroupProps,
  'children' | 'value' | 'onValueChange'
> & {
  /**
   * whether to disabled input
   */
  disabled?: boolean;
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
  value?: string | number;
  /**
   * the onChange event of the input
   */
  onChange?: (updates: string) => void;

  /**
   * custom props
   * --------------------
   */
  optionProps?: Omit<XStackProps, 'onPress'>;
  itemProps?: Omit<RadioGroupItemProps, 'value' | 'disabled' | 'children'>;
  labelProps?: Omit<LabelProps, 'htmlFor'>;
};
