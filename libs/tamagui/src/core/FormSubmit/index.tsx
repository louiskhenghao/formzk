import React from 'react';
import { FormzkFormSubmit as FormzkFormCoreSubmit } from '@formzk/core';
import { Button } from 'tamagui';

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
      render={(e, { formState: { isLoading, isSubmitting, isValidating } }) => {
        const busy = isLoading || isSubmitting || isValidating;
        return (
          <Button
            themeInverse
            disabled={busy}
            opacity={busy ? 0.6 : 1}
            {...restProps}
            onPress={() => e()}
          >
            {text}
          </Button>
        );
      }}
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
