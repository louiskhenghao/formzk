import Rating, { RatingProps } from '@mui/material/Rating';

export type RatingInputProps = Omit<RatingProps, 'value' | 'onChange'> & {
  value?: number | null;
  onChange?: (value: number | null) => void;
};

export const RatingInput = ({ value, onChange, ...rest }: RatingInputProps) => {
  return (
    <Rating
      {...rest}
      value={value ?? null}
      onChange={(_event, newValue) => onChange?.(newValue)}
    />
  );
};

export default RatingInput;
