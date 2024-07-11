import React, { useMemo } from 'react';
import reduce from 'lodash/reduce';

import { useFormzkForm } from '../Form';

import { FormErrorsProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormErrors: React.FC<FormErrorsProps> = (props) => {
  const { render } = props;

  // ================ HOOKS
  const { form } = useFormzkForm();

  // ================ VARIABLES
  // Read the formState before render to subscribe the form state through the Proxy
  // https://react-hook-form.com/api/useform/formstate
  const { formState } = form;
  const errors = formState.errors;
  const notices = useMemo(() => {
    return reduce(
      errors as any,
      (r: string[], e: any) => {
        r.push(e.message);
        return r;
      },
      []
    );
  }, [errors]);

  // ================ VIEWS
  return <>{render(notices)}</>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormErrors;
