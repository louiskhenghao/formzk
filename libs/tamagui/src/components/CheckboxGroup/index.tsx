import React, { useState } from 'react';
import { useDeepCompareEffect } from '@formzk/core';
import { YStack } from 'tamagui';

import { Checkbox } from '../Checkbox';

import { CheckboxGroupProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    value = [],
    disabled,
    options = [],
    optionProps,
    onChange,
    ...restProps
  } = props;

  // ================ STATE
  const [innerValue, setInnerValue] = useState<(string | number)[]>(value);

  // ================ HELPERS
  const triggerUpdate = (updates: (string | number)[] = []) => {
    setInnerValue(updates);
    onChange?.(updates);
  };

  // ================ EVENTS
  const onHandleChange = (value: string | number) => () => {
    let updates = innerValue || [];
    const found = updates.some((e) => e === value);
    if (found) {
      updates = updates.filter((v) => v !== value);
    } else {
      updates.push(value);
    }
    triggerUpdate([...updates]);
  };

  // ================ EFFECTS
  useDeepCompareEffect(() => {
    setInnerValue(value ?? []);
  }, [value]);

  // ================ VIEWS
  return (
    <YStack gap="$2" {...restProps}>
      {(options ?? []).map((e) => {
        const isSelected = innerValue.some((v) => v === e.value);
        return (
          <Checkbox
            key={`checkbox-${e.value}`}
            {...optionProps}
            label={e.label}
            disabled={disabled || e.disabled}
            checked={isSelected}
            onChange={onHandleChange(e.value)}
          />
        );
      })}
    </YStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default CheckboxGroup;
