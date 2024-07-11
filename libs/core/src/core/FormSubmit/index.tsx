import React from 'react';

import { useFormzkForm } from '../Form';

import { FormSubmitProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormSubmit: React.FC<FormSubmitProps> = (props) => {
  const { render } = props;

  // ================ HOOKS
  const { form, submit } = useFormzkForm();

  // ================ VARIABLES
  // Read the formState before render to subscribe the form state through the Proxy
  // https://react-hook-form.com/api/useform/formstate
  const { formState } = form;

  // ================ VIEWS
  return <>{render(submit, { formState })}</>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormSubmit;
