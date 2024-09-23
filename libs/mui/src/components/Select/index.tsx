import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

import { SelectProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Select: React.FC<SelectProps> = (props) => {
  const {
    label,
    value,
    options,
    wrapperProps,
    selectProps,
    labelProps,
    itemProps,
    onChange,
  } = props;

  // ================ STATE
  const [innerState, setInnerState] = useState<string>(value ?? '');

  // ================ EFFECTS
  useEffect(() => {
    setInnerState(value ?? '');
  }, [value]);

  // ================ EVENTS
  const onHandleChange = (event: SelectChangeEvent) => {
    const updates = event.target.value as string;
    setInnerState(updates);
    onChange?.(updates);
  };

  // ================ VIEWS
  return (
    <FormControl fullWidth {...wrapperProps}>
      <InputLabel {...labelProps}>{label}</InputLabel>
      <MuiSelect
        {...selectProps}
        label={label}
        value={innerState}
        onChange={onHandleChange}
      >
        {(options ?? []).map((e, i) => {
          return (
            <MenuItem
              key={i}
              {...itemProps}
              disabled={e.disabled}
              value={e.value}
            >
              {e.label}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default Select;
