import { LoadingButtonProps } from '@mui/lab/LoadingButton';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormResetButtonProps = LoadingButtonProps & {
  /**
   * the button text
   * default to "Reset"
   */
  text?: string;
};
