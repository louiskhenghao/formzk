import { Fragment } from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { ComponentPropsMap } from '../../@types';
import { useFormzk } from '../Config';
import { useFormzkForm } from '../Form';

import { FormzkFormInputProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkFormInput = <
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

  // ================ VARIABLES
  const Component = getComponent(component);

  // ================ VIEWS
  if (!Component) {
    console.warn(`Component with name ${component} is not registered.`);
    return null;
  }

  return (
    <Controller
      name={name}
      control={form?.control}
      disabled={disabled}
      {...fieldProps}
      render={({ field, fieldState, formState }) => {
        // reusable view variable
        const view = (
          <Component.component
            {...inputProps}
            {...Component.props}
            disabled={disabled}
            {...{ [`${valueKey}`]: field.value }}
            {...{ [`${eventKey}`]: field.onChange }}
          />
        );
        // if not custom view
        if (!render) {
          return <Fragment>{view}</Fragment>;
        }
        // if custom view
        return (
          <Fragment>
            {render(view, {
              field,
              formState,
              fieldState,
            })}
          </Fragment>
        );
      }}
    />
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormzkFormInput;
