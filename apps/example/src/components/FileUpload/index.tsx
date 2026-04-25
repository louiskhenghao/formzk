import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export type UploadedFile = {
  name: string;
  size: number;
  type: string;
};

export type FileUploadProps = {
  value?: UploadedFile[];
  onChange?: (value: UploadedFile[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSizeMb?: number;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const FileUpload = ({
  value = [],
  onChange,
  accept,
  multiple = true,
  disabled,
  maxSizeMb,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const filtered = maxSizeMb
      ? files.filter((file) => file.size <= maxSizeMb * 1024 * 1024)
      : files;
    const next = filtered.map<UploadedFile>((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    onChange?.(multiple ? [...value, ...next] : next);
    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (name: string) => {
    onChange?.(value.filter((file) => file.name !== name));
  };

  return (
    <Box
      sx={{
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 1,
        padding: 2,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Button
          variant="outlined"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Choose file{multiple ? 's' : ''}
        </Button>
        <Typography variant="body2" color="text.secondary">
          {value.length === 0
            ? 'No files selected'
            : `${value.length} file${value.length === 1 ? '' : 's'} selected`}
        </Typography>
      </Stack>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={handleSelect}
      />
      {value.length > 0 && (
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
          {value.map((file) => (
            <Chip
              key={file.name}
              label={`${file.name} · ${formatSize(file.size)}`}
              onDelete={disabled ? undefined : () => remove(file.name)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default FileUpload;
