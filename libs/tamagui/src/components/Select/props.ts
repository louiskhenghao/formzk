import { ReactNode } from 'react';
import {
  SelectContentProps,
  SelectItemProps,
  SelectProps as TamaguiSelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectViewportProps,
} from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type SelectProps = {
  /**
   * placeholder to display when no value selected
   */
  placeholder?: ReactNode;
  /**
   * option items
   */
  options?: {
    label: string;
    value: string | number;
    disabled?: boolean;
  }[];
  /**
   * the value of the input
   */
  value?: string | number;
  /**
   * the onChange event of the input
   * emits the original option value (string or number)
   */
  onChange?: (updates: string | number) => void;

  /**
   * custom props
   * --------------------
   *
   * NOTE: on native platforms Tamagui's Select requires an `Adapt`/`Sheet`
   * setup to display its content; on web it works out of the box. Use
   * `selectProps.native` to render a native `<select>` element on web.
   */
  selectProps?: Omit<
    TamaguiSelectProps,
    'value' | 'onValueChange' | 'children'
  >;
  triggerProps?: SelectTriggerProps;
  valueProps?: Omit<SelectValueProps, 'placeholder'>;
  contentProps?: SelectContentProps;
  viewportProps?: SelectViewportProps;
  itemProps?: Omit<SelectItemProps, 'value' | 'index' | 'disabled'>;
};
