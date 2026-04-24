import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './styles.module.css';

type PlaygroundProps = {
  /**
   * Map of files available in the playground. Keys are file paths
   * (e.g. 'App.tsx', '/components/MyInput.tsx'), values are source.
   */
  files: Record<string, string>;
  /**
   * The file to show in the editor pane by default.
   */
  activeFile?: string;
  /**
   * Extra dependencies to install in the sandbox on top of react/react-dom.
   * Keys are package names, values are semver ranges.
   */
  dependencies?: Record<string, string>;
  /**
   * Whether to include `@formzk/mui` + peers in the sandbox. Default true
   * so examples can mix adapter and core freely.
   */
  withMui?: boolean;
  /**
   * Editor height in px. Default 480.
   */
  editorHeight?: number;
};

const DEFAULT_CORE_DEPS: Record<string, string> = {
  '@formzk/core': 'latest',
  'react-hook-form': '^7.40',
  yup: '^1.0',
  '@hookform/resolvers': '^3.0',
};

const DEFAULT_MUI_DEPS: Record<string, string> = {
  '@formzk/mui': 'latest',
  '@mui/material': '^7',
  '@emotion/react': '^11',
  '@emotion/styled': '^11',
};

/**
 * Live code playground powered by Sandpack. Runs fully in-browser, users
 * can edit the code and see results immediately, or fork to a full
 * CodeSandbox via the "Open in CodeSandbox" button.
 */
export default function Playground(props: PlaygroundProps) {
  const {
    files,
    activeFile,
    dependencies = {},
    withMui = true,
    editorHeight = 480,
  } = props;

  return (
    <BrowserOnly fallback={<div className={styles.fallback}>Loading playground…</div>}>
      {() => {
        // dynamic import so Sandpack is only bundled client-side
        const {
          Sandpack,
        } = require('@codesandbox/sandpack-react') as typeof import('@codesandbox/sandpack-react');
        const {
          atomDark,
          githubLight,
        } = require('@codesandbox/sandpack-themes') as typeof import('@codesandbox/sandpack-themes');
        const { colorMode } = useColorMode();

        const sandpackFiles: Record<string, string> = {};
        for (const [path, code] of Object.entries(files)) {
          sandpackFiles[path.startsWith('/') ? path : `/${path}`] = code;
        }

        return (
          <div className={styles.wrapper}>
            <Sandpack
              theme={colorMode === 'dark' ? atomDark : githubLight}
              template="react-ts"
              files={sandpackFiles}
              options={{
                editorHeight,
                showConsoleButton: true,
                showLineNumbers: true,
                showTabs: true,
                wrapContent: true,
                activeFile: activeFile
                  ? activeFile.startsWith('/')
                    ? activeFile
                    : `/${activeFile}`
                  : undefined,
                externalResources: [],
              }}
              customSetup={{
                dependencies: {
                  ...DEFAULT_CORE_DEPS,
                  ...(withMui ? DEFAULT_MUI_DEPS : {}),
                  ...dependencies,
                },
              }}
            />
          </div>
        );
      }}
    </BrowserOnly>
  );
}
