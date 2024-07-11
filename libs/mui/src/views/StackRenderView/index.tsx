import React, { Fragment } from 'react';
import Stack from '@mui/material/Stack';

import { RenderNodeViewProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const StackRenderView: React.FC<RenderNodeViewProps> = (props) => {
  const { className, items = [], ...restProps } = props;

  // =============== VIEWS
  return (
    <Stack
      className={className}
      direction="row"
      alignItems="center"
      {...restProps}
    >
      {items.map((e, i) => {
        const { key, content } = e;
        return (
          <Fragment key={key}>
            {typeof content === 'function' ? content() : content}
          </Fragment>
        );
      })}
    </Stack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default StackRenderView;
