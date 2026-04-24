import { GridProps, GridSize } from '@mui/material/Grid';

/**
 * Legacy breakpoint-prop sugar kept for backwards compatibility with the v5
 * Grid API. Accepted at input and normalized into the v6+ `size` prop by
 * `GridRenderView`.
 */
type LegacyBreakpointSizes = {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
};

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type GridFlexRowType = Omit<GridProps, 'container' | 'children'>;

export type GridFlexItemType = Omit<
  GridProps,
  'container' | 'spacing' | 'columns'
> &
  LegacyBreakpointSizes;

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
