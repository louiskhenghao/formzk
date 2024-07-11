import React from 'react';
import { FieldValues, useController } from 'react-hook-form';

import { ComponentPropsMap } from '../../@types';
import { useFormzk } from '../Config';
import { useFormzkForm } from '../Form';

import { FormzkFormInputProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormInput = <
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
>(
  props: FormzkFormInputProps<F, K>
) => {
  const {
    name,
    component,
    disabled = false,
    eventKey = 'onChange',
    valueKey = 'value',
    props: inputProps,
    field: fieldProps,
    render,
  } = props;

  // ================ HOOKS
  const { getComponent } = useFormzk();
  const { form } = useFormzkForm<F>();
  const { field, fieldState, formState } = useController<F>({
    name,
    control: form?.control,
    disabled,
    ...fieldProps,
  });

  // ================ VARIABLES
  const Component = getComponent(component);

  // ================ VIEWS
  if (!Component) {
    console.warn(`Component with name ${component} is not registered.`);
    return null;
  }

  // if has custom render
  if (render) {
    return render(
      <Component.component
        {...inputProps}
        {...Component.props}
        disabled={disabled}
        {...{ [`${valueKey}`]: field.value }}
        {...{ [`${eventKey}`]: field.onChange }}
      />,
      {
        field,
        formState,
        fieldState,
      }
    );
  }
  return (
    <Component.component
      {...inputProps}
      {...Component.props}
      disabled={disabled}
      {...{ [`${valueKey}`]: field.value }}
      {...{ [`${eventKey}`]: field.onChange }}
    />
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormInput;
