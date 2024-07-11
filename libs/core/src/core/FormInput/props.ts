import { ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormStateReturn,
} from 'react-hook-form';

import { ComponentPropsMap } from '../../@types';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormzkFormInputProps<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = {
  /**
   * the name of the field
   */
  name: FieldPath<F>;
  /**
   * the registered name of component
   */
  component: K;
  /**
   * the event key that to update field value
   * default: "onChange"
   */
  eventKey?: 'onChange' | string;
  /**
   * the value key that used to received field value
   * default: "value"
   */
  valueKey?: 'value' | string;
  /**
   * whether to disabled field, including field update
   */
  disabled?: boolean;
  /**
   * the props that inject to registered component
   */
  props?: ComponentPropsMap[K];
  /**
   * the form field props
   */
  field?: Pick<
    UseControllerProps<F, FieldPath<F>>,
    'rules' | 'shouldUnregister' | 'defaultValue'
  >;
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

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FormzkFormInputProps;
