import dynamic from 'next/dynamic';

// Tamagui injects its styles at runtime; render client-side only to keep
// this example free of SSR style-extraction setup.
const TamaguiShowcase = dynamic(
  () => import('../components/TamaguiShowcase'),
  { ssr: false }
);

export function Index() {
  return <TamaguiShowcase />;
}

export default Index;
