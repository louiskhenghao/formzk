import { XStackProps, YStackProps } from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type GridFlexRowType = Omit<XStackProps, 'children'>;

export type GridFlexItemType = YStackProps & {
  /**
   * the proportional width of the item within its row, expressed as a
   * flex-grow weight (e.g. two items with span 2 & 1 split the row 2:1)
   *
   * default: 1 (items share the row equally)
   */
  span?: number;
};

export type GridRenderViewProps = {
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
   * the row (XStack) props for all rows
   *
   * NOTE: rows lay items out horizontally by default; to stack items
   * vertically on small screens pass responsive props, e.g.
   * `{ flexDirection: 'column', $gtSm: { flexDirection: 'row' } }`
   */
  containerProps?: GridFlexRowType;
  /**
   * the item (YStack) props for all items
   */
  itemProps?: GridFlexItemType;
};
