import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { CheckboxProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, checked = false, onChange, ...restProps } = props;

  // ================ STATE

  // ================ VIEWS
  return (
    <FormControlLabel
      {...restProps}
      label={label}
      control={
        <MuiCheckbox checked={checked} onChange={(_, v) => onChange?.(v)} />
      }
    />
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default Checkbox;
