import { useRef } from 'react';
import { FormzkFormRefProps } from '@formzk/core';
import { Formzk, FormzkFormMUIProps, Select } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, Stack } from '@mui/material';
import * as yup from 'yup';

import { FieldValue, FieldValues } from 'react-hook-form';

type InputPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
  switch: boolean;
  radio?: string;
  checkboxes?: string[];
  select?: string | number;
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

export const useFormConfig = (
  options
): FormzkFormMUIProps<InputPayload>['config'] => {
  const disabled = options?.disabled ?? false;

  return [
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
        label: 'Select',
        name: 'select',
        layout: 'wrapped',
        disabled: disabled,
        component: 'Select',
        props: {
          options: [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 },
            { label: 'Four', value: 4 },
            { label: 'One-str', value: '1-str' },
            { label: 'Two-str', value: '2-str' },
            { label: 'Three-str', value: '3-str' },
            { label: 'Four-str', value: '4-str' },
          ],
        },
      },
    ],
  ];
};

export function Index() {
  const ref = useRef<FormzkFormRefProps<InputPayload>>(null);

  const disabled = false;
  const configs = useFormConfig({ disabled });

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
              select: '2-str',
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
          config={configs}
        >
          <Formzk.MUI.Errors
            containerProps={{ sx: { marginTop: 2, marginBottom: 2 } }}
          />

          <Formzk.MUI.Item
            name="select"
            label="Select"
            component="Select"
            layout="wrapped"
            props={{
              options: [
                { label: 'One', value: 1, disabled: true },
                { label: 'Two', value: 2 },
                { label: 'Three', value: 3 },
                { label: 'Four', value: 4 },
                { label: 'One-str', value: '1-str' },
                { label: 'Two-str', value: '2-str' },
                { label: 'Three-str', value: '3-str' },
                { label: 'Four-str', value: '4-str' },
              ],
            }}
          />

          <Stack direction="row" marginTop={4}>
            <Formzk.MUI.Submit />
            <Formzk.MUI.Reset />
          </Stack>

          <Select
            label="Test Select example"
            options={[
              { label: 'One', value: '1', disabled: true },
              { label: 'Two', value: '2' },
              { label: 'Three', value: '3' },
              { label: 'Four', value: '4' },
              { label: 'One-str', value: '1-str' },
              { label: 'Two-str', value: '2-str' },
              { label: 'Three-str', value: '3-str' },
              { label: 'Four-str', value: '4-str' },
            ]}
            onChange={(value) => {
              console.log('Select onChanges: ', value);
            }}
          />
        </Formzk.MUI.Form>
      </div>
    </div>
  );
}

export default Index;
