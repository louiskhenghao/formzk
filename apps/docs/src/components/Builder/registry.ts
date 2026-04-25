/**
 * Field-type registry and code generation for the UI Builder.
 *
 * Each entry knows: how to register itself in the Provider config (if needed),
 * which extra imports it pulls, what the default field looks like, and how to
 * emit its JSX inside the form. The builder UI consumes the registry to render
 * the type picker; the code generator consumes it to emit a self-contained
 * App.tsx the developer can copy or download.
 */

export type Mode = 'core' | 'mui';

export type Option = { label: string; value: string };

export type Field = {
  id: string;
  type: string;
  name: string;
  label: string;
  caption?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean | string[];
  options?: Option[];
  multiline?: boolean;
  rows?: number;
  layout?: 'wrapped' | 'normal' | 'contained';
  valueKey?: 'value' | 'checked';
};

export type FieldTypeMeta = {
  id: string;
  label: string;
  group: string;
  mode: Mode;
  defaults: () => Omit<Field, 'id'>;
  /** Editable property keys shown in the right panel. */
  editableProps: Array<keyof Field>;
};

const id = () => Math.random().toString(36).slice(2, 9);

const baseString = (type: string, name: string, label: string): Omit<Field, 'id'> => ({
  type,
  name,
  label,
  placeholder: '',
  defaultValue: '',
});

const baseNumber = (type: string, name: string, label: string): Omit<Field, 'id'> => ({
  type,
  name,
  label,
  placeholder: '',
  defaultValue: 0,
});

const baseOptions = (
  type: string,
  name: string,
  label: string,
  defaultValue: string | string[] = ''
): Omit<Field, 'id'> => ({
  type,
  name,
  label,
  defaultValue,
  options: [
    { label: 'Option 1', value: 'one' },
    { label: 'Option 2', value: 'two' },
    { label: 'Option 3', value: 'three' },
  ],
});

/**
 * Registry of every type the builder can produce. Keep this list short, real,
 * and documented — every entry shows up in the "Add field" menu.
 */
export const REGISTRY: Record<string, FieldTypeMeta> = {
  // ─── core ───────────────────────────────────────────────
  text: {
    id: 'text',
    label: 'Text input',
    group: 'Text',
    mode: 'core',
    defaults: () => baseString('text', 'username', 'Username'),
    editableProps: ['name', 'label', 'placeholder', 'defaultValue'],
  },
  password: {
    id: 'password',
    label: 'Password input',
    group: 'Text',
    mode: 'core',
    defaults: () => baseString('password', 'password', 'Password'),
    editableProps: ['name', 'label', 'placeholder', 'defaultValue'],
  },
  email: {
    id: 'email',
    label: 'Email input',
    group: 'Text',
    mode: 'core',
    defaults: () => baseString('email', 'email', 'Email'),
    editableProps: ['name', 'label', 'placeholder', 'defaultValue'],
  },
  number: {
    id: 'number',
    label: 'Number input',
    group: 'Text',
    mode: 'core',
    defaults: () => baseNumber('number', 'amount', 'Amount'),
    editableProps: ['name', 'label', 'placeholder', 'defaultValue'],
  },
  date: {
    id: 'date',
    label: 'Date input',
    group: 'Text',
    mode: 'core',
    defaults: () => baseString('date', 'eventDate', 'Date'),
    editableProps: ['name', 'label', 'defaultValue'],
  },
  textarea: {
    id: 'textarea',
    label: 'Textarea',
    group: 'Text',
    mode: 'core',
    defaults: () => ({ ...baseString('textarea', 'bio', 'Bio'), rows: 3 }),
    editableProps: ['name', 'label', 'placeholder', 'rows', 'defaultValue'],
  },
  select: {
    id: 'select',
    label: 'Native select',
    group: 'Choice',
    mode: 'core',
    defaults: () => baseOptions('select', 'role', 'Role', 'one'),
    editableProps: ['name', 'label', 'options', 'defaultValue'],
  },
  checkbox: {
    id: 'checkbox',
    label: 'Checkbox',
    group: 'Choice',
    mode: 'core',
    defaults: () => ({
      type: 'checkbox',
      name: 'agree',
      label: 'I agree to the terms',
      defaultValue: false as boolean,
    }),
    editableProps: ['name', 'label', 'defaultValue'],
  },
  radio: {
    id: 'radio',
    label: 'Radio group',
    group: 'Choice',
    mode: 'core',
    defaults: () => baseOptions('radio', 'tier', 'Tier', 'one'),
    editableProps: ['name', 'label', 'options', 'defaultValue'],
  },

  // ─── mui presets ────────────────────────────────────────
  TextField: {
    id: 'TextField',
    label: 'TextField',
    group: 'TextField (MUI)',
    mode: 'mui',
    defaults: () => ({
      ...baseString('TextField', 'username', 'Username'),
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'placeholder', 'caption', 'layout', 'defaultValue'],
  },
  PasswordField: {
    id: 'PasswordField',
    label: 'TextField (password)',
    group: 'TextField (MUI)',
    mode: 'mui',
    defaults: () => ({
      ...baseString('PasswordField', 'password', 'Password'),
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'placeholder', 'caption', 'layout', 'defaultValue'],
  },
  NumberField: {
    id: 'NumberField',
    label: 'TextField (number)',
    group: 'TextField (MUI)',
    mode: 'mui',
    defaults: () => ({
      ...baseNumber('NumberField', 'amount', 'Amount'),
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'placeholder', 'caption', 'layout', 'defaultValue'],
  },
  MultilineField: {
    id: 'MultilineField',
    label: 'TextField (multiline)',
    group: 'TextField (MUI)',
    mode: 'mui',
    defaults: () => ({
      ...baseString('MultilineField', 'bio', 'Bio'),
      layout: 'wrapped',
      rows: 3,
    }),
    editableProps: ['name', 'label', 'placeholder', 'caption', 'rows', 'layout', 'defaultValue'],
  },
  DateField: {
    id: 'DateField',
    label: 'TextField (date)',
    group: 'TextField (MUI)',
    mode: 'mui',
    defaults: () => ({
      ...baseString('DateField', 'eventDate', 'Date'),
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'caption', 'layout', 'defaultValue'],
  },
  Checkbox: {
    id: 'Checkbox',
    label: 'Checkbox',
    group: 'Pre-wired (MUI)',
    mode: 'mui',
    defaults: () => ({
      type: 'Checkbox',
      name: 'agree',
      label: 'I agree to the terms',
      defaultValue: false as boolean,
      valueKey: 'checked',
      layout: 'contained',
    }),
    editableProps: ['name', 'label', 'caption', 'layout', 'defaultValue'],
  },
  Switch: {
    id: 'Switch',
    label: 'Switch',
    group: 'Pre-wired (MUI)',
    mode: 'mui',
    defaults: () => ({
      type: 'Switch',
      name: 'notify',
      label: 'Email notifications',
      defaultValue: true as boolean,
      valueKey: 'checked',
      layout: 'contained',
    }),
    editableProps: ['name', 'label', 'caption', 'layout', 'defaultValue'],
  },
  RadioGroup: {
    id: 'RadioGroup',
    label: 'RadioGroup',
    group: 'Pre-wired (MUI)',
    mode: 'mui',
    defaults: () => ({
      ...baseOptions('RadioGroup', 'role', 'Role', 'one'),
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'options', 'caption', 'layout', 'defaultValue'],
  },
  CheckboxGroup: {
    id: 'CheckboxGroup',
    label: 'CheckboxGroup',
    group: 'Pre-wired (MUI)',
    mode: 'mui',
    defaults: () => ({
      ...baseOptions('CheckboxGroup', 'permissions', 'Permissions', []),
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'options', 'caption', 'layout'],
  },
  Select: {
    id: 'Select',
    label: 'Select',
    group: 'Pre-wired (MUI)',
    mode: 'mui',
    defaults: () => ({
      ...baseOptions('Select', 'plan', 'Subscription plan', 'one'),
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'options', 'caption', 'layout', 'defaultValue'],
  },
  // ─── mui custom (registered wrappers around official MUI components) ──
  Autocomplete: {
    id: 'Autocomplete',
    label: 'Autocomplete (custom)',
    group: 'Custom MUI wrappers',
    mode: 'mui',
    defaults: () => ({
      ...baseOptions('Autocomplete', 'country', 'Country', ''),
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'placeholder', 'options', 'caption', 'layout', 'defaultValue'],
  },
  Slider: {
    id: 'Slider',
    label: 'Slider (custom)',
    group: 'Custom MUI wrappers',
    mode: 'mui',
    defaults: () => ({
      type: 'Slider',
      name: 'volume',
      label: 'Volume',
      defaultValue: 50 as number,
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'caption', 'layout', 'defaultValue'],
  },
  Rating: {
    id: 'Rating',
    label: 'Rating (custom)',
    group: 'Custom MUI wrappers',
    mode: 'mui',
    defaults: () => ({
      type: 'Rating',
      name: 'rating',
      label: 'How would you rate this?',
      defaultValue: 4 as number,
      layout: 'wrapped',
    }),
    editableProps: ['name', 'label', 'caption', 'layout', 'defaultValue'],
  },
};

export const newField = (typeId: string): Field => {
  const meta = REGISTRY[typeId];
  if (!meta) throw new Error(`Unknown field type: ${typeId}`);
  return { id: id(), ...meta.defaults() };
};

export const typesForMode = (mode: Mode): FieldTypeMeta[] =>
  Object.values(REGISTRY).filter((m) => m.mode === mode);

// ─── code generation ──────────────────────────────────────

const indent = (block: string, spaces = 2) =>
  block
    .split('\n')
    .map((l) => (l ? ' '.repeat(spaces) + l : l))
    .join('\n');

const stringify = (v: unknown): string => JSON.stringify(v);

const optionsLiteral = (options: Option[] = []) =>
  '[\n' +
  options.map((o) => `        { label: ${stringify(o.label)}, value: ${stringify(o.value)} }`).join(',\n') +
  '\n      ]';

const propsLiteral = (props: Record<string, unknown>) => {
  const entries = Object.entries(props).filter(([, v]) => v !== undefined && v !== '' && v !== null);
  if (entries.length === 0) return '';
  const body = entries
    .map(([k, v]) => {
      if (k === 'options') return `options: ${optionsLiteral(v as Option[])}`;
      return `${k}: ${stringify(v)}`;
    })
    .join(', ');
  return `{ ${body} }`;
};

// ─── core component snippets ──────────────────────────────

const CORE_INPUT_DEF = `const TextInput = ({ value = '', onChange, type = 'text', ...rest }) => (
  <input
    {...rest}
    type={type}
    value={value}
    onChange={(e) => onChange?.(type === 'number' ? Number(e.target.value) : e.target.value)}
    style={{ display: 'block', width: '100%', padding: 8, margin: '4px 0 12px', border: '1px solid #ccc', borderRadius: 4 }}
  />
);`;

const CORE_TEXTAREA_DEF = `const TextArea = ({ value = '', onChange, rows = 3, ...rest }) => (
  <textarea
    {...rest}
    rows={rows}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    style={{ display: 'block', width: '100%', padding: 8, margin: '4px 0 12px', border: '1px solid #ccc', borderRadius: 4 }}
  />
);`;

const CORE_SELECT_DEF = `const NativeSelect = ({ value = '', onChange, options = [], ...rest }) => (
  <select
    {...rest}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    style={{ display: 'block', width: '100%', padding: 8, margin: '4px 0 12px', border: '1px solid #ccc', borderRadius: 4 }}
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
);`;

const CORE_CHECKBOX_DEF = `const NativeCheckbox = ({ value = false, onChange, label, ...rest }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 12px' }}>
    <input
      {...rest}
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange?.(e.target.checked)}
    />
    <span>{label}</span>
  </label>
);`;

const CORE_RADIO_DEF = `const NativeRadio = ({ value = '', onChange, options = [], name, ...rest }) => (
  <div style={{ margin: '4px 0 12px' }}>
    {options.map((o) => (
      <label key={o.value} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 12 }}>
        <input
          {...rest}
          type="radio"
          name={name}
          value={o.value}
          checked={value === o.value}
          onChange={() => onChange?.(o.value)}
        />
        {o.label}
      </label>
    ))}
  </div>
);`;

type CoreCompKey = 'TextInput' | 'TextArea' | 'NativeSelect' | 'NativeCheckbox' | 'NativeRadio';

const CORE_TYPE_TO_COMP: Record<string, CoreCompKey> = {
  text: 'TextInput',
  password: 'TextInput',
  email: 'TextInput',
  number: 'TextInput',
  date: 'TextInput',
  textarea: 'TextArea',
  select: 'NativeSelect',
  checkbox: 'NativeCheckbox',
  radio: 'NativeRadio',
};

const CORE_COMP_DEFS: Record<CoreCompKey, string> = {
  TextInput: CORE_INPUT_DEF,
  TextArea: CORE_TEXTAREA_DEF,
  NativeSelect: CORE_SELECT_DEF,
  NativeCheckbox: CORE_CHECKBOX_DEF,
  NativeRadio: CORE_RADIO_DEF,
};

const HTML_TYPE_FOR: Record<string, string> = {
  text: 'text',
  password: 'password',
  email: 'email',
  number: 'number',
  date: 'date',
};

// Core field JSX is rendered at 10-space indent (inside <Formzk.Form>).
const CORE_INDENT = '          ';

function renderCoreField(f: Field): string {
  const compKey = CORE_TYPE_TO_COMP[f.type];
  const labelEl = f.label
    ? `${CORE_INDENT}<label style={{ fontSize: 14 }}>${escape(f.label)}</label>\n`
    : '';

  if (compKey === 'TextInput') {
    const props: Record<string, unknown> = {
      type: HTML_TYPE_FOR[f.type] ?? 'text',
      placeholder: f.placeholder,
    };
    return `${labelEl}${CORE_INDENT}<Formzk.Input name=${stringify(f.name)} component="TextInput" props=${jsxProps(props)} />`;
  }
  if (compKey === 'TextArea') {
    const props: Record<string, unknown> = { placeholder: f.placeholder, rows: f.rows ?? 3 };
    return `${labelEl}${CORE_INDENT}<Formzk.Input name=${stringify(f.name)} component="TextArea" props=${jsxProps(props)} />`;
  }
  if (compKey === 'NativeSelect') {
    const props: Record<string, unknown> = { options: f.options ?? [] };
    return `${labelEl}${CORE_INDENT}<Formzk.Input name=${stringify(f.name)} component="NativeSelect" props=${jsxProps(props)} />`;
  }
  if (compKey === 'NativeCheckbox') {
    const props: Record<string, unknown> = { label: f.label };
    return `${CORE_INDENT}<Formzk.Input name=${stringify(f.name)} component="NativeCheckbox" props=${jsxProps(props)} />`;
  }
  if (compKey === 'NativeRadio') {
    const props: Record<string, unknown> = { name: f.name, options: f.options ?? [] };
    return `${labelEl}${CORE_INDENT}<Formzk.Input name=${stringify(f.name)} component="NativeRadio" props=${jsxProps(props)} />`;
  }
  return '';
}

// JSX-attribute object literal, e.g. `{{ a: 1, b: 'x' }}`.
function jsxProps(props: Record<string, unknown>): string {
  const lit = propsLiteral(props);
  if (!lit) return '{{}}';
  return `{${lit}}`;
}

function escape(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' } as Record<string, string>)[c]);
}

function defaultValueLiteral(f: Field): string {
  if (f.defaultValue !== undefined) return stringify(f.defaultValue);
  if (f.type === 'checkbox' || f.type === 'Checkbox' || f.type === 'Switch') return 'false';
  if (f.type === 'CheckboxGroup') return '[]';
  if (f.type === 'number' || f.type === 'NumberField' || f.type === 'Slider' || f.type === 'Rating') return '0';
  return '""';
}

export function generateCoreCode(fields: Field[]): string {
  const usedComps = Array.from(new Set(fields.map((f) => CORE_TYPE_TO_COMP[f.type]).filter(Boolean))) as CoreCompKey[];

  const componentDefs = usedComps.map((c) => CORE_COMP_DEFS[c]).join('\n\n');
  const providerEntries = usedComps.map((c) => `  { name: '${c}', component: ${c} }`).join(',\n');
  const defaults = fields
    .map((f) => `              ${stringify(f.name)}: ${defaultValueLiteral(f)}`)
    .join(',\n');
  const fieldJsx = fields.map(renderCoreField).join('\n\n');

  return `import React from 'react';
import { Formzk, FormzkProvider } from '@formzk/core';

${componentDefs || '// No fields yet — add one from the left panel.'}

const config = [
${providerEntries}
];

export default function App() {
  return (
    <FormzkProvider config={config}>
      <div style={{ maxWidth: 480, padding: 16, fontFamily: 'system-ui' }}>
        <Formzk.Form
          options={{
            defaultValues: {
${defaults}
            },
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
${fieldJsx || '          {/* No fields yet */}'}

          <Formzk.Errors
            render={(hasError, errors) =>
              hasError ? (
                <ul style={{ color: '#d33', fontSize: 14 }}>
                  {errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              ) : null
            }
          />

          <Formzk.Submit
            render={(submit) => (
              <button onClick={submit} style={{ marginTop: 12, padding: '8px 16px', cursor: 'pointer' }}>
                Submit
              </button>
            )}
          />
        </Formzk.Form>
      </div>
    </FormzkProvider>
  );
}
`;
}

// ─── mui codegen ──────────────────────────────────────────

const MUI_CUSTOM_DEFS: Record<string, { import: string; def: string }> = {
  Autocomplete: {
    import: `import Autocomplete from '@mui/material/Autocomplete';\nimport TextField from '@mui/material/TextField';`,
    def: `// Custom Autocomplete wrapper — emits the option's \`value\` to the form.
const AutocompleteInput = ({ value, onChange, options = [], placeholder, ...rest }) => {
  const selected = options.find((o) => o.value === value) ?? null;
  return (
    <Autocomplete
      {...rest}
      options={options}
      value={selected}
      onChange={(_, opt) => onChange?.(opt ? opt.value : '')}
      getOptionLabel={(opt) => opt?.label ?? ''}
      isOptionEqualToValue={(a, b) => a?.value === b?.value}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} size="small" fullWidth />}
    />
  );
};`,
  },
  Slider: {
    import: `import Slider from '@mui/material/Slider';`,
    def: `const SliderInput = ({ value, onChange, ...rest }) => (
  <Slider {...rest} value={value ?? 0} onChange={(_, v) => onChange?.(v)} />
);`,
  },
  Rating: {
    import: `import Rating from '@mui/material/Rating';`,
    def: `const RatingInput = ({ value, onChange, ...rest }) => (
  <Rating {...rest} value={value ?? null} onChange={(_, v) => onChange?.(v)} />
);`,
  },
};

const MUI_CUSTOM_REGISTERED_NAME: Record<string, string> = {
  Autocomplete: 'AutocompleteInput',
  Slider: 'SliderInput',
  Rating: 'RatingInput',
};

const MUI_TEXTFIELD_VARIANTS = new Set(['TextField', 'PasswordField', 'NumberField', 'MultilineField', 'DateField']);

// Components shipped by @formzk/mui as named exports. Each must be registered
// in Formzk.Native.Provider before <Formzk.MUI.Item component="..."> can find
// it — there is no auto-registration.
const MUI_PREWIRED = new Set(['Checkbox', 'Switch', 'RadioGroup', 'CheckboxGroup', 'Select']);

function muiHtmlTypeFor(type: string): string | undefined {
  if (type === 'PasswordField') return 'password';
  if (type === 'NumberField') return 'number';
  if (type === 'DateField') return 'date';
  return undefined;
}

function renderMuiField(f: Field): string {
  const isTextVariant = MUI_TEXTFIELD_VARIANTS.has(f.type);
  const isCustom = !!MUI_CUSTOM_DEFS[f.type];

  // Resolve which registered component name to use.
  let component: string;
  if (isTextVariant) component = 'TextField';
  else if (isCustom) component = f.type;
  else component = f.type;

  // Top-level Item attributes.
  const attrs: string[] = [`name=${stringify(f.name)}`];
  if (f.label) attrs.push(`label=${stringify(f.label)}`);
  attrs.push(`component=${stringify(component)}`);
  if (f.valueKey && f.valueKey !== 'value') attrs.push(`valueKey=${stringify(f.valueKey)}`);
  if (f.layout && f.layout !== 'wrapped') attrs.push(`layout=${stringify(f.layout)}`);
  if (f.caption) attrs.push(`caption=${stringify(f.caption)}`);

  // Props passed to the underlying component.
  const props: Record<string, unknown> = {};
  const htmlType = muiHtmlTypeFor(f.type);
  if (htmlType) props.type = htmlType;
  if (f.type === 'MultilineField') {
    props.multiline = true;
    if (f.rows) props.minRows = f.rows;
  }
  if (f.placeholder) props.placeholder = f.placeholder;
  if (f.options && (f.type === 'RadioGroup' || f.type === 'CheckboxGroup' || f.type === 'Select' || f.type === 'Autocomplete')) {
    props.options = f.options;
  }
  // Checkbox / Switch: the top-level `label` is cloned into the underlying
  // component by FormItem (contained layout) or rendered as FormLabel (wrapped),
  // so we don't duplicate it inside `props`.

  const propsAttr = Object.keys(props).length ? ` props=${jsxProps(props)}` : '';

  return `            <Formzk.MUI.Item ${attrs.join(' ')}${propsAttr} />`;
}

export function generateMuiCode(fields: Field[]): string {
  const usedCustoms = Array.from(new Set(fields.map((f) => f.type).filter((t) => MUI_CUSTOM_DEFS[t])));
  const usedPrewired = Array.from(new Set(fields.map((f) => f.type).filter((t) => MUI_PREWIRED.has(t))));

  // Pull pre-wired MUI components into the same `from '@formzk/mui'` import as
  // Formzk so the developer doesn't have to learn two import paths.
  const formzkImport =
    usedPrewired.length > 0
      ? `import { Formzk, ${usedPrewired.join(', ')} } from '@formzk/mui';`
      : `import { Formzk } from '@formzk/mui';`;

  const customImports = usedCustoms.map((t) => MUI_CUSTOM_DEFS[t].import).join('\n');
  const customDefs = usedCustoms.map((t) => MUI_CUSTOM_DEFS[t].def).join('\n\n');

  const providerEntries = [
    `        { name: 'TextField', component: OutlinedInput, props: { fullWidth: true, size: 'small' } }`,
    ...usedPrewired.map((t) => `        { name: ${stringify(t)}, component: ${t} }`),
    ...usedCustoms.map(
      (t) => `        { name: ${stringify(t)}, component: ${MUI_CUSTOM_REGISTERED_NAME[t]} }`
    ),
  ].join(',\n');

  const defaults = fields
    .map((f) => `              ${stringify(f.name)}: ${defaultValueLiteral(f)}`)
    .join(',\n');

  const fieldJsx = fields.map(renderMuiField).join('\n');

  return `import React from 'react';
${formzkImport}
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box, Stack } from '@mui/material';
${customImports ? customImports + '\n' : ''}
${customDefs ? customDefs + '\n\n' : ''}export default function App() {
  return (
    <Formzk.Native.Provider
      config={[
${providerEntries}
      ]}
    >
      <Box sx={{ p: 2, maxWidth: 640 }}>
        <Formzk.MUI.Form
          name="builder-form"
          options={{
            defaultValues: {
${defaults}
            },
          }}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <Stack spacing={2}>
${fieldJsx || '            {/* No fields yet — add one from the left panel. */}'}
          </Stack>

          <Formzk.MUI.Errors containerProps={{ sx: { mt: 2 } }} />

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Formzk.MUI.Submit text="Save" />
            <Formzk.MUI.Reset text="Reset" />
          </Stack>
        </Formzk.MUI.Form>
      </Box>
    </Formzk.Native.Provider>
  );
}
`;
}

export function generateCode(mode: Mode, fields: Field[]): string {
  return mode === 'core' ? generateCoreCode(fields) : generateMuiCode(fields);
}

// re-export for tests / introspection
export const internals = { indent, optionsLiteral, propsLiteral };
