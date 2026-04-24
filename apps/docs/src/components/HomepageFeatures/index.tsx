import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Headless & typed',
    description: (
      <>
        Built on <code>react-hook-form</code>, with a component registry that
        gives you autocomplete and type-safety for every <code>component="..."</code>{' '}
        name via TypeScript declaration merging.
      </>
    ),
  },
  {
    title: 'Swappable UI',
    description: (
      <>
        One form declaration, many renderers. Use <code>@formzk/mui</code> today
        or ship your own adapter for Tamagui, Mantine, or plain HTML.
      </>
    ),
  },
  {
    title: 'Configurable or JSX',
    description: (
      <>
        Render forms declaratively from a config array, or drop into full JSX for
        the cases that need it. Mix both inside the same form.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
