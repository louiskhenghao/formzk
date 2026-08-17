import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import { ComponentPropsMap, FormzkFormProps } from '@formzk/core';
import { FormProps } from 'tamagui';

import {
  GridFlexItemType,
  GridRenderViewProps,
} from '../../views/GridRenderView';
import { FormzkFormItemTamaguiProps } from '../FormItem';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export type FormzkFormTamaguiLayoutItemCustom = {
  /**
   * Allow custom render
   */
  content: (() => ReactNode) | ReactNode;
  layoutProps?: GridFlexItemType;
};

export type FormzkFormTamaguiLayoutItemInput<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = FormzkFormItemTamaguiProps<F, K> & {
  layoutProps?: GridFlexItemType;
};

export type FormzkFormTamaguiLayoutProps<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = FormzkFormTamaguiLayoutItemInput<F, K> | FormzkFormTamaguiLayoutItemCustom;

export type FormzkFormTamaguiProps<
  F extends FieldValues = FieldValues,
  T = any
> = FormzkFormProps<F, T> & {
  /**
   * the config that used to build form layout
   */
  config?: FormzkFormTamaguiLayoutProps<F, keyof ComponentPropsMap>[][];
  /**
   * the config grid layout props
   */
  configLayoutProps?: Omit<GridRenderViewProps, 'items'>;
  /**
   * the props for the underlying Tamagui `Form` element
   */
  formProps?: Omit<FormProps, 'onSubmit' | 'children'>;
};
