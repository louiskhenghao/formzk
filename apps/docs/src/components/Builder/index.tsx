import React, { useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';

import {
  Field,
  Mode,
  REGISTRY,
  generateCode,
  newField,
  typesForMode,
} from './registry';
import styles from './styles.module.css';

const SANDPACK_DEPS_CORE = {
  '@formzk/core': '^1.0',
  'react-hook-form': '^7.40',
};

const SANDPACK_DEPS_MUI = {
  '@formzk/core': '^1.0',
  '@formzk/mui': '^1.0',
  'react-hook-form': '^7.40',
  '@mui/material': '^5',
  '@emotion/react': '^11',
  '@emotion/styled': '^11',
};

function BuilderInner() {
  const { colorMode } = useColorMode();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Sandpack } =
    require('@codesandbox/sandpack-react') as typeof import('@codesandbox/sandpack-react');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { atomDark, githubLight } =
    require('@codesandbox/sandpack-themes') as typeof import('@codesandbox/sandpack-themes');

  const [mode, setMode] = useState<Mode>('mui');
  const [fields, setFields] = useState<Field[]>(() => [newField('TextField')]);
  const [selectedId, setSelectedId] = useState<string | null>(fields[0]?.id ?? null);
  const [pendingType, setPendingType] = useState<string>('TextField');
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  const types = useMemo(() => typesForMode(mode), [mode]);
  const groupedTypes = useMemo(() => {
    const groups = new Map<string, typeof types>();
    for (const t of types) {
      const arr = groups.get(t.group) ?? [];
      arr.push(t);
      groups.set(t.group, arr);
    }
    return Array.from(groups.entries());
  }, [types]);

  const selected = useMemo(
    () => fields.find((f) => f.id === selectedId) ?? null,
    [fields, selectedId]
  );

  const code = useMemo(() => generateCode(mode, fields), [mode, fields]);

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    if (
      fields.length > 0 &&
      // eslint-disable-next-line no-alert
      !window.confirm('Switching modes resets the form. Continue?')
    ) {
      return;
    }
    setMode(next);
    const seed = next === 'core' ? 'text' : 'TextField';
    const f = newField(seed);
    setFields([f]);
    setSelectedId(f.id);
    setPendingType(seed);
  };

  const addField = () => {
    const f = newField(pendingType);
    setFields((prev) => [...prev, f]);
    setSelectedId(f.id);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const moveField = (id: string, dir: -1 | 1) => {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const updateField = (id: string, patch: Partial<Field>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // eslint-disable-next-line no-alert
      window.alert('App.tsx copied to clipboard');
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Copy failed — select the code in the Code tab and copy manually.');
    }
  };

  const download = () => {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'App.tsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.modeBar}>
          <button
            type="button"
            className={`${styles.modeButton} ${mode === 'core' ? styles.modeButtonActive : ''}`}
            onClick={() => switchMode('core')}
          >
            @formzk/core
          </button>
          <button
            type="button"
            className={`${styles.modeButton} ${mode === 'mui' ? styles.modeButtonActive : ''}`}
            onClick={() => switchMode('mui')}
          >
            @formzk/mui
          </button>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Add field</div>
          <div className={styles.addRow}>
            <select
              value={pendingType}
              onChange={(e) => setPendingType(e.target.value)}
            >
              {groupedTypes.map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button type="button" className={styles.addButton} onClick={addField}>
              + Add
            </button>
          </div>
        </div>

        <div className={styles.section} style={{ padding: 0 }}>
          <div className={styles.sectionTitle} style={{ padding: '12px 14px 0' }}>
            Fields ({fields.length})
          </div>
          <div className={styles.fieldList}>
            {fields.length === 0 && (
              <div style={{ padding: 14, fontSize: 12, color: 'var(--ifm-color-content-secondary)' }}>
                No fields yet — pick a type above and click <b>+ Add</b>.
              </div>
            )}
            {fields.map((f, i) => (
              <div
                key={f.id}
                className={`${styles.fieldRow} ${selectedId === f.id ? styles.fieldRowActive : ''}`}
                onClick={() => setSelectedId(f.id)}
              >
                <span className={styles.fieldRowName}>{f.name}</span>
                <span className={styles.fieldRowType}>{REGISTRY[f.type]?.label ?? f.type}</span>
                <button
                  type="button"
                  className={styles.iconButton}
                  disabled={i === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveField(f.id, -1);
                  }}
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  disabled={i === fields.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveField(f.id, 1);
                  }}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeField(f.id);
                  }}
                  aria-label="Delete"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section} style={{ flex: 1, overflowY: 'auto' }}>
          <div className={styles.sectionTitle}>Properties</div>
          {selected ? (
            <PropertyEditor
              field={selected}
              onChange={(patch) => updateField(selected.id, patch)}
            />
          ) : (
            <div className={styles.editorEmpty}>Select a field to edit its properties.</div>
          )}
        </div>
      </aside>

      <section className={styles.right}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${tab === 'preview' ? styles.tabActive : ''}`}
            onClick={() => setTab('preview')}
          >
            Preview
          </button>
          <button
            type="button"
            className={`${styles.tab} ${tab === 'code' ? styles.tabActive : ''}`}
            onClick={() => setTab('code')}
          >
            Code
          </button>
          <div className={styles.toolbar}>
            <button type="button" className={styles.toolbarButton} onClick={copy}>
              Copy
            </button>
            <button type="button" className={styles.toolbarButton} onClick={download}>
              Download App.tsx
            </button>
          </div>
        </div>

        <div className={styles.tabPanel} style={{ display: tab === 'preview' ? 'block' : 'none' }}>
          <Sandpack
            theme={colorMode === 'dark' ? atomDark : githubLight}
            template="react-ts"
            files={{ '/App.tsx': code }}
            options={{
              editorHeight: 680,
              showConsoleButton: true,
              showLineNumbers: true,
              showTabs: true,
              wrapContent: true,
            }}
            customSetup={{
              dependencies: mode === 'core' ? SANDPACK_DEPS_CORE : SANDPACK_DEPS_MUI,
            }}
          />
        </div>

        <div className={styles.tabPanel} style={{ display: tab === 'code' ? 'block' : 'none' }}>
          <pre className={styles.codeBlock}>{code}</pre>
        </div>
      </section>
    </div>
  );
}

function PropertyEditor({
  field,
  onChange,
}: {
  field: Field;
  onChange: (patch: Partial<Field>) => void;
}) {
  const meta = REGISTRY[field.type];
  const editable = new Set(meta?.editableProps ?? []);

  return (
    <div className={styles.editor}>
      {editable.has('name') && (
        <div className={styles.field}>
          <label>name</label>
          <input
            value={field.name}
            onChange={(e) =>
              onChange({ name: e.target.value.replace(/\s+/g, '_') })
            }
          />
        </div>
      )}
      {editable.has('label') && (
        <div className={styles.field}>
          <label>label</label>
          <input
            value={field.label ?? ''}
            onChange={(e) => onChange({ label: e.target.value })}
          />
        </div>
      )}
      {editable.has('placeholder') && (
        <div className={styles.field}>
          <label>placeholder</label>
          <input
            value={field.placeholder ?? ''}
            onChange={(e) => onChange({ placeholder: e.target.value })}
          />
        </div>
      )}
      {editable.has('caption') && (
        <div className={styles.field}>
          <label>caption (helper text)</label>
          <input
            value={field.caption ?? ''}
            onChange={(e) => onChange({ caption: e.target.value })}
          />
        </div>
      )}
      {editable.has('rows') && (
        <div className={styles.field}>
          <label>rows</label>
          <input
            type="number"
            min={1}
            max={20}
            value={field.rows ?? 3}
            onChange={(e) => onChange({ rows: Number(e.target.value) })}
          />
        </div>
      )}
      {editable.has('layout') && (
        <div className={styles.field}>
          <label>layout</label>
          <select
            value={field.layout ?? 'wrapped'}
            onChange={(e) => onChange({ layout: e.target.value as Field['layout'] })}
          >
            <option value="wrapped">wrapped (FormControl + label)</option>
            <option value="contained">contained (label inline)</option>
            <option value="normal">normal (label cloned into input)</option>
          </select>
        </div>
      )}
      {editable.has('defaultValue') && (
        <DefaultValueEditor field={field} onChange={onChange} />
      )}
      {editable.has('options') && (
        <OptionsEditor
          options={field.options ?? []}
          onChange={(options) => onChange({ options })}
        />
      )}
    </div>
  );
}

function DefaultValueEditor({
  field,
  onChange,
}: {
  field: Field;
  onChange: (patch: Partial<Field>) => void;
}) {
  const isBool =
    field.type === 'checkbox' ||
    field.type === 'Checkbox' ||
    field.type === 'Switch';
  const isNumber =
    field.type === 'number' ||
    field.type === 'NumberField' ||
    field.type === 'Slider' ||
    field.type === 'Rating';
  const isMulti = field.type === 'CheckboxGroup';

  if (isBool) {
    return (
      <div className={styles.field}>
        <label>defaultValue</label>
        <select
          value={String(!!field.defaultValue)}
          onChange={(e) => onChange({ defaultValue: e.target.value === 'true' })}
        >
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
      </div>
    );
  }
  if (isNumber) {
    return (
      <div className={styles.field}>
        <label>defaultValue</label>
        <input
          type="number"
          value={Number(field.defaultValue ?? 0)}
          onChange={(e) => onChange({ defaultValue: Number(e.target.value) })}
        />
      </div>
    );
  }
  if (isMulti) {
    const csv = Array.isArray(field.defaultValue) ? field.defaultValue.join(', ') : '';
    return (
      <div className={styles.field}>
        <label>defaultValue (comma-separated)</label>
        <input
          value={csv}
          onChange={(e) =>
            onChange({
              defaultValue: e.target.value
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
        />
      </div>
    );
  }
  return (
    <div className={styles.field}>
      <label>defaultValue</label>
      <input
        value={String(field.defaultValue ?? '')}
        onChange={(e) => onChange({ defaultValue: e.target.value })}
      />
    </div>
  );
}

function OptionsEditor({
  options,
  onChange,
}: {
  options: { label: string; value: string }[];
  onChange: (options: { label: string; value: string }[]) => void;
}) {
  const update = (i: number, patch: Partial<{ label: string; value: string }>) => {
    const next = options.map((o, idx) => (idx === i ? { ...o, ...patch } : o));
    onChange(next);
  };
  const remove = (i: number) => onChange(options.filter((_, idx) => idx !== i));
  const add = () => onChange([...options, { label: `Option ${options.length + 1}`, value: `opt-${options.length + 1}` }]);

  return (
    <div className={styles.field}>
      <label>options</label>
      {options.map((o, i) => (
        <div key={i} className={styles.optionRow}>
          <input
            placeholder="label"
            value={o.label}
            onChange={(e) => update(i, { label: e.target.value })}
          />
          <input
            placeholder="value"
            value={o.value}
            onChange={(e) => update(i, { value: e.target.value })}
          />
          <button type="button" className={styles.iconButton} onClick={() => remove(i)} aria-label="Remove option">
            ×
          </button>
        </div>
      ))}
      <button type="button" className={styles.iconButton} onClick={add} style={{ alignSelf: 'flex-start' }}>
        + Add option
      </button>
    </div>
  );
}

export default function Builder() {
  return (
    <BrowserOnly fallback={<div className={styles.fallback}>Loading builder…</div>}>
      {() => <BuilderInner />}
    </BrowserOnly>
  );
}
