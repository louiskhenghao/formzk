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

export { useFormzk, useFormzkForm } from '@formzk/core';
export * from './components';
export * from './core';
export * from './views';
