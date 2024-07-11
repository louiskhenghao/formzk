import { ReactNode } from 'react';
import { StackProps } from '@mui/material/Stack';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type RenderNodeViewProps = StackProps & {
  /**
   * the breadcrumb items configuration
   */
  items?: {
    key: string;
    content: (() => ReactNode) | ReactNode;
  }[];
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default RenderNodeViewProps;
