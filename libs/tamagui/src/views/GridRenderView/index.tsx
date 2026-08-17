import React, { useMemo } from 'react';
import { XStack, YStack } from 'tamagui';

import { GridFlexItemType, GridRenderViewProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const GridRenderView: React.FC<GridRenderViewProps> = (props) => {
  const { items = [], containerProps, itemProps } = props;

  // =============== HOOKS
  const views = useMemo(() => {
    // render grid item
    const renderItem = (options: {
      rowIndex: number;
      itemIndex: number;
      item: GridFlexItemType;
    }) => {
      const { rowIndex, itemIndex, item } = options;
      const { span = 1, ...restItemProps } = { ...itemProps, ...item };
      return (
        <YStack
          key={`grid-item-${rowIndex}-${itemIndex}`}
          flexGrow={span}
          flexShrink={1}
          flexBasis={0}
          {...restItemProps}
        />
      );
    };

    // render grid rows
    return items.map((row, rowIndex) => {
      // make sure empty item didn't go through
      if (!row) return null;
      const rowItems = Array.isArray(row) ? row : row.items ?? [];
      if (rowItems.length === 0) return null;
      return (
        <XStack
          key={`grid-container-${rowIndex}`}
          gap="$2"
          {...containerProps}
          {...(Array.isArray(row) ? {} : row?.props ?? {})}
        >
          {rowItems.map((item, itemIndex) =>
            renderItem({ rowIndex, itemIndex, item })
          )}
        </XStack>
      );
    });
  }, [containerProps, items, itemProps]);

  // =============== VIEWS
  if (views.length === 0) return null;
  return <>{views}</>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default GridRenderView;
