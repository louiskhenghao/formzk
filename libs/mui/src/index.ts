import { Formzk as NativeFormZk } from '@formzk/core';

import { FormzkFormMUI } from './core/Form';
import { FormzkFormItemMUI } from './core/FormItem';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Formzk = {
  Native: NativeFormZk,
  MUI: {
    Form: FormzkFormMUI,
    Item: FormzkFormItemMUI,
  },
};
export * from './components';
export * from './views';
export { useFormzk, useFormzkForm } from '@formzk/core';
export type { FormzkFormMUIProps } from './core/Form';
export type { FormzkFormItemMUIProps } from './core/FormItem';
