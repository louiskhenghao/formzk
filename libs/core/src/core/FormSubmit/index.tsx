import React, { Fragment } from 'react';

import { useFormzkForm } from '../Form';

import { FormzkFormSubmitProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkFormSubmit: React.FC<FormzkFormSubmitProps> = (props) => {
  const { render } = props;

  // ================ HOOKS
  const { form, submit } = useFormzkForm();

  // ================ VARIABLES
  // Read the formState before render to subscribe the form state through the Proxy
  // https://react-hook-form.com/api/useform/formstate
  const { formState } = form;

  // ================ VIEWS
  return <Fragment>{render(submit, { formState })}</Fragment>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormzkFormSubmit;
