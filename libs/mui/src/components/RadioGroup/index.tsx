import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import MuiRadioGroup from '@mui/material/RadioGroup';

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

  // ================ VIEWS
  return (
    <MuiRadioGroup
      value={value}
      onChange={(_, e) => onChange?.(e)}
      {...restProps}
    >
      {options.map((e) => {
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
