import { useRef } from 'react';
import { FormzkFormRefProps } from '@formzk/core';
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button } from '@mui/material';
import * as yup from 'yup';

type InputPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
  switch: boolean;
  radio?: string;
  checkboxes?: string[];
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Minimum length is 8 characters'),
  radio: yup.string().optional(),
  rememberMe: yup.bool().optional(),
  switch: yup
    .bool()
    .oneOf([true], 'Field must be checked')
    .required('Switch is required'),
  checkboxes: yup.array().of(yup.string().required()).min(1, 'must have 1'),
});

export function Index() {
  const ref = useRef<FormzkFormRefProps<InputPayload>>(null);

  const disabled = false;

  return (
    <div className="wrapper">
      <div className="container">
        <Formzk.MUI.Form<InputPayload>
          name="login-form"
          ref={ref}
          options={{
            resolver: yupResolver(schema),
            defaultValues: {
              email: 'louiskhenghao@gmail.com',
              password: '',
              rememberMe: false,
              switch: false,
              checkboxes: [],
            },
          }}
          onSubmit={(values) => {
            console.log(
              'Formzk.Form submit values ---->',
              JSON.stringify(values, null, 2)
            );
          }}
          configLayoutProps={{
            containerProps: { spacing: 1 },
            itemProps: { xs: 6 },
          }}
          config={[
            [
              {
                name: 'email',
                label: 'Email Address',
                component: 'TextField',
                disabled: disabled,
                props: {
                  placeholder: 'Email Address',
                },
                layoutProps: {
                  sm: 3,
                },
              },
              {
                label: 'Password',
                name: 'password',
                component: 'TextField',
                disabled: disabled,
                props: { placeholder: 'Password' },
                layoutProps: {
                  sm: 9,
                },
              },
            ],
            [
              {
                valueKey: 'checked',
                name: 'rememberMe',
                component: 'Checkbox',
                label: 'Remember me?',
                disabled: disabled,
                caption: 'Please check if you wants',
              },
              {
                valueKey: 'checked',
                name: 'switch',
                component: 'Switch',
                label: 'Switch',
                disabled: disabled,
                caption: 'Please check if you wants',
              },
            ],
            [
              {
                label: 'Radio',
                name: 'radio',
                layout: 'wrapped',
                disabled: disabled,
                component: 'RadioGroup',
                props: {
                  options: [
                    { label: 'One', value: 1 },
                    { label: 'Two', value: 2 },
                    { label: 'Three', value: 3 },
                    { label: 'Four', value: 4 },
                  ],
                },
              },
              {
                label: 'Checkbox',
                name: 'checkboxes',
                layout: 'wrapped',
                disabled: disabled,
                component: 'CheckboxGroup',
                props: {
                  options: [
                    { label: 'One', value: 1 },
                    { label: 'Two', value: 2 },
                    { label: 'Three', value: 3 },
                    { label: 'Four', value: 4 },
                  ],
                },
              },
            ],
            [
              {
                content: () => (
                  <Formzk.MUI.Errors
                    containerProps={{ sx: { marginTop: 2, marginBottom: 2 } }}
                  />
                ),
              },
            ],
            [
              {
                content: (
                  <>
                    <Formzk.MUI.Submit />
                    <Formzk.MUI.Reset />
                  </>
                ),
              },
            ],
          ]}
        />
      </div>
    </div>
  );
}

export default Index;
