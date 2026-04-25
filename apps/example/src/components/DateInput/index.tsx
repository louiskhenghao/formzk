import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

export type DateInputProps = Omit<OutlinedInputProps, 'value' | 'onChange'> & {
  value?: string;
  onChange?: (value: string) => void;
};

export const DateInput = ({ value, onChange, ...rest }: DateInputProps) => {
  return (
    <OutlinedInput
      fullWidth
      {...rest}
      type="date"
      value={value ?? ''}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
};

export default DateInput;
