import { GridProps } from '@mui/material/Grid';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type GridFlexRowType = Omit<
  GridProps,
  'item' | 'container' | 'children'
>;

export type GridFlexItemType = Omit<
  GridProps,
  'item' | 'container' | 'spacing' | 'columns'
>;

export type GridRenderViewProps = {
  /**
   * css class name for all row
   */
  className?: string;
  /**
   * the grid row configuration
   */
  items?: (
    | { props?: GridFlexRowType; items: GridFlexItemType[] }
    | GridFlexItemType[]
  )[];

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
