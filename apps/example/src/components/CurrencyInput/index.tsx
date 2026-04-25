import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export type CurrencyInputProps = Omit<
  OutlinedInputProps,
  'value' | 'onChange' | 'type'
> & {
  value?: number | string;
  onChange?: (value: number | null) => void;
  currency?: string;
  decimals?: number;
};

export const CurrencyInput = ({
  value,
  onChange,
  currency = 'USD',
  decimals = 2,
  ...rest
}: CurrencyInputProps) => {
  return (
    <OutlinedInput
      fullWidth
      {...rest}
      type="number"
      inputProps={{ step: 1 / Math.pow(10, decimals), min: 0 }}
      startAdornment={
        <InputAdornment position="start">{currency}</InputAdornment>
      }
      value={value ?? ''}
      onChange={(event) => {
        const raw = event.target.value;
        if (raw === '') {
          onChange?.(null);
          return;
        }
        const parsed = Number(raw);
        onChange?.(Number.isNaN(parsed) ? null : parsed);
      }}
    />
  );
};

export default CurrencyInput;
