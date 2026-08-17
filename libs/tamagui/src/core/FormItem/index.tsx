import { Fragment, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { CloneElement, ComponentPropsMap, Formzk } from '@formzk/core';
import { Label, SizableText, YStack } from 'tamagui';

import { FormzkFormItemTamaguiProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkFormItemTamagui = <
  F extends FieldValues = FieldValues,
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
>(
  props: FormzkFormItemTamaguiProps<F, K>
) => {
  const {
    label,
    caption,
    layout = 'wrapped',
    enableHighlightError = true,
    wrappedContainerProps,
    normalWrappedProps,
    labelProps,
    captionHighlightProps,
    errorHighlightTextProps,
    render,
    ...restProps
  } = props;

  // ================ VIEWS
  // label view
  const labelView = useMemo(() => {
    if (!label) return null;
    return <Label {...labelProps}>{label}</Label>;
  }, [label, labelProps]);

  // render helper text
  const renderHelperText = (error?: string) => {
    return (
      <>
        {caption && (
          <SizableText size="$2" color="$color10" {...captionHighlightProps}>
            {caption}
          </SizableText>
        )}
        {enableHighlightError && error && (
          <SizableText size="$2" color="$red10" {...errorHighlightTextProps}>
            {error}
          </SizableText>
        )}
      </>
    );
  };

  return (
    <Formzk.Input
      {...restProps}
      render={(comp, state) => {
        const { fieldState } = state;
        const error = fieldState.error?.message;
        const hasError = !!error;
        const injectProps = { error: hasError };

        let view = <Fragment>{comp}</Fragment>;
        // normal layout
        if (layout === 'normal') {
          view = (
            <CloneElement label={label} {...injectProps}>
              {comp}
            </CloneElement>
          );
        }
        // contained layout
        if (layout === 'contained') {
          view = (
            <YStack {...normalWrappedProps}>
              <CloneElement label={label}>{comp}</CloneElement>
              {renderHelperText(error)}
            </YStack>
          );
        }
        // wrapped layout
        if (layout === 'wrapped') {
          view = (
            <YStack marginVertical="$2" gap="$1" {...wrappedContainerProps}>
              {labelView}
              {comp}
              {renderHelperText(error)}
            </YStack>
          );
        }

        if (render) {
          return render(view, state);
        }
        return view;
      }}
    />
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormzkFormItemTamagui;
