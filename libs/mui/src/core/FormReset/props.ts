import { ReactNode } from 'react';
import { ButtonProps } from '@mui/material/Button';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormResetButtonProps = Omit<ButtonProps, 'type'> & {
  /**
   * the button text
   * default to "Reset"
   */
  text?: ReactNode;
};
