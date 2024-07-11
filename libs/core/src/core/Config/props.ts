import { ComponentConfig, ComponentPropsMap } from '../../@types';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type FormzkProviderProps = {
  /**
   * config to registering components
   */
  config: ComponentConfig<keyof ComponentPropsMap>[];
};

export type FormzkContextType = {
  /**
   * list registered components
   */
  listComponents: () => ComponentPropsMap[];
  /**
   * get specific registered component
   */
  getComponent: (
    name: keyof ComponentPropsMap
  ) => ComponentConfig<keyof ComponentPropsMap> | undefined;
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
