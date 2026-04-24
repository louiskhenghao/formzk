import React, { useEffect, useState } from 'react';
import {
  FormControlLabel,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
} from '@mui/material';

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
    onChange,
    ...restProps
  } = props;

  // ================ STATE
  const [innerState, setInnerState] = useState(value ?? '');

  // ================ EFFECTS
  useEffect(() => {
    setInnerState(value ?? '');
  }, [value]);

  // ================ VIEWS
  return (
    <MuiRadioGroup
      value={innerState}
      onChange={(_, v) => {
        setInnerState(v);
        onChange?.(v);
      }}
      {...restProps}
    >
      {(options ?? []).map((e) => {
        return (
          <FormControlLabel
            key={`radio-${e.value}`}
            {...optionProps}
            disabled={disabled || e.disabled}
            label={e.label}
            value={e.value}
            control={<MuiRadio />}
          />
        );
      })}
    </MuiRadioGroup>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default RadioGroup;
