import { ReactNode } from 'react';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormErrorsProps = {
  /**
   * custom render function
   */
  render: (errors: string[]) => ReactNode;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FormErrorsProps;
