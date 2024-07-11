import React from 'react';

import { useFormzkForm } from '../Form';

import { FormResetProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormReset: React.FC<FormResetProps> = (props) => {
  const { render } = props;

  // ================ HOOKS
  const { form, reset } = useFormzkForm();

  // ================ VARIABLES
  // Read the formState before render to subscribe the form state through the Proxy
  // https://react-hook-form.com/api/useform/formstate
  const { formState } = form;

  // ================ VIEWS
  return <>{render(reset, { formState })}</>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormReset;
