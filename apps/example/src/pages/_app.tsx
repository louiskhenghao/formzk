import { Formzk } from '@formzk/mui';
import { Input } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { formConfig } from '../config/form.config';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to example!</title>
      </Head>
      <main className="app">
        <Formzk.Native.Provider config={formConfig}>
          {/* <Formzk.Provider
          config={[
            {
              name: '',
              component: Input,
            },
          ]}
        > */}
          <Component {...pageProps} />
        </Formzk.Native.Provider>
      </main>
    </>
  );
}

export default CustomApp;
