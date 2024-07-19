# Formzk.Errors

Component that show form validation errors

---

## Props

```TypeScript
import { ReactNode } from 'react';

export type FormzkFormErrorsProps = {
  /**
   * custom render function
   */
  render: (hasError: boolean, errors: string[]) => ReactNode;
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

  {/* SHOW FORM ERRORS */}
  <Formzk.Errors
    render={(hasError, errors) => {
      if (!hasError) return null;
      return (
        <div style={{ padding: '0.5rem', background: '#f87171' }}>
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      );
    }}
  />
</Formzk.Form>;
```
