import React, { useEffect, useId, useState } from 'react';
import { Label, RadioGroup as TamaguiRadioGroup, XStack } from 'tamagui';

import { RadioGroupProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    value,
    disabled,
    options = [],
    optionProps,
    itemProps,
    labelProps,
    onChange,
    ...restProps
  } = props;

  // ================ HOOKS
  const groupId = useId();

  // ================ STATE
  const [innerState, setInnerState] = useState(
    value != null ? String(value) : ''
  );

  // ================ EFFECTS
  useEffect(() => {
    setInnerState(value != null ? String(value) : '');
  }, [value]);

  // ================ VIEWS
  return (
    <TamaguiRadioGroup
      gap="$2"
      value={innerState}
      onValueChange={(v) => {
        setInnerState(v);
        onChange?.(v);
      }}
      {...restProps}
    >
      {(options ?? []).map((e) => {
        const itemId = `${groupId}-${e.value}`;
        return (
          <XStack
            key={`radio-${e.value}`}
            alignItems="center"
            gap="$2"
            {...optionProps}
          >
            <TamaguiRadioGroup.Item
              {...itemProps}
              id={itemId}
              disabled={disabled || e.disabled}
              value={String(e.value)}
            >
              <TamaguiRadioGroup.Indicator />
            </TamaguiRadioGroup.Item>
            <Label {...labelProps} htmlFor={itemId}>
              {e.label}
            </Label>
          </XStack>
        );
      })}
    </TamaguiRadioGroup>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default RadioGroup;
