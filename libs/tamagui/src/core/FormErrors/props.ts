import { SizableTextProps, YStackProps } from 'tamagui';

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
   * the stack props for alert container
   */
  containerProps?: YStackProps;
  /**
   * the text props for alert title
   */
  titleProps?: SizableTextProps;
  /**
   * the text props for error message
   */
  messageProps?: SizableTextProps;
};
