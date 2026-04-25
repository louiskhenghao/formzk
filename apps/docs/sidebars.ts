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
        {
          type: 'doc',
          id: 'examples/basic-form',
          label: 'Basic form (core)',
        },
        {
          type: 'doc',
          id: 'examples/custom-component',
          label: 'Custom component (core)',
        },
        {
          type: 'doc',
          id: 'examples/config-driven',
          label: 'Config-driven (mui)',
        },
        {
          type: 'doc',
          id: 'examples/mui-adapter',
          label: 'MUI inputs (mui)',
        },
        {
          type: 'doc',
          id: 'examples/multi-step-form',
          label: 'Multi-step wizard (mui)',
        },
        {
          type: 'doc',
          id: 'examples/claim-form',
          label: 'Claim form (mui)',
        },
        {
          type: 'doc',
          id: 'examples/custom-components-showcase',
          label: 'Custom components showcase (mui)',
        },
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
