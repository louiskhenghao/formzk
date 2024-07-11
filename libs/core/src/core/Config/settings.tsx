import { FormzkContextType } from './props';

/**
 * default config for context
 */
export const defaultConfig: FormzkContextType = {
  listComponents: () => [],
  getComponent: () => undefined,
  isRegistered: () => false,
};
