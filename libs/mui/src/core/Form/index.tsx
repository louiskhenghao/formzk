import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { FieldValues } from 'react-hook-form';
import { Formzk, FormzkFormRefProps } from '@formzk/core';

import FormzkFormMUIInner from './inner';
import { FormzkFormMUIProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const FormzkFormMUIView = <F extends FieldValues = FieldValues, T = any>(
  props: PropsWithChildren<FormzkFormMUIProps<F, T>>,
  ref: ForwardedRef<FormzkFormRefProps<F, T>>
) => {
  const { name, config, children, ...restProps } = props;

  // ================ VIEWS
  return (
    <Formzk.Form<F, T> ref={ref} {...restProps}>
      <FormzkFormMUIInner name={name} config={config}>
        {children}
      </FormzkFormMUIInner>
    </Formzk.Form>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const FormzkFormMUI = forwardRef(FormzkFormMUIView) as <
  F extends FieldValues = FieldValues,
  T = any
>(
  props: PropsWithChildren<FormzkFormMUIProps<F, T>> & {
    ref?: ForwardedRef<FormzkFormRefProps<F, T>>;
  }
) => ReturnType<typeof FormzkFormMUIView>;
export default FormzkFormMUI;
