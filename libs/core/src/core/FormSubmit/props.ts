import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormSubmitProps = {
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
export default FormSubmitProps;
