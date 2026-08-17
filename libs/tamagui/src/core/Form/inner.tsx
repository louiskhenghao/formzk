import { PropsWithChildren, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { useFormzkForm } from '@formzk/core';
import { Form } from 'tamagui';

import { GridFlexItemType, GridRenderView } from '../../views';
import FormzkFormItemTamagui from '../FormItem';

import {
  FormzkFormTamaguiLayoutItemCustom,
  FormzkFormTamaguiLayoutItemInput,
  FormzkFormTamaguiProps,
} from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkFormTamaguiInner = <
  F extends FieldValues = FieldValues,
  T = any
>(
  props: PropsWithChildren<FormzkFormTamaguiProps<F, T>>
) => {
  const { config, configLayoutProps, formProps, children } = props;

  // ================ HOOKS
  const { nativeSubmit } = useFormzkForm();

  // ================ VARIABLES
  const formConfig = useMemo(() => {
    return (config ?? []).map((row) => {
      const rowLine: GridFlexItemType[] = row.map((item) => {
        const { layoutProps, ...restProps } = item;

        // if custom component
        if ((item as FormzkFormTamaguiLayoutItemCustom).content) {
          const content = (item as FormzkFormTamaguiLayoutItemCustom).content;
          return {
            children: typeof content === 'function' ? content() : content,
            ...layoutProps,
          };
        }

        // if have name then is input component
        if ((item as FormzkFormTamaguiLayoutItemInput<F>)?.name) {
          return {
            children: (
              <FormzkFormItemTamagui
                {...(restProps as FormzkFormTamaguiLayoutItemInput<F>)}
              />
            ),
            ...layoutProps,
          };
        }
        return {};
      });

      return rowLine;
    });
  }, [config]);

  // ================ VIEWS
  return (
    <Form {...formProps} onSubmit={nativeSubmit}>
      <GridRenderView {...configLayoutProps} items={formConfig} />
      {children}
    </Form>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormzkFormTamaguiInner;
