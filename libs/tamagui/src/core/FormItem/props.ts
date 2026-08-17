import { ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { ComponentPropsMap, FormzkFormInputProps } from '@formzk/core';
import { LabelProps, SizableTextProps, YStackProps } from 'tamagui';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export type FormzkFormItemTamaguiProps<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = Omit<FormzkFormInputProps<F, K>, 'render'> & {
  /**
   * display component with desired layout
   * * `none`: show original component
   * * `normal`: show original component,
   *   * inject label & error props to displaying component
   * * `contained`: wrapped with `YStack`
   *   * inject label props to displaying component
   *   * showing helper text underneath
   * * `wrapped`: wrapped with `YStack` (error injected)
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
   * caption to show below form input
   */
  caption?: ReactNode;

  /**
   * custom props
   * ------------------------
   */
  wrappedContainerProps?: YStackProps;
  normalWrappedProps?: YStackProps;
  labelProps?: LabelProps;
  captionHighlightProps?: SizableTextProps;
  errorHighlightTextProps?: SizableTextProps;

  /**
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
