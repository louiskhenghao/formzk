import { DependencyList, EffectCallback } from 'react';
import isEquals from 'lodash/isEqual';

import { isPrimitive } from '../../helpers';
import { useCustomCompareEffect } from '../useCustomCompareEffect';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const useDeepCompareEffect = (
  effect: EffectCallback,
  deps: DependencyList
): void => {
  if (!(deps instanceof Array) || !deps.length) {
    // eslint-disable-next-line
    console.warn(
      '`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.'
    );
  }

  if (deps.every(isPrimitive)) {
    // eslint-disable-next-line
    console.warn(
      '`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
    );
  }

  useCustomCompareEffect(effect, deps, isEquals);
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default useDeepCompareEffect;
