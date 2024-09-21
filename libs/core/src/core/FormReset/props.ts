import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormzkFormResetProps = {
  /**
   * custom render function
   */
  render: (
    clear: () => void,
    options: {
      formState: UseFormReturn['formState'];
    }
  ) => ReactNode;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FormzkFormResetProps;
