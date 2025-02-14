import { useRef } from 'react';
import {
  CloneElement,
  Formzk,
  FormzkFormRefProps,
  useFormzk,
} from '@formzk/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import * as yup from 'yup';

type InputPayload = {
  email: string;
  password: string;
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
});

export function Index() {
  const { getComponent } = useFormzk();
  const ref = useRef<FormzkFormRefProps<InputPayload>>(null);

  getComponent('zzz');

  return (
    <div className="wrapper">
      <div className="container">
        <div id="welcome">
          <h1>@formzk/core example 👋</h1>
        </div>

        <Formzk.Form<InputPayload>
          ref={ref}
          options={{
            resolver: yupResolver(schema),
            // defaultValues: {
            //   email: 'louiskhenghao@gmail.com',
            //   password: '',
            // },
          }}
          onSubmit={(values) => {
            console.log('Formzk.Form submit values ---->', values);
          }}
        >
          <div>
            <Formzk.Input
              name="email"
              component="as"
              field={{
                defaultValue: 'louiskhenghao@gmail.com',
              }}
            />
          </div>
          <div>
            <Formzk.Input
              name="password"
              component="MyTextField"
              field={{
                defaultValue: '12345678910',
              }}
              render={(comp, { fieldState }) => {
                const error = fieldState.error?.message;
                return (
                  <CloneElement
                    placeholder="Password"
                    error={!!error}
                    helperText={error}
                  >
                    {comp}
                  </CloneElement>
                );
              }}
            />
          </div>
          <div>
            <Formzk.Input
              name="rememberMe"
              component="MyCheckbox"
              props={{ label: 'Remember Me?' }}
            />
          </div>

          <Formzk.Errors
            render={(hasError, errors) => {
              if (!hasError) return null;
              return (
                <div style={{ padding: '0.5rem', background: '#f87171' }}>
                  <ul>
                    {errors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              );
            }}
          />

          <Formzk.Submit render={(e) => <Button onClick={e}>Submit</Button>} />
          <Formzk.Reset render={(e) => <Button onClick={e}>Reset</Button>} />
        </Formzk.Form>
      </div>
    </div>
  );
}

export default Index;
