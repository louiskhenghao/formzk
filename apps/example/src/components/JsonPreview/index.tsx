import { FieldValues, useWatch } from 'react-hook-form';
import Box from '@mui/material/Box';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const escapeHtml = (raw: string) =>
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Lightweight JSON syntax highlighter — distinct colors per token type so the
// preview is readable at a glance without pulling in a syntax-highlight lib.
const highlightJson = (json: string) => {
  const tokenRegex =
    /("(?:\\.|[^\\"])*"\s*:|"(?:\\.|[^\\"])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  return escapeHtml(json).replace(tokenRegex, (match) => {
    let color = '#f0f6fc';
    if (/^"/.test(match)) {
      color = /:$/.test(match) ? '#79c0ff' : '#a5d6ff';
    } else if (/true|false|null/.test(match)) {
      color = '#ff7b72';
    } else {
      color = '#ffa657';
    }
    return `<span style="color:${color}">${match}</span>`;
  });
};

export type JsonPreviewProps = {
  values: unknown;
  title?: string;
  /**
   * When `true`, render a small green status dot to signal that the panel is
   * live (i.e. wired up to `useWatch` upstream).
   */
  live?: boolean;
  /**
   * Pin the preview to the viewport on md+ breakpoints.
   */
  sticky?: boolean;
  /**
   * Cap the preview height so the surrounding layout stays predictable.
   */
  maxHeight?: number;
  paperProps?: PaperProps;
};

export const JsonPreview = ({
  values,
  title = 'Form value',
  live = false,
  sticky = false,
  maxHeight = 480,
  paperProps,
}: JsonPreviewProps) => {
  const json = JSON.stringify(values, null, 2) ?? '{}';
  return (
    <Paper
      variant="outlined"
      {...paperProps}
      sx={{
        padding: 2,
        background: '#0d1117',
        borderColor: '#30363d',
        ...(sticky && { position: { md: 'sticky' }, top: { md: 16 } }),
        ...paperProps?.sx,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', marginBottom: 1 }}
      >
        {live && (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#3fb950',
              boxShadow: '0 0 6px #3fb950',
            }}
          />
        )}
        <Typography variant="subtitle2" sx={{ color: '#c9d1d9', flex: 1 }}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            color: '#8b949e',
          }}
        >
          json
        </Typography>
      </Stack>
      <Box
        component="pre"
        sx={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: 12.5,
          lineHeight: 1.55,
          margin: 0,
          padding: 1.5,
          background: '#161b22',
          color: '#f0f6fc',
          border: '1px solid #30363d',
          borderRadius: 1,
          maxHeight,
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        dangerouslySetInnerHTML={{ __html: highlightJson(json) }}
      />
    </Paper>
  );
};

export type LiveFormPreviewProps<F extends FieldValues = FieldValues> = Omit<
  JsonPreviewProps,
  'values'
>;

/**
 * Subscribes to the surrounding Formzk form via `useWatch` and renders the
 * live values inside a `JsonPreview`. Drop it anywhere inside a `Formzk.Form`
 * (or `Formzk.MUI.Form`) — no props required.
 */
export const LiveFormPreview = <F extends FieldValues = FieldValues>(
  props: LiveFormPreviewProps<F>,
) => {
  const values = useWatch<F>();
  return (
    <JsonPreview
      title="Live form value"
      live
      {...props}
      values={values}
    />
  );
};

export default JsonPreview;
