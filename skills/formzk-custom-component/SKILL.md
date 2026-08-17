---
name: formzk-custom-component
description: Wrap any React component (custom, Chakra, antd, shadcn, headless, third-party) to formzk's value/onChange contract and register it in the Formzk.Provider registry with typed props. Use when the user wants a component to work inside a formzk form, asks to "register a component with formzk", needs valueKey/eventKey mapping, or their UI kit has no formzk adapter.
---

# Register custom components with formzk

formzk renders every registered component inside a react-hook-form `Controller`. The contract is simple:

> The component receives the field value in a prop (default **`value`**, override with `valueKey`) and reports changes through a callback called with the **next value — not a DOM event** (default **`onChange`**, override with `eventKey`).

Anything meeting that contract — from any UI kit or hand-rolled — can be a formzk input.

## Workflow

1. **Inspect the target component's props.** Find its value prop and change callback, and what the callback emits (event? tuple? raw value?).
2. **Choose the adaptation:**
   - Prop names already `value`/`onChange` emitting a raw value → register as-is.
   - Different prop names but raw-value semantics (e.g. Radix/shadcn `checked`/`onCheckedChange`) → no wrapper needed; pass `valueKey="checked" eventKey="onCheckedChange"` on `Formzk.Input`.
   - Callback emits an event or extra args (e.g. MUI Slider's `(event, value)`) → write a thin wrapper normalizing to `onChange(next)`. Keep it stateless — the form owns the state; never mirror `value` into internal state (transient draft state, like a chips input's text buffer, is fine).
3. **Register** at the provider: `{ name: 'MyThing', component: MyThing, props?: {...} }`. Registry `props` are global defaults that **override** per-usage `props` — keep them minimal or empty.
4. **Augment `ComponentPropsMap`** in a `.d.ts` so `component="MyThing"` autocompletes and `props` typecheck (key must equal the registered name).
5. **Use it** with a **type-correct `defaultValue`** in the form's `defaultValues`: `false` for booleans, `[]` for multi-selects/arrays, `0` for numbers, `null` for "no object selected", `''` for text.

See `references/registration-and-types.md` for full provider + augmentation patterns, and `references/component-recipes.md` for seven worked wrappers (arrays, numbers, files, dates, colors...).

## Error display

The registered component only gets `value`/`onChange`. To surface validation state, wrap the usage in `render` + `CloneElement`:

```tsx
import { CloneElement } from '@formzk/core'; // import from core even when an adapter is installed — adapters don't re-export it

<Formzk.Input
  name="amount"
  component="CurrencyInput"
  render={(comp, { fieldState }) => {
    const error = fieldState.error?.message;
    return (
      <CloneElement error={!!error} helperText={error}>
        {comp}
      </CloneElement>
    );
  }}
/>
```

(With `@formzk/mui` / `@formzk/tamagui`, `Formzk.MUI.Item` / `Formzk.Tamagui.Item` do this wiring for you — custom registered names work there too.)

## Gotchas

- **Registry `props` win** over per-field `props` — never put anything in registry `props` a field might need to override.
- **Unregistered name** → console.warn + renders `null`; check spelling against the provider config.
- The change callback receives the raw next value. A wrapper translating from an event must call `onChange?.(event.target.value)` (or parsed equivalent), not pass the event through.
- Emit `null` (not `''` or `NaN`) for "cleared" numeric/object values so validation schemas can distinguish empty from zero.

## Verify

1. Typecheck passes; `component="MyThing"` autocompletes and bogus props on it error.
2. Interact with the field → `onSubmit` payload (or `form.watch()`) reflects the change; no console warnings.
3. Trigger a validation error → the error renders via your `render`/`CloneElement` (or adapter Item).
4. Reset restores the default.

## Upstreaming

If you've wrapped a full kit (Chakra, antd, shadcn...), consider contributing an official `@formzk/<kit>` adapter — see `CONTRIBUTING.md` in https://github.com/louiskhenghao/formzk (the `formzk-new-adapter` skill walks through it).
