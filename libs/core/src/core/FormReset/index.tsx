import React, { Fragment } from 'react';

import { useFormzkForm } from '../Form';

import { FormzkFormResetProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkFormReset: React.FC<FormzkFormResetProps> = (props) => {
  const { render } = props;

  // ================ HOOKS
  const { form, reset } = useFormzkForm();

  // ================ VARIABLES
  // Read the formState before render to subscribe the form state through the Proxy
  // https://react-hook-form.com/api/useform/formstate
  const { formState } = form;

  // ================ VIEWS
  return <Fragment>{render(reset, { formState })}</Fragment>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormzkFormReset;
