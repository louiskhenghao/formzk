import React, { Fragment } from 'react';
import { XStack } from 'tamagui';

import { StackRenderViewProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const StackRenderView: React.FC<StackRenderViewProps> = (props) => {
  const { items = [], ...restProps } = props;

  // =============== VIEWS
  return (
    <XStack alignItems="center" gap="$2" {...restProps}>
      {(items ?? [])?.map((e) => {
        const { key, content } = e;
        return (
          <Fragment key={key}>
            {typeof content === 'function' ? content() : content}
          </Fragment>
        );
      })}
    </XStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default StackRenderView;
