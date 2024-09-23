import {
  FormzkForm,
  FormzkFormContext,
  FormzkFormErrors,
  FormzkFormInput,
  FormzkFormReset,
  FormzkFormSubmit,
  FormzkProvider,
} from '@formzk/core';

import FormzkFormMUI from './core/Form';
import FormzkFormErrorsMUI from './core/FormErrors';
import FormzkFormItemMUI from './core/FormItem';
import FormzkFormResetButtonMUI from './core/FormReset';
import FormzkFormSubmitButtonMUI from './core/FormSubmit';

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
    Submit: FormzkFormSubmitButtonMUI,
    Reset: FormzkFormResetButtonMUI,
    Errors: FormzkFormErrorsMUI,
  },
};

export { useFormzk, useFormzkForm } from '@formzk/core';
// input components
export * from './components/Checkbox';
export * from './components/CheckboxGroup';
export * from './components/RadioGroup';
export * from './components/Switch';
export * from './components/Select';
// core components
export * from './core/Form';
export * from './core/FormItem';
export * from './core/FormReset';
export * from './core/FormSubmit';
export * from './core/FormErrors';
// view components
export * from './views/GridRenderView';
export * from './views/StackRenderView';
