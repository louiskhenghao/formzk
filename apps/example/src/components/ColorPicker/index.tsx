import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type ColorPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export const ColorPicker = ({
  value = '#1976d2',
  onChange,
  disabled,
}: ColorPickerProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        component="input"
        type="color"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        sx={{
          width: 56,
          height: 40,
          padding: 0,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          background: 'transparent',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      />
      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
        {value}
      </Typography>
    </Box>
  );
};

export default ColorPicker;
