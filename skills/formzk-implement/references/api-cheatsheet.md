# @formzk/core API cheatsheet

Namespace: `Formzk.{Provider, Form, Input, Submit, Reset, Errors, FormContext}` — every member is also a named export (`FormzkProvider`, `FormzkForm`, `FormzkFormInput`, ...). Adapters re-export the same set under `Formzk.Native.*`.

## Formzk.Provider

| Prop | Type | Notes |
| --- | --- | --- |
| `config` | `ComponentConfig[]` | `{ name: string; component: React.ComponentType; props?: DefaultProps }` per entry. `props` are merged **after** per-usage props (they win) |
| `children` | `ReactNode` | |

Context helpers via `useFormzk()`: `listComponents()`, `getComponent(name)`, `isRegistered(name)`. Using the hook outside a provider logs a console error and falls back to an empty config.

## Formzk.Form&lt;F&gt;

| Prop | Type | Notes |
| --- | --- | --- |
| `options` | `UseFormProps<F>` | Passed straight to `useForm` — `defaultValues`, `resolver`, `mode`, etc. |
| `form` | `UseFormReturn<F>` | Optional external form instance (overrides `options`) |
| `onSubmit` | `(values: F) => void` | Fired after successful validation |
| `children` | `ReactNode` | |

Ref (`FormzkFormRefProps<F>`): `{ form, submit, reset }`. Anything else (`setValue`, `getValues`, `watch`, `trigger`) → `ref.current.form.*`.

Inside the tree: `useFormzkForm()` → `{ form, nativeSubmit, submit, reset }` (throws outside a Form). react-hook-form's own `useFormContext()` also works.

## Formzk.Input

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | — | Field path in the payload |
| `component` | registered name | — | Unregistered → console.warn + renders `null` |
| `props` | component props | — | Per-usage props (overridden by registry `props` on conflict) |
| `valueKey` | `string` | `'value'` | Prop that receives the field value (`'checked'` for booleans) |
| `eventKey` | `string` | `'onChange'` | Prop that receives the change handler; called with the **next value**, not an event |
| `disabled` | `boolean` | — | Forwarded to Controller and the component |
| `field` | `Omit<ControllerProps, 'render'>` | — | Per-field RHF options: `rules`, `shouldUnregister`, `defaultValue` |
| `render` | `(comp, { field, fieldState, formState }) => ReactNode` | — | Wrap/decorate the resolved component; combine with `CloneElement` to inject `error` / `helperText` / `placeholder` |

Always rendered inside a react-hook-form `Controller` → always controlled.

## Formzk.Submit / Formzk.Reset

`render={(handler, { formState }) => <button onClick={handler}>...</button>}` — Submit's handler runs validation then `onSubmit`; Reset restores `defaultValues`.

## Formzk.Errors

`render={(hasError: boolean, errors: string[]) => ...}` — `errors` is the flattened list of `message`s from `formState.errors` (one level deep; nested field errors aren't recursed).

## Utilities

- `CloneElement` — clones its child element with extra props: `<CloneElement error helperText="..."><Component/></CloneElement>`
- `FallbackView` — `view` / `customRenderView` / `fallback` / `children` resolution helper
- `useDeepCompareEffect`, `useCustomCompareEffect`
- Types: `ComponentPropsMap` (augment me), `ComponentConfig`, `ComponentName`, `ComponentPropsOf<K>`, `FormzkFormRefProps`, `FormzkFormInputProps`

## Typing fallback

Without augmentation: `ComponentName` = `string`, `ComponentPropsOf` = `any` (works, untyped). With `declare module '@formzk/core' { interface ComponentPropsMap { ... } }`: `component` narrows to the union of registered names and `props` to that component's props.
