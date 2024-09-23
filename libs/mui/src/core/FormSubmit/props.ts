import { ReactNode } from 'react';
import { ButtonProps } from '@mui/material/Button';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormSubmitButtonProps = Omit<ButtonProps, 'type'> & {
  /**
   * the button text
   * default to "Submit"
   */
  text?: ReactNode;
};
