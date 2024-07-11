import React from 'react';
import Grid from '@mui/material/Grid';
import isArray from 'lodash/isArray';

import { RenderFlexViewProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const GridRenderView: React.FC<RenderFlexViewProps> = (props) => {
  const { className, items = [], containerProps, itemProps } = props;

  // =============== VIEWS
  return (
    <>
      {items.map((row, rowIndex) => {
        const isItemArray = isArray(row);
        return (
          <Grid
            container
            className={className}
            key={`container-${rowIndex}`}
            spacing={2}
            {...containerProps}
            {...(isItemArray ? {} : row.props)}
          >
            {isItemArray
              ? row.map((item, itemIndex) => {
                  const itemLength = 12 / row.length;
                  return (
                    <Grid
                      key={`grid-item-${rowIndex}-${itemIndex}`}
                      item
                      xs={12}
                      sm={itemLength}
                      md={itemLength}
                      lg={itemLength}
                      xl={itemLength}
                      {...item}
                    />
                  );
                })
              : row.items.map((item, itemIndex) => {
                  const itemLength = 12 / row.items.length;
                  return (
                    <Grid
                      key={`item-${rowIndex}-${itemIndex}`}
                      item
                      xs={12}
                      sm={itemLength}
                      md={itemLength}
                      lg={itemLength}
                      xl={itemLength}
                      {...itemProps}
                      {...item}
                    />
                  );
                })}
          </Grid>
        );
      })}
    </>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default GridRenderView;
