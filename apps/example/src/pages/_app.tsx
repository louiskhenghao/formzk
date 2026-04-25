import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxProps,
  Formzk,
  RadioGroup,
  RadioGroupProps,
  Select,
  SelectProps,
  Switch,
  SwitchProps,
} from '@formzk/mui';
import Input, { InputProps } from '@mui/material/Input';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { AppProps } from 'next/app';
import Head from 'next/head';

import {
  ChipsInput,
  ChipsInputProps,
  ColorPicker,
  ColorPickerProps,
  CurrencyInput,
  CurrencyInputProps,
  DateInput,
  DateInputProps,
  FileUpload,
  FileUploadProps,
  RatingInput,
  RatingInputProps,
  SliderInput,
  SliderInputProps,
} from '../components';

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
              props: { size: 'small', fullWidth: true } as InputProps,
            },
            {
              name: 'MyTextField',
              component: OutlinedInput,
              props: { size: 'small', fullWidth: true } as OutlinedInputProps,
            },
            {
              name: 'MyCheckbox',
              component: Checkbox,
              props: { variant: 'outlined' } as CheckboxProps,
            },
            {
              name: 'TextField',
              component: OutlinedInput,
              props: { fullWidth: true } as OutlinedInputProps,
            },
            { name: 'Checkbox', component: Checkbox, props: {} as CheckboxProps },
            { name: 'Switch', component: Switch, props: {} as SwitchProps },
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
            { name: 'Select', component: Select, props: {} as SelectProps },
            {
              name: 'CurrencyInput',
              component: CurrencyInput,
              props: {} as CurrencyInputProps,
            },
            {
              name: 'RatingInput',
              component: RatingInput,
              props: {} as RatingInputProps,
            },
            {
              name: 'SliderInput',
              component: SliderInput,
              props: {} as SliderInputProps,
            },
            {
              name: 'ColorPicker',
              component: ColorPicker,
              props: {} as ColorPickerProps,
            },
            {
              name: 'DateInput',
              component: DateInput,
              props: {} as DateInputProps,
            },
            {
              name: 'FileUpload',
              component: FileUpload,
              props: {} as FileUploadProps,
            },
            {
              name: 'ChipsInput',
              component: ChipsInput,
              props: {} as ChipsInputProps,
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
