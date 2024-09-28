import { ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { ComponentPropsMap, FormzkFormInputProps } from '@formzk/core';
import { BoxProps } from '@mui/material/Box';
import { FormControlProps } from '@mui/material/FormControl';
import { FormHelperTextProps } from '@mui/material/FormHelperText';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export type FormzkFormItemMUIProps<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = Omit<FormzkFormInputProps<F, K>, 'render'> & {
  /**
   * display component with desired layout
   * * `none`: show original component
   * * `normal`: show original component,
   *   * inject label & error props to displaying component
   * * `contained`: wrapped with `Box`
   *   * inject label props to displaying component
   *   * showing helper text underneath
   * * `wrapped`: wrapped with FormControl (full-width & error injected)
   *   * showing label above
   *   * showing helper text underneath
   *
   * default: wrapped
   */
  layout?: 'none' | 'normal' | 'wrapped' | 'contained';
  /**
   * whether to highlight error if error message present
   * default: true
   */
  enableHighlightError?: boolean;
  /**
   * label of the form item
   */
  label?: ReactNode;
  /**
   * * Added 1.0.3
   * The label type
   *
   * NOTE: only applied for `wrapped` layout
   *
   * default `FormLabel`
   */
  labelType?: 'FormLabel' | 'InputLabel';
  /**
   * caption to show below form input
   */
  caption?: ReactNode;

  /**
   * custom props
   * ------------------------
   */
  formControlWrappedProps?: FormControlProps;
  normalWrappedProps?: BoxProps;
  captionHighlightProps?: FormHelperTextProps;
  errorHighlightTextProps?: FormHelperTextProps;

  /**
   * * Added 1.0.3
   * the custom render function
   */
  render?: (
    comp: ReactNode,
    options: {
      field: ControllerRenderProps<F>;
      formState: UseFormStateReturn<F>;
      fieldState: ControllerFieldState;
    }
  ) => ReactNode;
};
