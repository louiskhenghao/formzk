import { ComponentConfig, ComponentPropsMap } from '@formzk/core';
import {
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Select,
  Switch,
} from '@formzk/mui';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

export const formConfig: ComponentConfig[keyof ComponentPropsMap][] = [
  {
    name: 'MyInput',
    component: Input,
    props: {
      size: 'small',
      fullWidth: true,
    },
  },
  {
    name: 'MyTextField',
    component: TextField,
    props: {
      size: 'small',
      fullWidth: true,
    },
  },
  {
    name: 'MyCheckbox',
    component: Checkbox,
    props: {},
  },
  {
    name: 'TextField',
    component: OutlinedInput,
    props: {
      fullWidth: true,
    },
  },
  {
    name: 'Checkbox',
    component: Checkbox,
    props: {},
  },
  {
    name: 'Switch',
    component: Switch,
    props: {},
  },
  {
    name: 'RadioGroup',
    component: RadioGroup,
    props: {},
  },
  {
    name: 'CheckboxGroup',
    component: CheckboxGroup,
    props: {},
  },
  {
    name: 'Select',
    component: Select,
    props: {},
  },
];
