import { KeyboardEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

export type ChipsInputProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const ChipsInput = ({
  value = [],
  onChange,
  placeholder = 'Type and press Enter',
  disabled,
}: ChipsInputProps) => {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) {
      setDraft('');
      return;
    }
    onChange?.([...value, trimmed]);
    setDraft('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commit();
    } else if (event.key === 'Backspace' && draft === '' && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        disabled={disabled}
        placeholder={placeholder}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commit}
      />
      {value.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
          {value.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={
                disabled
                  ? undefined
                  : () => onChange?.(value.filter((t) => t !== tag))
              }
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ChipsInput;
