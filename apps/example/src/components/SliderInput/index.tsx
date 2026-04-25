import Slider, { SliderProps } from '@mui/material/Slider';
import Box from '@mui/material/Box';

export type SliderInputProps = Omit<SliderProps, 'value' | 'onChange'> & {
  value?: number;
  onChange?: (value: number) => void;
};

export const SliderInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  ...rest
}: SliderInputProps) => {
  return (
    <Box sx={{ paddingX: 1 }}>
      <Slider
        valueLabelDisplay="auto"
        {...rest}
        min={min}
        max={max}
        value={value ?? min}
        onChange={(_event, newValue) => {
          if (typeof newValue === 'number') onChange?.(newValue);
        }}
      />
    </Box>
  );
};

export default SliderInput;
