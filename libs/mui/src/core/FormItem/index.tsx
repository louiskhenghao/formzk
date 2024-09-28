import { FieldValues } from 'react-hook-form';
import { CloneElement, ComponentPropsMap, Formzk } from '@formzk/core';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';

import { FormzkFormItemMUIProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkFormItemMUI = <
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
>(
  props: FormzkFormItemMUIProps<F, K>
) => {
  const {
    label,
    caption,
    layout = 'contained',
    labelType = 'FormLabel',
    enableHighlightError = true,
    normalWrappedProps,
    formControlWrappedProps,
    captionHighlightProps,
    errorHighlightTextProps,
    ...restProps
  } = props;

  // ================ VIEWS
  const renderHighlight = (error?: string) => {
    return (
      <>
        {caption && (
          <FormHelperText {...captionHighlightProps}>{caption}</FormHelperText>
        )}
        {enableHighlightError && error && (
          <FormHelperText error {...errorHighlightTextProps}>
            {error}
          </FormHelperText>
        )}
      </>
    );
  };

  return (
    <Formzk.Input
      {...restProps}
      render={(comp, state) => {
        const { fieldState } = state;
        const error = fieldState.error?.message;
        const hasError = !!error;
        // contained layout
        if (layout === 'contained') {
          return (
            <Box {...normalWrappedProps}>
              <CloneElement label={label} error={hasError}>
                {comp}
              </CloneElement>
              {renderHighlight(error)}
            </Box>
          );
        }
        // normal layout
        if (layout === 'normal') {
          return (
            <CloneElement label={label} error={hasError}>
              {comp}
            </CloneElement>
          );
        }
        // wrapped layout
        return (
          <FormControl
            fullWidth
            margin="normal"
            {...formControlWrappedProps}
            error={hasError}
          >
            {label && labelType === 'FormLabel' && (
              <FormLabel>{label}</FormLabel>
            )}
            {label && labelType === 'InputLabel' && (
              <InputLabel>{label}</InputLabel>
            )}
            {comp}
            {renderHighlight(error)}
          </FormControl>
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
export default FormzkFormItemMUI;
