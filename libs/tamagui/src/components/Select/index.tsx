import React, { useEffect, useState } from 'react';
import { Select as TamaguiSelect } from 'tamagui';

import { SelectProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Select: React.FC<SelectProps> = (props) => {
  const {
    placeholder,
    value,
    options = [],
    selectProps,
    triggerProps,
    valueProps,
    contentProps,
    viewportProps,
    itemProps,
    onChange,
  } = props;

  // ================ STATE
  const [innerState, setInnerState] = useState(
    value != null ? String(value) : ''
  );

  // ================ EFFECTS
  useEffect(() => {
    setInnerState(value != null ? String(value) : '');
  }, [value]);

  // ================ EVENTS
  const onHandleChange = (updates: string) => {
    setInnerState(updates);
    // emit the original (possibly numeric) option value
    const matched = (options ?? []).find((e) => String(e.value) === updates);
    onChange?.(matched ? matched.value : updates);
  };

  // ================ VIEWS
  return (
    <TamaguiSelect
      {...selectProps}
      value={innerState}
      onValueChange={onHandleChange}
    >
      <TamaguiSelect.Trigger {...triggerProps}>
        <TamaguiSelect.Value placeholder={placeholder} {...valueProps} />
      </TamaguiSelect.Trigger>
      <TamaguiSelect.Content {...contentProps}>
        <TamaguiSelect.Viewport {...viewportProps}>
          {(options ?? []).map((e, i) => {
            return (
              <TamaguiSelect.Item
                key={`select-${e.value}`}
                {...itemProps}
                index={i}
                disabled={e.disabled}
                value={String(e.value)}
              >
                <TamaguiSelect.ItemText>{e.label}</TamaguiSelect.ItemText>
              </TamaguiSelect.Item>
            );
          })}
        </TamaguiSelect.Viewport>
      </TamaguiSelect.Content>
    </TamaguiSelect>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default Select;
