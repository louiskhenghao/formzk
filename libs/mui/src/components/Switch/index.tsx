import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';

import { SwitchProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Switch: React.FC<SwitchProps> = (props) => {
  const { label, checked, onChange, ...restProps } = props;

  // ================ VIEWS
  return (
    <FormControlLabel
      {...restProps}
      label={label}
      control={
        <MuiSwitch checked={checked} onChange={(_, v) => onChange?.(v)} />
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
export default Switch;
