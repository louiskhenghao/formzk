import { ReactNode } from 'react';
import { YStackProps } from 'tamagui';

import { CheckboxProps } from '../Checkbox';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type CheckboxGroupProps = Omit<YStackProps, 'children'> & {
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
    CheckboxProps,
    'label' | 'checked' | 'disabled' | 'onChange'
  >;
};
