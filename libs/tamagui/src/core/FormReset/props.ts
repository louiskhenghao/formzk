import { ReactNode } from 'react';
import { ButtonProps } from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormResetButtonProps = Omit<ButtonProps, 'onPress'> & {
  /**
   * the button text
   * default to "Reset"
   */
  text?: ReactNode;
};
