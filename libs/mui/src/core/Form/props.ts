import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import { ComponentPropsMap, FormzkFormProps } from '@formzk/core';

import {
  GridFlexItemType,
  GridRenderViewProps,
} from '../../views/GridRenderView';
import { FormzkFormItemMUIProps } from '../FormItem';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export type FormzkFormMUILayoutItemCustom = {
  content: ReactNode;
  layoutProps?: GridFlexItemType;
};

export type FormzkFormMUILayoutItemInput<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = FormzkFormItemMUIProps<F, K> & {
  layoutProps?: GridFlexItemType;
};

export type FormzkFormMUILayoutProps<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = FormzkFormMUILayoutItemInput<F, K> | FormzkFormMUILayoutItemCustom;

export type FormzkFormMUIProps<
  F extends FieldValues = FieldValues,
  T = any
> = FormzkFormProps<F, T> & {
  name?: string;
  /**
   * the config that used to build form layout
   */
  config?: FormzkFormMUILayoutProps<F, keyof ComponentPropsMap>[][];
  /**
   * Added 1.0.1
   *
   * the config grid layout props
   */
  configLayoutProps?: Omit<GridRenderViewProps, 'items' | 'className'>;
};
