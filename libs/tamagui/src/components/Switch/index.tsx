import React, { useEffect, useId, useState } from 'react';
import { Label, Switch as TamaguiSwitch, XStack } from 'tamagui';

import { SwitchProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Switch: React.FC<SwitchProps> = (props) => {
  const {
    label,
    checked = false,
    disabled,
    switchProps,
    thumbProps,
    labelProps,
    onChange,
    ...restProps
  } = props;

  // ================ HOOKS
  const generatedId = useId();
  const id = switchProps?.id ?? generatedId;

  // ================ STATE
  const [innerState, setInnerState] = useState(checked);

  // ================ EFFECTS
  useEffect(() => {
    setInnerState(checked);
  }, [checked]);

  // ================ VIEWS
  return (
    <XStack alignItems="center" gap="$2" {...restProps}>
      <TamaguiSwitch
        {...switchProps}
        id={id}
        disabled={disabled}
        checked={innerState}
        onCheckedChange={(v) => {
          setInnerState(v);
          onChange?.(v);
        }}
      >
        <TamaguiSwitch.Thumb {...thumbProps} />
      </TamaguiSwitch>
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
export default Switch;
