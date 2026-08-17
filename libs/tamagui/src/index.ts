import {
  FormzkForm,
  FormzkFormContext,
  FormzkFormErrors,
  FormzkFormInput,
  FormzkFormReset,
  FormzkFormSubmit,
  FormzkProvider,
} from '@formzk/core';

import FormzkFormTamagui from './core/Form';
import FormzkFormErrorsTamagui from './core/FormErrors';
import FormzkFormItemTamagui from './core/FormItem';
import FormzkFormResetButtonTamagui from './core/FormReset';
import FormzkFormSubmitButtonTamagui from './core/FormSubmit';

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
  Tamagui: {
    Provider: FormzkProvider,
    Form: FormzkFormTamagui,
    Item: FormzkFormItemTamagui,
    Submit: FormzkFormSubmitButtonTamagui,
    Reset: FormzkFormResetButtonTamagui,
    Errors: FormzkFormErrorsTamagui,
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
