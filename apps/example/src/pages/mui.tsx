import { useRef } from 'react';
import { FormzkFormRefProps } from '@formzk/core';
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import * as yup from 'yup';

type InputPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
  switch: boolean;
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
  rememberMe: yup.bool().optional(),
  switch: yup
    .bool()
    .oneOf([true], 'Field must be checked')
    .required('Switch is required'),
  checkboxes: yup.array().of(yup.string().required()),
});

export function Index() {
  const ref = useRef<FormzkFormRefProps<InputPayload>>(null);

  const disabled = false;

  return (
    <div className="wrapper">
      <div className="container">
        <div id="welcome">
          <h1>Welcome example 👋</h1>
        </div>

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
        >
          <Formzk.MUI.Item
            name="email"
            label="Email Address"
            component="TextField"
            disabled={disabled}
            props={{
              required: true,
              placeholder: 'Email Address',
            }}
          />
          <Formzk.MUI.Item
            label="Password"
            name="password"
            component="TextField"
            disabled={disabled}
            caption="Password must include 1234567890*!"
            props={{ type: 'password', placeholder: 'Password' }}
          />

          <Formzk.MUI.Item
            valueKey="checked"
            name="rememberMe"
            component="Checkbox"
            label="Remember me?"
            disabled={disabled}
            caption="Please check if you wants"
          />

          <Formzk.MUI.Item
            valueKey="checked"
            label="Switch"
            name="switch"
            disabled={disabled}
            component="Switch"
            caption="Please check if you wants"
          />

          <Formzk.MUI.Item
            label="Radio"
            name="radio"
            layout="wrapped"
            // disabled={disabled}
            component="RadioGroup"
            props={{
              options: [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 },
                { label: 'Three', value: 3 },
                { label: 'Four', value: 4 },
              ],
            }}
          />

          <Formzk.MUI.Item
            label="Checkbox"
            name="checkboxes"
            layout="wrapped"
            disabled={disabled}
            component="CheckboxGroup"
            props={{
              options: [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 },
                { label: 'Three', value: 3 },
                { label: 'Four', value: 4 },
              ],
            }}
          />

          <Formzk.Native.Reset
            render={(e) => (
              <Button onClick={e} variant="outlined">
                Reset
              </Button>
            )}
          />
          <Formzk.Native.Submit
            render={(e) => (
              <Button type="submit" variant="contained">
                Submit
              </Button>
            )}
          />
        </Formzk.MUI.Form>
      </div>
    </div>
  );
}

export default Index;
