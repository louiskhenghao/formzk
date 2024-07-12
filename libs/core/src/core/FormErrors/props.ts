import { ReactNode } from 'react';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormzkFormErrorsProps = {
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
export default FormzkFormErrorsProps;
