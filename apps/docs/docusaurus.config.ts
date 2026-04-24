import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'formzk',
  tagline: 'A comprehensive form management library for React',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://louiskhenghao.github.io',
  baseUrl: '/formzk/',

  organizationName: 'louiskhenghao',
  projectName: 'formzk',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/louiskhenghao/formzk/tree/main/apps/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'formzk',
      logo: {
        alt: 'formzk logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://www.npmjs.com/package/@formzk/core',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/louiskhenghao/formzk',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting started', to: '/docs/getting-started' },
            { label: '@formzk/core', to: '/docs/core/overview' },
            { label: '@formzk/mui', to: '/docs/mui/overview' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/louiskhenghao/formzk/issues',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/louiskhenghao/formzk/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Contributing',
              href: 'https://github.com/louiskhenghao/formzk/blob/main/CONTRIBUTING.md',
            },
            {
              label: 'Releasing',
              href: 'https://github.com/louiskhenghao/formzk/blob/main/RELEASING.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Louis Loo. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
