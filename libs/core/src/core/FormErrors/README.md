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
  render: (errors: string[]) => ReactNode;
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
    render={(errors) => {
      if (errors.length === 0) return null;
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
