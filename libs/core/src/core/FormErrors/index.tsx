import React, { useMemo } from 'react';
import reduce from 'lodash/reduce';

import { useFormzkForm } from '../Form';

import { FormzkFormErrorsProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkFormErrors: React.FC<FormzkFormErrorsProps> = (props) => {
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
  return <>{render(notices.length > 0, notices)}</>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormzkFormErrors;
