# Custom component recipes

Seven real wrappers from the formzk example app (`apps/example/src/components/` in the formzk repo). Each is a small controlled component satisfying `value`/`onChange(next)`. Patterns to copy per value shape:

| Recipe | Value type | Pattern it demonstrates |
| --- | --- | --- |
| `CurrencyInput` | `number \| null` | Parse event → number; emit `null` when cleared (never `NaN`/`''`); extend a kit component's props with `Omit<..., 'value' \| 'onChange' \| 'type'>` |
| `ChipsInput` | `string[]` | Array value; internal *draft* state for the text buffer is fine — the committed array always flows through `onChange` |
| `SliderInput` | `number` | Drop extra callback args: `(e, v) => onChange?.(v)` |
| `RatingInput` | `number \| null` | Same, with `value ?? null` to keep the underlying component controlled |
| `DateInput` | `string` (ISO `yyyy-mm-dd`) | Keep the wire format a string; parse/format at the edges |
| `ColorPicker` | `string` (hex) | Trivial passthrough of a native input type |
| `FileUpload` | `File \| null` | Non-primitive value; validation via schema `.test()`; default value `null` |

## Full worked example — CurrencyInput (event → typed value)

```tsx
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export type CurrencyInputProps = Omit<OutlinedInputProps, 'value' | 'onChange' | 'type'> & {
  value?: number | string;
  onChange?: (value: number | null) => void;
  currency?: string;
  decimals?: number;
};

export const CurrencyInput = ({ value, onChange, currency = 'USD', decimals = 2, ...rest }: CurrencyInputProps) => (
  <OutlinedInput
    fullWidth
    {...rest}
    type="number"
    inputProps={{ step: 1 / Math.pow(10, decimals), min: 0 }}
    startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
    value={value ?? ''}
    onChange={(event) => {
      const raw = event.target.value;
      if (raw === '') return onChange?.(null);
      const parsed = Number(raw);
      onChange?.(Number.isNaN(parsed) ? null : parsed);
    }}
  />
);
```

Key moves: spread `...rest` **before** the controlled props so callers can't accidentally clobber them; `value ?? ''` keeps the DOM input controlled; empty → `null` so a schema can require the field.

## Array value with a draft buffer — ChipsInput (condensed)

```tsx
export type ChipsInputProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const ChipsInput = ({ value = [], onChange, ...rest }: ChipsInputProps) => {
  const [draft, setDraft] = useState(''); // OK: draft text, not the field value
  const commit = () => {
    const t = draft.trim();
    if (t && !value.includes(t)) onChange?.([...value, t]);
    setDraft('');
  };
  // <input value={draft} onKeyDown: Enter → commit(), Backspace on empty → onChange(value.slice(0, -1))>
  // chips render from `value`; delete chip → onChange(value.filter(...))
};
```

The committed field value (`string[]`) only ever changes through `onChange` — the internal state is just the uncommitted text.

## Dropping extra callback args — SliderInput / RatingInput

```tsx
const SliderInput = ({ value, onChange, ...rest }) => (
  <Slider {...rest} value={value ?? 0} onChange={(_, v) => onChange?.(v)} />
);
const RatingInput = ({ value, onChange, ...rest }) => (
  <Rating {...rest} value={value ?? null} onChange={(_, v) => onChange?.(v)} />
);
```

## No wrapper at all — valueKey / eventKey

When the component already emits raw values under different prop names, skip the wrapper:

```tsx
// Radix/shadcn-style checkbox: checked / onCheckedChange
<Formzk.Input name="terms" component="ShadcnCheckbox" valueKey="checked" eventKey="onCheckedChange" />
```

## Matching defaultValues

Every custom field needs a type-correct entry in the form's `defaultValues`:

```ts
defaultValues: {
  amount: null,      // CurrencyInput
  tags: [],          // ChipsInput
  volume: 0,         // SliderInput
  rating: null,      // RatingInput
  birthday: '',      // DateInput
  themeColor: '#3b82f6', // ColorPicker
  attachment: null,  // FileUpload
}
```
