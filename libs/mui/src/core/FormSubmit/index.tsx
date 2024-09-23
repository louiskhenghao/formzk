import React from 'react';
import { FormzkFormSubmit as FormzkFormCoreSubmit } from '@formzk/core';
import LoadingButton from '@mui/lab/LoadingButton';

import { FormSubmitButtonProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormSubmitButton: React.FC<FormSubmitButtonProps> = (props) => {
  const { text = 'Submit', ...restProps } = props;

  // ================ VIEWS
  return (
    <FormzkFormCoreSubmit
      render={(e, { formState: { isLoading, isSubmitting, isValidating } }) => (
        <LoadingButton
          type="submit"
          variant="outlined"
          loading={isLoading || isSubmitting || isValidating}
          {...restProps}
        >
          {text}
        </LoadingButton>
      )}
    />
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormSubmitButton;
