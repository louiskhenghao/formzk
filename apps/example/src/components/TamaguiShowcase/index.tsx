import { useRef } from 'react';
import { FormzkFormRefProps } from '@formzk/core';
import {
  Checkbox,
  CheckboxGroup,
  Formzk,
  RadioGroup,
  Select,
  Switch,
} from '@formzk/tamagui';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultConfig } from '@tamagui/config/v4';
import {
  createTamagui,
  Input,
  Separator,
  SizableText,
  TamaguiProvider,
  XStack,
  YStack,
} from 'tamagui';
import * as yup from 'yup';

import { BackToHome } from '../BackToHome';

const tamaguiConfig = createTamagui(defaultConfig);

type InputPayload = {
  username: string;
  agree: boolean;
  notify: boolean;
  role?: string;
  permissions?: string[];
  plan?: string;
};

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  agree: yup
    .bool()
    .oneOf([true], 'You must agree to the terms')
    .required('Agreement is required'),
  notify: yup.bool().required(),
  role: yup.string().optional(),
  permissions: yup.array().of(yup.string().required()),
  plan: yup.string().optional(),
});

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <YStack marginTop="$4" gap="$2">
    <SizableText size="$2" textTransform="uppercase" color="$color10">
      {title}
    </SizableText>
    <Separator />
    {children}
  </YStack>
);

export function TamaguiShowcase() {
  const ref = useRef<FormzkFormRefProps<InputPayload>>(null);

  return (
    <div className="wrapper">
      <div className="container">
        <BackToHome />
        <div id="welcome">
          <h1>@formzk/tamagui showcase 🪄</h1>
        </div>

        <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
          {/* page-scoped registry — isolated from the MUI components in _app */}
          <Formzk.Native.Provider
            config={[
              { name: 'TamaguiInput', component: Input },
              { name: 'TamaguiCheckbox', component: Checkbox },
              { name: 'TamaguiCheckboxGroup', component: CheckboxGroup },
              { name: 'TamaguiRadioGroup', component: RadioGroup },
              { name: 'TamaguiSwitch', component: Switch },
              { name: 'TamaguiSelect', component: Select },
            ]}
          >
            <YStack maxWidth={640}>
              <Formzk.Tamagui.Form<InputPayload>
                ref={ref}
                options={{
                  resolver: yupResolver(schema),
                  defaultValues: {
                    username: '',
                    agree: false,
                    notify: true,
                    role: 'editor',
                    permissions: ['read'],
                    plan: 'pro',
                  },
                }}
                onSubmit={(values) => {
                  console.log(
                    'Formzk.Tamagui.Form submit values ---->',
                    JSON.stringify(values, null, 2)
                  );
                }}
              >
                <Formzk.Tamagui.Item
                  name="username"
                  label="Username"
                  component="TamaguiInput"
                  caption="Tamagui Input registered via the Provider"
                  props={{ placeholder: 'jane.doe' }}
                />

                <Section title="Checkbox & Switch">
                  <Formzk.Tamagui.Item
                    name="agree"
                    label="I agree to the terms"
                    component="TamaguiCheckbox"
                    valueKey="checked"
                    layout="contained"
                  />
                  <Formzk.Tamagui.Item
                    name="notify"
                    label="Email notifications"
                    component="TamaguiSwitch"
                    valueKey="checked"
                    layout="contained"
                  />
                </Section>

                <Section title="Groups">
                  <Formzk.Tamagui.Item
                    name="permissions"
                    label="Permissions"
                    component="TamaguiCheckboxGroup"
                    props={{
                      options: [
                        { label: 'Read', value: 'read' },
                        { label: 'Write', value: 'write' },
                        { label: 'Admin', value: 'admin' },
                      ],
                    }}
                  />
                  <Formzk.Tamagui.Item
                    name="role"
                    label="Role"
                    component="TamaguiRadioGroup"
                    props={{
                      options: [
                        { label: 'Viewer', value: 'viewer' },
                        { label: 'Editor', value: 'editor' },
                        { label: 'Owner', value: 'owner' },
                      ],
                    }}
                  />
                </Section>

                <Section title="Select">
                  <Formzk.Tamagui.Item
                    name="plan"
                    label="Subscription plan"
                    component="TamaguiSelect"
                    props={{
                      placeholder: 'Pick a plan',
                      options: [
                        { label: 'Free', value: 'free' },
                        { label: 'Pro', value: 'pro' },
                        { label: 'Enterprise', value: 'enterprise' },
                      ],
                    }}
                  />
                </Section>

                <Formzk.Tamagui.Errors containerProps={{ marginTop: '$3' }} />

                <XStack gap="$2" marginTop="$4">
                  <Formzk.Tamagui.Submit text="Submit" />
                  <Formzk.Tamagui.Reset text="Reset" />
                </XStack>
              </Formzk.Tamagui.Form>
            </YStack>
          </Formzk.Native.Provider>
        </TamaguiProvider>
      </div>
    </div>
  );
}

export default TamaguiShowcase;
