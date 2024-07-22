import { PropsWithChildren, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { useFormzkForm } from '@formzk/core';
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
export const FormzkFormMUIInner = <
  F extends FieldValues = FieldValues,
  T = any
>(
  props: PropsWithChildren<FormzkFormMUIProps<F, T>>
) => {
  const { name, config, children } = props;

  // ================ HOOKS
  const { nativeSubmit } = useFormzkForm();

  // ================ VARIABLES
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
    <form name={name} onSubmit={nativeSubmit}>
      <GridRenderView items={formConfig} />
      {children}
    </form>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormzkFormMUIInner;
