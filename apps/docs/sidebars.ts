import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'getting-started',
    {
      type: 'category',
      label: 'Examples & playground',
      link: { type: 'doc', id: 'examples/overview' },
      items: [
        'examples/overview',
        'examples/basic-form',
        'examples/config-driven',
        'examples/mui-adapter',
        'examples/custom-component',
      ],
    },
    {
      type: 'category',
      label: '@formzk/core',
      link: { type: 'doc', id: 'core/overview' },
      items: ['core/overview', 'core/api', 'core/register-components'],
    },
    {
      type: 'category',
      label: '@formzk/mui',
      link: { type: 'doc', id: 'mui/overview' },
      items: ['mui/overview', 'mui/grid-render-view'],
    },
    'migration-guide',
    'faq',
  ],
};

export default sidebars;
