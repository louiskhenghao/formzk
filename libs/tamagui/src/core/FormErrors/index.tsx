import React from 'react';
import { FormzkFormErrors as FormzkFormCoreErrors } from '@formzk/core';
import { SizableText, YStack } from 'tamagui';

import { FormErrorsViewProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormErrorsView: React.FC<FormErrorsViewProps> = (props) => {
  const { title = 'Error', containerProps, titleProps, messageProps } = props;

  // ================ VIEWS
  return (
    <FormzkFormCoreErrors
      render={(hasError, errors) => {
        if (!hasError) return null;
        return (
          <YStack
            theme="red"
            backgroundColor="$color2"
            borderColor="$borderColor"
            borderWidth={1}
            borderRadius="$4"
            padding="$3"
            gap="$1"
            {...containerProps}
          >
            <SizableText fontWeight="bold" color="$color10" {...titleProps}>
              {title}
            </SizableText>
            {/* error message */}
            {errors.map((e, i) => {
              return (
                <SizableText key={i} color="$color10" {...messageProps}>
                  {e}
                </SizableText>
              );
            })}
          </YStack>
        );
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
export default FormErrorsView;
