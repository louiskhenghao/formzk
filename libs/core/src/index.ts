import { FormzkProvider } from './core/Config';
import { Form, FormzkFormContext } from './core/Form';
import { FormErrors } from './core/FormErrors';
import { FormInput } from './core/FormInput';
import { FormReset } from './core/FormReset';
import { FormSubmit } from './core/FormSubmit';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Formzk = {
  Provider: FormzkProvider,
  FormContext: FormzkFormContext,
  Form: Form,
  Input: FormInput,
  Submit: FormSubmit,
  Reset: FormReset,
  Errors: FormErrors,
};
export * from './@types';
export * from './hooks';
export * from './components';
export { useFormzk } from './core/Config';
export { useFormzkForm } from './core/Form';
export type { FormzkFormInputProps } from './core/FormInput';
export type { FormzkFormProps, FormzkFormRefProps } from './core/Form';
export type { FormzkContextType, FormzkProviderProps } from './core/Config';
