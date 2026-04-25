import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type ExampleEntry = {
  href: string;
  title: string;
  description: string;
  tags: string[];
};

const examples: ExampleEntry[] = [
  {
    href: '/core',
    title: '@formzk/core basics',
    description:
      'Headless core with custom-rendered inputs, error display and ref-based control.',
    tags: ['core', 'CloneElement', 'render-prop'],
  },
  {
    href: '/mui',
    title: '@formzk/mui — individual items',
    description:
      'Build a form by composing Formzk.MUI.Item children. Demonstrates TextField, Checkbox, Switch, Radio and CheckboxGroup.',
    tags: ['mui', 'composition'],
  },
  {
    href: '/mui-config',
    title: '@formzk/mui — config-driven layout',
    description:
      'Declarative 2D config + grid layout. Reusable via a useFormConfig hook.',
    tags: ['mui', 'config', 'grid'],
  },
  {
    href: '/onboarding',
    title: 'Multi-step onboarding wizard',
    description:
      'Stepper with per-step validation via form.trigger(), shared form state, and a JSON review step.',
    tags: ['multi-step', 'wizard', 'trigger'],
  },
  {
    href: '/claim',
    title: 'Insurance claim submission',
    description:
      'Real-world form with conditional fields, currency input, rating, file uploads and consent.',
    tags: ['conditional', 'file-upload', 'currency'],
  },
  {
    href: '/custom-components',
    title: 'Custom components showcase',
    description:
      'Build custom field components (Slider, Rating, Color, Date, Currency, Chips, FileUpload) and register them via the Provider.',
    tags: ['custom', 'provider', 'registry'],
  },
];

export function LandingPage() {
  return (
    <div className="wrapper">
      <div className="container">
        <div id="welcome">
          <h1>Formzk Playground</h1>
        </div>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ marginTop: 2, marginBottom: 4 }}
        >
          A collection of interactive examples showing how to build forms with
          <code> @formzk/core </code> and <code> @formzk/mui </code>. Pick an
          example below.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {examples.map((example) => (
            <Card key={example.href} variant="outlined">
              <CardActionArea
                component={Link}
                href={example.href}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {example.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 2 }}
                  >
                    {example.description}
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    {example.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default LandingPage;
