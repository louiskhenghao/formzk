import React from 'react';
import { FormzkFormReset as FormzkFormCoreReset } from '@formzk/core';
import { Button } from 'tamagui';

import { FormResetButtonProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormResetButton: React.FC<FormResetButtonProps> = (props) => {
  const { text = 'Reset', ...restProps } = props;

  // ================ VIEWS
  return (
    <FormzkFormCoreReset
      render={(e) => (
        <Button {...restProps} onPress={() => e()}>
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
export default FormResetButton;
