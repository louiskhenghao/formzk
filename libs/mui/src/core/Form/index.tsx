import { ForwardedRef, forwardRef, PropsWithChildren, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { Formzk, FormzkFormRefProps } from '@formzk/core';
import map from 'lodash/map';

import { GridRenderView } from '../../views';
import FormzkFormItemMUI from '../FormItem';

import {
  FormzkFormMUILayoutItemCustom,
  FormzkFormMUILayoutItemInput,
  FormzkFormMUIProps,
} from './props';

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

  // ================ HOOKS
  const formConfig = useMemo(() => {
    return map(config, (row) =>
      map(row, (item) => {
        const { layoutProps, ...restProps } = item;

        // if have name then is input component
        if ((item as FormzkFormMUILayoutItemInput<F>)?.name) {
          return {
            children: (
              <FormzkFormItemMUI
                {...(restProps as FormzkFormMUILayoutItemInput<F>)}
              />
            ),
            ...layoutProps,
          };
        }

        // if custom component
        if ((item as FormzkFormMUILayoutItemCustom).content) {
          return {
            children: (item as FormzkFormMUILayoutItemCustom).content,
            ...layoutProps,
          };
        }
        return <></>;
      })
    );
  }, [config]);

  // ================ VIEWS
  return (
    <Formzk.Form<F, T> ref={ref} {...restProps}>
      <Formzk.FormContext.Consumer>
        {(value) => (
          <form name={name} onSubmit={value?.nativeSubmit}>
            <GridRenderView items={formConfig} />
            {children}
          </form>
        )}
      </Formzk.FormContext.Consumer>
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
