export type ComponentPropsMap = Record<string, any>;

export type ComponentConfig<K extends keyof ComponentPropsMap> = {
  /**
   * the name of the component (must be unique)
   */
  name: K;
  /**
   * the actual component
   */
  component: React.ComponentType<ComponentPropsMap[K]>;
  /**
   * the default props that will inject to component
   */
  props?: ComponentPropsMap[K];
};
