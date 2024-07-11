# Formzk.Provider

Form provider for registering components

---

## Props

```TypeScript
import { ComponentConfig, ComponentPropsMap } from '../../@types';

/**
 * The provider props
 */
export type FormzkProviderProps = {
  /**
   * config to registering components
   */
  config: ComponentConfig<keyof ComponentPropsMap>[];
};

/**
 * the hook props
 */
export type FormzkContextType = {
  /**
   * list registered components
   */
  listComponents: () => ComponentPropsMap[];
  /**
   * get specific registered component
   */
  getComponent: (
    name: keyof ComponentPropsMap
  ) => ComponentConfig<keyof ComponentPropsMap> | undefined;
  /**
   * check whether component has registered before
   */
  isRegistered: (name: keyof ComponentPropsMap) => boolean;
};

```

---

## Example

```tsx
import { Formzk } from '@formzk/core';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import TextField, { TextFieldProps } from '@mui/material/TextField';

<Formzk.Provider
  config={[
    {
      name: 'MyTextField',
      component: TextField,
      props: {
        size: 'small',
        fullWidth: true,
      } as TextFieldProps,
    },
    {
      name: 'MyCheckbox',
      component: Checkbox,
      props: {
        variant: 'outlined',
      } as CheckboxProps,
    },
  ]}
>
  {/* ... bla bla */}
</Formzk.Provider>;
```
