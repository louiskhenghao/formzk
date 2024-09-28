import { Fragment, ReactNode, useMemo } from 'react';
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
    render,
    ...restProps
  } = props;

  // ================ VIEWS
  // label view
  const labelView = useMemo(() => {
    if (!label) return null;
    if (labelType === 'FormLabel') {
      return <FormLabel>{label}</FormLabel>;
    }
    return <InputLabel>{label}</InputLabel>;
  }, [label, labelType]);

  // render helper text
  const renderHelperText = (error?: string) => {
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

        let view = <Fragment>{comp}</Fragment>;
        // normal layout
        if (layout === 'normal') {
          view = (
            <CloneElement label={label} error={hasError}>
              {comp}
            </CloneElement>
          );
        }
        // contained layout
        if (layout === 'contained') {
          view = (
            <Box {...normalWrappedProps}>
              <CloneElement label={label}>{comp}</CloneElement>
              {renderHelperText(error)}
            </Box>
          );
        }
        // wrapped layout
        if (layout === 'wrapped') {
          view = (
            <FormControl
              fullWidth
              margin="normal"
              {...formControlWrappedProps}
              error={hasError}
            >
              {labelView}
              {comp}
              {renderHelperText(error)}
            </FormControl>
          );
        }

        if (render) {
          return render(view, state);
        }
        return view;
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
