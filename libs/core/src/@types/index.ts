// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComponentPropsMap {}

// Fallback to `any` when the consumer has not augmented ComponentPropsMap,
// otherwise `ComponentPropsMap[K]` collapses to `never` and breaks JSX usage.
export type ComponentPropsOf<K> = [keyof ComponentPropsMap] extends [never]
  ? any
  : K extends keyof ComponentPropsMap
  ? ComponentPropsMap[K]
  : any;

// Fallback to `string` when ComponentPropsMap is not augmented — otherwise
// `keyof ComponentPropsMap` is `never` and API surfaces like
// `getComponent(name)` reject every argument.
export type ComponentName = [keyof ComponentPropsMap] extends [never]
  ? string
  : keyof ComponentPropsMap;

export type ComponentConfig<
  K extends keyof ComponentPropsMap = keyof ComponentPropsMap
> = {
  /**
   * the name of the component (must be unique)
   */
  name: K;
  /**
   * the actual component
   */
  component: React.ComponentType<ComponentPropsOf<K>>;
  /**
   * the default props that will inject to component
   */
  props?: ComponentPropsOf<K>;
};
