import { FieldValues } from 'react-hook-form';
import { CloneElement, ComponentPropsMap, Formzk } from '@formzk/core';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';

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
    layout = 'normal',
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
      render={(comp, { fieldState }) => {
        const error = fieldState.error?.message;
        if (layout === 'normal') {
          return (
            <Box {...normalWrappedProps}>
              <CloneElement label={label}>{comp}</CloneElement>
              {renderHighlight(error)}
            </Box>
          );
        }
        return (
          <FormControl fullWidth margin="normal" {...formControlWrappedProps}>
            {label && <FormLabel>{label}</FormLabel>}
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
