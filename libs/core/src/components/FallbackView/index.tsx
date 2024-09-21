import React, { createElement, Fragment } from 'react';

import { FallbackViewProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FallbackView = <T = any,>(props: FallbackViewProps<T>): any => {
  const {
    view,
    children,
    fallback,
    props: viewProps,
    customRenderView,
  } = props;

  // =============== VIEW
  if (!view && !fallback && !customRenderView) return null;
  if (customRenderView) {
    return <Fragment>{customRenderView({ ...viewProps, children })}</Fragment>;
  }
  if (view) {
    return (
      <Fragment>{createElement(view as any, viewProps, children)}</Fragment>
    );
  }
  if (!fallback && children) return children;
  if (!fallback) return null;
  return (
    <Fragment>{createElement(fallback as any, viewProps, children)}</Fragment>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FallbackView;
