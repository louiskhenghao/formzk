import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { isEmpty, isNil } from 'lodash';

import { GridFlexItemType, GridRenderViewProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const GridRenderView: React.FC<GridRenderViewProps> = (props) => {
  const { className, items = [], containerProps, itemProps } = props;

  // =============== HOOKS
  const views = useMemo(() => {
    // render grid item
    const renderItem = (options: {
      rowIndex: number;
      itemIndex: number;
      itemLength: number;
      item: GridFlexItemType;
    }) => {
      const { rowIndex, itemIndex, item, itemLength } = options;
      return (
        <Grid
          key={`grid-item-${rowIndex}-${itemIndex}`}
          item
          xs={12}
          sm={itemLength}
          {...itemProps}
          {...item}
        />
      );
    };

    // render grid rows
    return items.map((row, rowIndex) => {
      // make sure empty item didn't go through
      if (isNil(row) || isEmpty(row)) return null;
      return (
        <Grid
          key={`grid-container-${rowIndex}`}
          container
          className={className}
          spacing={2}
          {...containerProps}
          {...(Array.isArray(row) ? {} : row?.props ?? {})}
        >
          {Array.isArray(row)
            ? row.map((item, itemIndex) => {
                const itemLength = 12 / row.length;
                return renderItem({ rowIndex, itemIndex, itemLength, item });
              })
            : (row.items ?? []).map((item, itemIndex) => {
                const itemLength = 12 / row.items.length;
                return renderItem({ rowIndex, itemIndex, itemLength, item });
              })}
        </Grid>
      );
    });
  }, [containerProps, className, items, itemProps]);

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
