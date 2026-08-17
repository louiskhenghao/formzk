import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { FieldValues } from 'react-hook-form';
import { Formzk, FormzkFormRefProps } from '@formzk/core';

import FormzkFormTamaguiInner from './inner';
import { FormzkFormTamaguiProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const FormzkFormTamaguiView = <F extends FieldValues = FieldValues, T = any>(
  props: PropsWithChildren<FormzkFormTamaguiProps<F, T>>,
  ref: ForwardedRef<FormzkFormRefProps<F, T>>
) => {
  const { config, configLayoutProps, formProps, children, ...restProps } =
    props;

  // ================ VIEWS
  return (
    <Formzk.Form<F, T> ref={ref} {...restProps}>
      <FormzkFormTamaguiInner
        config={config}
        configLayoutProps={configLayoutProps}
        formProps={formProps}
      >
        {children}
      </FormzkFormTamaguiInner>
    </Formzk.Form>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const FormzkFormTamagui = forwardRef(FormzkFormTamaguiView) as <
  F extends FieldValues = FieldValues,
  T = any
>(
  props: PropsWithChildren<FormzkFormTamaguiProps<F, T>> & {
    ref?: ForwardedRef<FormzkFormRefProps<F, T>>;
  }
) => ReturnType<typeof FormzkFormTamaguiView>;
export default FormzkFormTamagui;
