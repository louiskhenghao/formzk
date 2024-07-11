import React, { useEffect, useState } from 'react';
import { useDeepCompareEffect } from '@formzk/core';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiFormGroup from '@mui/material/FormGroup';
import toString from 'lodash/toString';

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
  const [innerValue, setInnerValue] = useState<string[]>(value);

  // ================ HELPERS
  const triggerUpdate = (updates: string[]) => {
    setInnerValue(updates);
    onChange?.(updates);
  };

  // ================ EVENTS
  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    let updates = innerValue;
    const found = updates.some((e) => e === target);
    if (found) {
      updates = updates.filter((v) => v !== target);
    } else {
      updates.push(target);
    }
    triggerUpdate(updates);
  };

  // ================ EFFECTS
  useDeepCompareEffect(() => {
    triggerUpdate(value);
  }, [value]);

  // ================ VIEWS
  return (
    <MuiFormGroup {...restProps}>
      {options.map((e) => {
        const isSelected = innerValue.some((v) => v === e.value.toString());
        return (
          <FormControlLabel
            key={`checkbox-${e.value}`}
            {...optionProps}
            label={e.label}
            control={
              <MuiCheckbox
                name={toString(e.value)}
                value={toString(e.value)}
                disabled={disabled || e.disabled}
                checked={isSelected}
                onChange={onHandleChange}
              />
            }
          />
        );
      })}
    </MuiFormGroup>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default CheckboxGroup;
