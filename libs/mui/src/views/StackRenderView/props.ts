import { ReactNode } from 'react';
import { StackProps } from '@mui/material/Stack';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type StackRenderViewProps = StackProps & {
  /**
   * the items configuration
   */
  items?: {
    key: string;
    content: (() => ReactNode) | ReactNode;
  }[];
};
