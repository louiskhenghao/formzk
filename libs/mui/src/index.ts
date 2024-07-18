import {
  FormzkForm,
  FormzkFormContext,
  FormzkFormErrors,
  FormzkFormInput,
  FormzkFormReset,
  FormzkFormSubmit,
  FormzkProvider,
} from '@formzk/core';

import { FormzkFormMUI } from './core/Form';
import { FormzkFormItemMUI } from './core/FormItem';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Formzk = {
  Native: {
    Provider: FormzkProvider,
    FormContext: FormzkFormContext,
    Form: FormzkForm,
    Input: FormzkFormInput,
    Submit: FormzkFormSubmit,
    Reset: FormzkFormReset,
    Errors: FormzkFormErrors,
  },
  MUI: {
    Provider: FormzkProvider,
    Form: FormzkFormMUI,
    Item: FormzkFormItemMUI,
  },
};
export * from './components';
export * from './views';
export { useFormzk, useFormzkForm } from '@formzk/core';
export type { FormzkFormMUIProps } from './core/Form';
export type { FormzkFormItemMUIProps } from './core/FormItem';
