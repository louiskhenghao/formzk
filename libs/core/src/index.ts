import { FormzkProvider } from './core/Config';
import { FormzkForm, FormzkFormContext } from './core/Form';
import { FormzkFormErrors } from './core/FormErrors';
import { FormzkFormInput } from './core/FormInput';
import { FormzkFormReset } from './core/FormReset';
import { FormzkFormSubmit } from './core/FormSubmit';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Formzk = {
  Provider: FormzkProvider,
  FormContext: FormzkFormContext,
  Form: FormzkForm,
  Input: FormzkFormInput,
  Submit: FormzkFormSubmit,
  Reset: FormzkFormReset,
  Errors: FormzkFormErrors,
};
export * from './@types';
export * from './hooks';
export * from './components';
export * from './core/Config';
export * from './core/Form';
export * from './core/FormInput';
export * from './core/FormSubmit';
export * from './core/FormReset';
export * from './core/FormErrors';
