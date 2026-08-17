import { ReactNode } from 'react';
import { ButtonProps } from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormSubmitButtonProps = Omit<ButtonProps, 'onPress'> & {
  /**
   * the button text
   * default to "Submit"
   */
  text?: ReactNode;
};
