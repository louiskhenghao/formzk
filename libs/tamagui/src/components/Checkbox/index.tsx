import React, { useEffect, useId, useState } from 'react';
import { Checkbox as TamaguiCheckbox, Label, SizableText, XStack } from 'tamagui';

import { CheckboxProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {
    label,
    checked = false,
    disabled,
    indicator,
    checkboxProps,
    labelProps,
    onChange,
    ...restProps
  } = props;

  // ================ HOOKS
  const generatedId = useId();
  const id = checkboxProps?.id ?? generatedId;

  // ================ STATE
  const [innerState, setInnerState] = useState(checked);

  // ================ EFFECTS
  useEffect(() => {
    setInnerState(checked);
  }, [checked]);

  // ================ VIEWS
  return (
    <XStack alignItems="center" gap="$2" {...restProps}>
      <TamaguiCheckbox
        {...checkboxProps}
        id={id}
        disabled={disabled}
        checked={innerState}
        onCheckedChange={(v) => {
          const updates = v === true;
          setInnerState(updates);
          onChange?.(updates);
        }}
      >
        <TamaguiCheckbox.Indicator>
          {indicator ?? <SizableText size="$1">✓</SizableText>}
        </TamaguiCheckbox.Indicator>
      </TamaguiCheckbox>
      {label && (
        <Label {...labelProps} htmlFor={id}>
          {label}
        </Label>
      )}
    </XStack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default Checkbox;
