# Formzk.Submit

Form submit action component

---

## Props

```TypeScript
import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type FormzkFormSubmitProps = {
  /**
   * custom render function
   */
  render: (
    submit: () => void,
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
  <Formzk.Submit render={(e) => <button onClick={e}>Submit</button>} />
</Formzk.Form>;
```
