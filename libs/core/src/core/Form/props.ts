import { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export type FormzkFormContextProps<
  F extends FieldValues = FieldValues,
  T = any
> = {
  /**
   * form context from react-hook-form
   */
  form: UseFormReturn<F, T>;
  /**
   * native form submission function
   */
  nativeSubmit: () => void;
  /**
   * form submission function
   */
  submit: () => void;
  /**
   * form reset function
   */
  reset: () => void;
};

export type FormzkFormProps<F extends FieldValues = FieldValues, T = any> = {
  /**
   * overriding form instance
   */
  form?: UseFormReturn<F, T>;
  /**
   * options for react-hook-form
   */
  options?: UseFormProps<F, T>;
  /**
   * the submit function callback with form values
   */
  onSubmit?: (values: F) => void;
};

export type FormzkFormRefProps<F extends FieldValues = FieldValues, T = any> = {
  /**
   * form context from react-hook-form
   */
  form: UseFormReturn<F, T>;

  /**
   * form submission function
   */
  submit: () => void;
  /**
   * form reset function
   */
  reset: () => void;
};
