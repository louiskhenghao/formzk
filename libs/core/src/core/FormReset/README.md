# Formzk.Reset

Form reset action component

---

## Props

```TypeScript
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type FormzkFormResetProps = {
  /**
   * custom render function
   */
  render: (
    clear: () => void,
    options: {
      formState: UseFormReturn['formState'];
    }
  ) => ReactNode;
};
```

---

## Example

```tsx
import { Formzk } from '@formzk/core';

<Formzk.Form
  {/* ... some props */}
>
  {/* ... bla bla */}

  {/* ADD RESET BUTTON */}
  <Formzk.Reset render={(e) => <button onClick={e}>Reset</button>} />
</Formzk.Form>;
```
