import React, { useEffect, useState } from 'react';
import { FormControlLabel, Switch as MuiSwitch } from '@mui/material';

import { SwitchProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Switch: React.FC<SwitchProps> = (props) => {
  const { label, checked, onChange, ...restProps } = props;

  // ================ STATE
  const [innerState, setInnerState] = useState(checked);

  // ================ EFFECTS
  useEffect(() => {
    setInnerState(checked);
  }, [checked]);

  // ================ VIEWS
  return (
    <FormControlLabel
      {...restProps}
      label={label}
      control={
        <MuiSwitch checked={innerState} onChange={(_, v) => onChange?.(v)} />
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
