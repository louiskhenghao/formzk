import React, { useMemo } from 'react';
import Grid, { GridProps, GridSize } from '@mui/material/Grid';
import isEmpty from 'lodash/isEmpty.js';
import isNil from 'lodash/isNil.js';

import { GridFlexItemType, GridRenderViewProps } from './props';

type LegacyBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const LEGACY_BREAKPOINTS: readonly LegacyBreakpoint[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];

// Fold legacy `xs/sm/md/lg/xl` sugar into the v6+ `size={{...}}` object,
// preserving any explicit `size` already set by the caller.
const toGridProps = (item: GridFlexItemType): GridProps => {
  const legacySize: Partial<Record<LegacyBreakpoint, GridSize>> = {};
  const rest: Record<string, unknown> = {};
  for (const key of Object.keys(item)) {
    if (LEGACY_BREAKPOINTS.includes(key as LegacyBreakpoint)) {
      const v = (item as Record<string, unknown>)[key] as GridSize | undefined;
      if (v !== undefined) legacySize[key as LegacyBreakpoint] = v;
    } else {
      rest[key] = (item as Record<string, unknown>)[key];
    }
  }
  if (rest.size === undefined && Object.keys(legacySize).length > 0) {
    rest.size = legacySize as GridProps['size'];
  }
  return rest as GridProps;
};

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
      const defaults: GridFlexItemType = {
        xs: 12,
        sm: itemLength as GridSize,
      };
      const merged = toGridProps({
        ...defaults,
        ...(itemProps ?? {}),
        ...item,
      });
      return <Grid key={`grid-item-${rowIndex}-${itemIndex}`} {...merged} />;
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
