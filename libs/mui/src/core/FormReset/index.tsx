import React from 'react';
import { FormzkFormReset as FormzkFormCoreReset } from '@formzk/core';
import LoadingButton from '@mui/lab/LoadingButton';

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
        <LoadingButton type="reset" {...restProps} onClick={e}>
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
export default FormResetButton;
