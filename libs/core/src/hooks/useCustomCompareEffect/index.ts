import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

import { isPrimitive } from '../../helpers';

type DepsEqualFnType<TDeps extends DependencyList> = (
  prevDeps: TDeps,
  nextDeps: TDeps
) => boolean;

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const useCustomCompareEffect = <TDeps extends DependencyList>(
  effect: EffectCallback,
  deps: TDeps,
  depsEqual: DepsEqualFnType<TDeps>
): void => {
  if (!(deps instanceof Array) || !deps.length) {
    // eslint-disable-next-line
    console.warn(
      '`useCustomCompareEffect` should not be used with no dependencies. Use React.useEffect instead.'
    );
  }

  if (deps.every(isPrimitive)) {
    // eslint-disable-next-line
    console.warn(
      '`useCustomCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
    );
  }

  if (typeof depsEqual !== 'function') {
    // eslint-disable-next-line
    console.warn(
      '`useCustomCompareEffect` should be used with depsEqual callback for comparing deps list'
    );
  }

  const ref = useRef<TDeps | undefined>(undefined);

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  // eslint-disable-next-line
  useEffect(effect, ref.current);
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default useCustomCompareEffect;
