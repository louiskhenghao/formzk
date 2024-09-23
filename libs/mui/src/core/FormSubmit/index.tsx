import React from 'react';
import { FormzkFormSubmit as FormzkFormCoreSubmit } from '@formzk/core';
import Button from '@mui/material/Button';

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
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || isSubmitting || isValidating}
          {...restProps}
        >
          {text}
        </Button>
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
