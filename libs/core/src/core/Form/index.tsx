import {
  createContext,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from 'react-hook-form';

import {
  FormzkFormContextProps,
  FormzkFormProps,
  FormzkFormRefProps,
} from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkFormContext = createContext<FormzkFormContextProps<
  FieldValues,
  any
> | null>(null);

// form hook
export const useFormzkForm = <
  F extends FieldValues = FieldValues,
  T = any
>(): FormzkFormContextProps<F, T> => {
  // ================ HOOKS
  const context = useContext<FormzkFormContextProps<F, T> | null>(
    FormzkFormContext as any
  );
  if (!context) {
    throw new Error(`useFormzkForm must be used inside a Formzk.Form.`);
  }

  return context;
};

// main component
const FormView = <F extends FieldValues = FieldValues, T = any>(
  props: PropsWithChildren<FormzkFormProps<F, T>>,
  ref: ForwardedRef<FormzkFormRefProps<F, T>>
) => {
  const { form: overridingForm, options = {}, children, onSubmit } = props;

  // ================ HOOKS
  const form = useForm<F, T>(options);
  const instance = useMemo(() => {
    if (!overridingForm) return form;
    return overridingForm;
  }, [overridingForm, form]);

  // ================ HANDLERS
  const onHandleSubmit = (values: F) => {
    onSubmit?.(values);
  };

  // ================ EVENTS
  const submit = useCallback(() => {
    if (!instance) {
      console.error('Form instance is not initialized!');
      return;
    }
    if (!onSubmit) {
      console.error('Submit handler is not provided!');
      return;
    }
    instance.handleSubmit(onHandleSubmit)();
  }, [instance]);

  const reset = useCallback(() => {
    if (!instance) {
      console.error('Form instance is not initialized!');
      return;
    }
    instance.reset();
  }, [instance]);

  // ================ HOOKS
  useImperativeHandle(ref, () => {
    return {
      form: instance,
      submit,
      reset,
    };
  });

  // ================ VIEWS
  return (
    <FormProvider<F, T> {...instance}>
      <FormzkFormContext.Provider
        value={{
          form: instance as UseFormReturn,
          nativeSubmit: instance.handleSubmit(onHandleSubmit),
          submit,
          reset,
        }}
      >
        {children}
      </FormzkFormContext.Provider>
    </FormProvider>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const FormzkForm = forwardRef(FormView) as <
  F extends FieldValues = FieldValues,
  T = any
>(
  props: PropsWithChildren<FormzkFormProps<F, T>> & {
    ref?: ForwardedRef<FormzkFormRefProps<F, T>>;
  }
) => ReturnType<typeof FormView>;
export default FormzkForm;
