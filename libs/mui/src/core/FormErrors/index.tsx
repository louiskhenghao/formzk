import React from 'react';
import { FormzkFormErrors as FormzkFormCoreErrors } from '@formzk/core';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

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
            <AlertTitle {...titleProps} fontWeight="bold">
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
