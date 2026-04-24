import React from 'react';
import { FormzkFormErrors as FormzkFormCoreErrors } from '@formzk/core';
import { Alert, AlertTitle, Typography } from '@mui/material';

import { FormErrorsViewProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormErrorsView: React.FC<FormErrorsViewProps> = (props) => {
  const { title = 'Error', containerProps, titleProps, messageProps } = props;

  // ================ VIEWS
  return (
    <FormzkFormCoreErrors
      render={(hasError, errors) => {
        if (!hasError) return null;
        return (
          <Alert severity="error" {...containerProps}>
            <AlertTitle {...titleProps} sx={{ fontWeight: 'bold' }}>
              {title}
            </AlertTitle>
            {/* error message */}
            {errors.map((e, i) => {
              return (
                <Typography key={i} {...messageProps}>
                  {e}
                </Typography>
              );
            })}
          </Alert>
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
export default FormErrorsView;
