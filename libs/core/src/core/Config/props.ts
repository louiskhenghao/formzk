import { ComponentConfig, ComponentPropsMap, FormzkConfig } from '../../@types';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormzkProviderProps = {
  /**
   * config to registering components
   */
  config: FormzkConfig[];
};

export type FormzkContextType = {
  /**
   * list registered components
   */
  listComponents: () => ComponentPropsMap[];
  /**
   * get specific registered component
   */
  getComponent: (name: keyof ComponentPropsMap) => FormzkConfig | undefined;
  /**
   * check whether component has registered before
   */
  isRegistered: (name: keyof ComponentPropsMap) => boolean;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FormzkProviderProps;
