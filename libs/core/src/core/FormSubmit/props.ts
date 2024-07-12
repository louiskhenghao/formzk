import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormzkFormSubmitProps = {
  /**
   * custom render function
   */
  render: (
    submit: () => void,
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
export default FormzkFormSubmitProps;
