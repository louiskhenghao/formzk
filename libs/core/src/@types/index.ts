export type ComponentPropsMap = {
  [key: string]: any;
};

export type ComponentConfig = {
  [K in keyof ComponentPropsMap]: {
    /**
     * the name of the component (must be unique)
     */
    name: K;
    /**
     * the actual component
     */
    component: React.ElementType;
    /**
     * the default props that will inject to component
     */
    props?: ComponentPropsMap[K];
  };
};

export type FormzkConfig = ComponentConfig[keyof ComponentPropsMap];
