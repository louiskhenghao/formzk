import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxProps,
  Formzk,
  RadioGroup,
  RadioGroupProps,
  Switch,
  SwitchProps,
} from '@formzk/mui';
import Input, { InputProps } from '@mui/material/Input';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AppProps } from 'next/app';
import Head from 'next/head';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to example!</title>
      </Head>
      <main className="app">
        <Formzk.Native.Provider
          config={[
            {
              name: 'MyInput',
              component: Input,
              props: {
                size: 'small',
                fullWidth: true,
              } as InputProps,
            },
            {
              name: 'MyTextField',
              component: TextField,
              props: {
                size: 'small',
                fullWidth: true,
              } as TextFieldProps,
            },
            {
              name: 'MyCheckbox',
              component: Checkbox,
              props: {
                variant: 'outlined',
              } as CheckboxProps,
            },
            {
              name: 'TextField',
              component: TextField,
              props: {
                fullWidth: true,
                variant: 'outlined',
                margin: 'normal',
              } as TextFieldProps,
            },
            {
              name: 'Checkbox',
              component: Checkbox,
              props: {} as SwitchProps,
            },
            {
              name: 'Switch',
              component: Switch,
              props: {} as SwitchProps,
            },
            {
              name: 'RadioGroup',
              component: RadioGroup,
              props: {} as RadioGroupProps,
            },
            {
              name: 'CheckboxGroup',
              component: CheckboxGroup,
              props: {} as CheckboxGroupProps,
            },
          ]}
        >
          <Component {...pageProps} />
        </Formzk.Native.Provider>
      </main>
    </>
  );
}

export default CustomApp;
