import React, { createContext, PropsWithChildren, useContext } from 'react';
import find from 'lodash/find';
import some from 'lodash/some';

import { FormzkContextType, FormzkProviderProps } from './props';
import { defaultConfig } from './settings';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormzkContext = createContext<FormzkContextType>(defaultConfig);

// hooks to access config
export const useFormzk = (): FormzkContextType => {
  const context = useContext<FormzkContextType>(FormzkContext);
  if (!context) {
    console.error('useFormzk must be used within a FormzkProvider');
    return defaultConfig;
  }
  return context;
};

// the main provider
export const FormzkProvider: React.FC<
  PropsWithChildren<FormzkProviderProps>
> = (props) => {
  const { config = [], children } = props;

  // ================ HELPERS
  const listComponents: FormzkContextType['listComponents'] = () => {
    return config;
  };

  const getComponent: FormzkContextType['getComponent'] = (name) => {
    return find(config, (e) => e.name === name) ?? undefined;
  };

  const isRegistered: FormzkContextType['isRegistered'] = (name) => {
    return some(config, (e) => e.name === name);
  };

  // ================ VIEWS
  return (
    <FormzkContext.Provider
      value={{
        listComponents,
        getComponent,
        isRegistered,
      }}
    >
      {children}
    </FormzkContext.Provider>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default FormzkProvider;
