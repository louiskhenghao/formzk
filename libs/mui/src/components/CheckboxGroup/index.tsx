import React, { useState } from 'react';
import { useDeepCompareEffect } from '@formzk/core';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiFormGroup from '@mui/material/FormGroup';
import filter from 'lodash/filter';
import some from 'lodash/some';
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
  const [innerValue, setInnerValue] = useState<(string | number)[]>(value);

  // ================ HELPERS
  const triggerUpdate = (updates: (string | number)[] = []) => {
    const changes = [...updates];
    setInnerValue(changes);
    onChange?.(changes);
  };

  // ================ EVENTS
  const onHandleChange = (value: string | number) => () => {
    let updates = innerValue || [];
    const found = some(updates, (e) => e === value);
    if (found) {
      updates = filter(updates, (v) => v !== value);
    } else {
      updates.push(value);
    }
    triggerUpdate(updates);
  };

  // ================ EFFECTS
  useDeepCompareEffect(() => {
    setInnerValue(value ?? []);
  }, [value]);

  // ================ VIEWS
  return (
    <MuiFormGroup {...restProps}>
      {(options ?? []).map((e) => {
        const isSelected = some(innerValue, (v) => v === e.value);
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
                onChange={onHandleChange(e.value)}
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
