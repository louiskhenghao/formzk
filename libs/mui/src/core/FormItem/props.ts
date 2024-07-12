import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
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
   * whether to have FormControl wrapped
   * normal: show original component
   * wrapped: wrapped with FormControl
   */
  layout?: 'normal' | 'wrapped';
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
   * caption to show below form input
   */
  caption?: ReactNode;

  /**
   * custom props
   */
  formControlWrappedProps?: FormControlProps;
  normalWrappedProps?: BoxProps;
  captionHighlightProps?: FormHelperTextProps;
  errorHighlightTextProps?: FormHelperTextProps;
};
