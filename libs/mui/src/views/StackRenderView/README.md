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
export type RenderNodeViewProps = StackProps & {
  /**
   * the breadcrumb items configuration
   */
  items?: {
    key: string;
    content: (() => ReactNode) | ReactNode;
  }[];
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default RenderNodeViewProps;
```

---

# Example

```ts
import { StackRenderView } from '@formzk/mui';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button;

<StackRenderView
  direction="row"
  items={[
    {
      key: "create",
      content: () => {
        return <Button>Create Button</Button>
      }
    },
    {
      key: "icon",
      content: () => {
        return <HomeIcon />
      }
    },
  ]}
/>;
```
