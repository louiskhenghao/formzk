import { ComponentConfig, ComponentName, ComponentPropsMap } from '../../@types';

/**
 * ===========================
 * MAIN
 * ===========================
 */
// Distributive union: each entry can be a `ComponentConfig<K>` for *its own*
// `K`, instead of all entries sharing one `K = keyof ComponentPropsMap`.
// Without this, `component`/`props` would have to satisfy the union of every
// registered prop shape, which is impossible across heterogeneous components.
export type ComponentConfigEntry = [keyof ComponentPropsMap] extends [never]
  ? ComponentConfig<keyof ComponentPropsMap>
  : {
      [K in keyof ComponentPropsMap]: ComponentConfig<K>;
    }[keyof ComponentPropsMap];

export type FormzkProviderProps = {
  /**
   * config to registering components
   */
  config: ComponentConfigEntry[];
};

export type FormzkContextType = {
  /**
   * list registered components
   */
  listComponents: () => ComponentConfigEntry[];
  /**
   * get specific registered component
   */
  getComponent: (name: ComponentName) => ComponentConfigEntry | undefined;
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
