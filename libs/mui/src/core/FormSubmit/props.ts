import { LoadingButtonProps } from '@mui/lab/LoadingButton';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormSubmitButtonProps = LoadingButtonProps & {
  /**
   * the button text
   * default to "Submit"
   */
  text?: string;
};
