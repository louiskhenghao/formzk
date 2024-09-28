import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

import { SelectProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Select: React.FC<SelectProps> = (props) => {
  const { label, value, options, selectProps, itemProps, onChange } = props;

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
    <MuiSelect
      fullWidth
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
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default Select;
