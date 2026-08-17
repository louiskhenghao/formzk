import { ReactNode } from 'react';
import { XStackProps } from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type StackRenderViewProps = XStackProps & {
  /**
   * the items configuration
   */
  items?: {
    key: string;
    content: (() => ReactNode) | ReactNode;
  }[];
};
