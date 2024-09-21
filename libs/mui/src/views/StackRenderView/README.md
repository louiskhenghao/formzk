# StackRenderView

Render list of items within a stack components

---

## Props

```ts
import { ReactNode } from 'react';
import { StackProps } from '@mui/material/Stack';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type StackRenderViewProps = StackProps & {
  /**
   * the breadcrumb items configuration
   */
  items?: {
    key: string;
    content: (() => ReactNode) | ReactNode;
  }[];
};
```

---

# Example

```ts
import { StackRenderView } from '@formzk/mui';
import Button from '@mui/material/Button';

<StackRenderView
  direction="row"
  items={[
    {
      key: 'button-one',
      content: () => {
        return <Button>Button One</Button>;
      },
    },
    {
      key: 'button-two',
      content: () => {
        return <Button>Button Two</Button>;
      },
    },
  ]}
/>;
```
