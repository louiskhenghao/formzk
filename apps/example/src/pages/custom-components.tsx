import { useRef } from 'react';
import { FormzkFormRefProps } from '@formzk/core';
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';

import { BackToHome, LiveFormPreview } from '../components';

type ShowcasePayload = {
  brandColor: string;
  budget: number | null;
  satisfaction: number | null;
  experience: number;
  joinedOn: string;
  tags: string[];
  attachments: { name: string; size: number; type: string }[];
};

const schema = yup.object().shape({
  brandColor: yup.string().required('Pick a color'),
  budget: yup
    .number()
    .nullable()
    .typeError('Enter a valid amount')
    .min(0, 'Must be positive')
    .required('Budget is required'),
  satisfaction: yup
    .number()
    .nullable()
    .min(1, 'Rate at least one star')
    .required('Rate your experience'),
  experience: yup.number().min(0).max(20).required(),
  joinedOn: yup.string().required('Required'),
  tags: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Add at least one tag')
    .required(),
  attachments: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
        size: yup.number().required(),
        type: yup.string().required(),
      }),
    )
    .required(),
});

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="overline" color="text.secondary" sx={{ display: 'block' }}>
    {children}
  </Typography>
);

export function CustomComponentsPage() {
  const ref = useRef<FormzkFormRefProps<ShowcasePayload>>(null);

  return (
    <div className="wrapper">
      <div className="container">
        <BackToHome />
        <div id="welcome">
          <h1>Custom Components 🧩</h1>
        </div>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          Each field below is a small custom component (color picker, slider,
          rating, currency, date, file upload, chips). They follow the standard
          <code> value / onChange </code> contract and are registered globally in
          <code> _app.tsx</code>.
        </Typography>

        <Box sx={{ marginTop: 4 }}>
          <Formzk.MUI.Form<ShowcasePayload>
            name="custom-components-form"
            ref={ref}
            options={{
              mode: 'onTouched',
              resolver: yupResolver(schema) as never,
              defaultValues: {
                brandColor: '#1976d2',
                budget: 5000,
                satisfaction: 4,
                experience: 3,
                joinedOn: '',
                tags: ['react', 'forms'],
                attachments: [],
              },
            }}
            onSubmit={(values) => {
              console.log('Custom components submitted ->', values);
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3,
                alignItems: 'start',
              }}
            >
              <Stack spacing={3}>
              <Box>
                <SectionTitle>Color Picker</SectionTitle>
                <Formzk.MUI.Item<ShowcasePayload>
                  name="brandColor"
                  label="Brand color"
                  component="ColorPicker"
                  caption="Native HTML color input wrapped as a controlled field"
                />
              </Box>

              <Box>
                <SectionTitle>Currency Input</SectionTitle>
                <Formzk.MUI.Item<ShowcasePayload>
                  name="budget"
                  label="Monthly budget"
                  component="CurrencyInput"
                  caption="Returns a number value with adornment and validation"
                  props={{ currency: 'USD' }}
                />
              </Box>

              <Box>
                <SectionTitle>Rating</SectionTitle>
                <Formzk.MUI.Item<ShowcasePayload>
                  name="satisfaction"
                  label="How satisfied are you?"
                  component="RatingInput"
                  layout="wrapped"
                  props={{ max: 5 }}
                />
              </Box>

              <Box>
                <SectionTitle>Slider</SectionTitle>
                <Formzk.MUI.Item<ShowcasePayload>
                  name="experience"
                  label="Years of experience"
                  component="SliderInput"
                  layout="wrapped"
                  props={{ min: 0, max: 20, marks: true, step: 1 }}
                />
              </Box>

              <Box>
                <SectionTitle>Date Input</SectionTitle>
                <Formzk.MUI.Item<ShowcasePayload>
                  name="joinedOn"
                  label="Joined on"
                  component="DateInput"
                />
              </Box>

              <Box>
                <SectionTitle>Chips Input</SectionTitle>
                <Formzk.MUI.Item<ShowcasePayload>
                  name="tags"
                  label="Tags"
                  component="ChipsInput"
                  layout="wrapped"
                  caption="Press Enter or comma to add a tag, Backspace to remove"
                  props={{ placeholder: 'Add a tag…' }}
                />
              </Box>

              <Box>
                <SectionTitle>File Upload</SectionTitle>
                <Formzk.MUI.Item<ShowcasePayload>
                  name="attachments"
                  label="Attachments"
                  component="FileUpload"
                  layout="wrapped"
                  props={{ accept: 'image/*,application/pdf', maxSizeMb: 5 }}
                />
              </Box>
              </Stack>

              <LiveFormPreview<ShowcasePayload> sticky />
            </Box>

            <Divider sx={{ marginY: 3 }} />

            <Formzk.MUI.Errors />

            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
              <Formzk.MUI.Submit text="Save preferences" />
              <Formzk.MUI.Reset />
            </Stack>
          </Formzk.MUI.Form>
        </Box>
      </div>
    </div>
  );
}

export default CustomComponentsPage;
