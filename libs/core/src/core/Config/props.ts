import { ComponentConfig, ComponentName, ComponentPropsMap } from '../../@types';

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
  listComponents: () => ComponentConfig<keyof ComponentPropsMap>[];
  /**
   * get specific registered component
   */
  getComponent: (
    name: ComponentName
  ) => ComponentConfig<keyof ComponentPropsMap> | undefined;
  /**
   * check whether component has registered before
   */
  isRegistered: (name: ComponentName) => boolean;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FormzkProviderProps;
