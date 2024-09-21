# GridRenderView

Render grid items with provided list

---

## Props

```ts
import { GridProps } from '@mui/material/Grid';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type GridFlexRowType = Omit<GridProps, 'item' | 'container' | 'children'>;

export type GridFlexItemType = Omit<GridProps, 'item' | 'container' | 'spacing' | 'columns'>;

export type GridRenderViewProps = {
  /**
   * css class name for all row
   */
  className?: string;
  /**
   * the grid row configuration
   */
  items?: ({ props?: GridFlexRowType; items: GridFlexItemType[] } | GridFlexItemType[])[];

  /**
   * CUSTOM PROPS
   * ===========================
   */

  /**
   * the grid container props for all rows
   */
  containerProps?: GridFlexRowType;
  /**
   * the grid item props for all items
   */
  itemProps?: GridFlexItemType;
};
```

---

# Example

```ts
import { GridRenderView } from '@formzk/mui';

<GridRenderView
  items={[
    [
      { children: '1-1', xs: 12, sm: 'auto', md: 6 },
      { children: '1-2' },
      { children: '1-3' },
      { children: '1-4' },
    ],

    [{ children: '2-1' }, { children: '2-2' }],
    [{ children: '3-1' }, { children: '3-2' }],
  ]}
/>

<GridRenderView
  items={[
    {
      items: [
        { children: '1-1' },
        { children: '1-2' },
        { children: '1-3' },
      ],
    },
    { items: [{ children: '2-1' }, { children: '2-2' }] },
    { items: [{ children: '3-1' }, { children: '3-2' }] },
  ]}
/>
```
