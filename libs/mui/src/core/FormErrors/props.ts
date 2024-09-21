import { AlertProps } from '@mui/material/Alert';
import { AlertTitleProps } from '@mui/material/AlertTitle';
import { TypographyProps } from '@mui/material/Typography';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormErrorsViewProps = {
  /**
   * the title text
   * default to "Error"
   */
  title?: string;
  /**
   * the box props for alert container
   */
  containerProps?: AlertProps;
  /**
   * the title props for alert title
   */
  titleProps?: AlertTitleProps;
  /**
   * typography props for error message
   */
  messageProps?: TypographyProps;
};
