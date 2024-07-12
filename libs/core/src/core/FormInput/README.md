# Formzk.Input

Form input component

---

## Props

```TypeScript
import { ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormStateReturn,
} from 'react-hook-form';

import { ComponentPropsMap } from '../../@types';

export type FormzkFormInputProps<
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = {
  /**
   * the name of the field
   */
  name: FieldPath<F>;
  /**
   * the registered name of component
   */
  component: K;
  /**
   * the event key that to update field value
   * default: "onChange"
   */
  eventKey?: 'onChange' | string;
  /**
   * the value key that used to received field value
   * default: "value"
   */
  valueKey?: 'value' | string;
  /**
   * the props that inject to registered component
   */
  props?: ComponentPropsMap[K];
  /**
   * the form field props
   */
  field?: Pick<
    UseControllerProps<F, FieldPath<F>>,
    'disabled' | 'rules' | 'shouldUnregister' | 'defaultValue'
  >;
  /**
   * the custom render function
   */
  render?: (
    comp: ReactNode,
    options: {
      field: ControllerRenderProps<F>;
      formState: UseFormStateReturn<F>;
      fieldState: ControllerFieldState;
    }
  ) => ReactNode;
};
```

---

## Example

```tsx
import { Formzk } from '@formzk/core';

// 1. register component at provider
<Formzk.Provider
  config={[
    {
      name: 'MyTextField', // <--- registering name
      component: TextField, // <--- registering component
      props: { // <--- default props that injecting to component
        size: 'small',
        fullWidth: true,
      } as TextFieldProps,
    },
  ]}
>
  {/* ... bla bla */}
</Formzk.Provider>


// 2. usage under form
<Formzk.Form<InputPayload>
  {/* ... props */}
>
  {/* ==== USAGE 1 */}
  <Formzk.Input name="email" component="MyTextField" />

  {/* ==== USAGE 2 */}
  <Formzk.Input
    name="xyx"
    component="MyTextField"
    field={{
      defaultValue: 'some default value',
    }}
  />

  {/* ==== USAGE 3 */}
  <Formzk.Input
    name="password"
    component="MyTextField"
    field={{
      defaultValue: '12345678910',
    }}
    render={(comp, { fieldState }) => {
      return (
        <div>
          <label>Password</label>
          {comp}
          <span style={{ color: 'red' }}>{fieldState.error?.message}</span>
        </div>
      );
    }}
  />

  <Formzk.Submit render={(e) => <Button onClick={e}>Submit</Button>} />
</Formzk.Form>;
```
