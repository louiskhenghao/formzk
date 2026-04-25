import { useRef, useState } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';
import { FormzkFormRefProps } from '@formzk/core';
import { Formzk } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import * as yup from 'yup';

import { BackToHome, LiveFormPreview } from '../components';

type OnboardingPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: string;
  bio?: string;
  birthday: string;
  newsletter: boolean;
  interests: string[];
  theme: string;
  notifications: ('email' | 'sms' | 'push')[];
};

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'At least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  role: yup.string().required('Pick a role'),
  bio: yup.string().max(280, 'Keep it under 280 characters'),
  birthday: yup.string().required('Birthday is required'),
  newsletter: yup.bool().required(),
  interests: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Pick at least one interest')
    .required(),
  theme: yup.string().required(),
  notifications: yup
    .array()
    .of(yup.string().oneOf(['email', 'sms', 'push']).required())
    .required(),
});

type StepFields = FieldPath<OnboardingPayload>[];

const stepLabels = ['Account', 'Profile', 'Preferences'] as const;

const stepFieldGroups: StepFields[] = [
  ['email', 'password', 'confirmPassword'],
  ['firstName', 'lastName', 'role', 'birthday', 'bio'],
  ['interests', 'theme', 'notifications', 'newsletter'],
];

// Render every step's fields up-front but hide inactive ones. This keeps each
// react-hook-form Controller mounted across step navigation, so values entered
// on earlier steps survive the round trip to later steps and back.
const StepPanel = ({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) => (
  <Box sx={{ display: active ? 'block' : 'none' }} aria-hidden={!active}>
    {children}
  </Box>
);

const AccountStep = () => (
  <Stack spacing={2}>
    <Formzk.MUI.Item<OnboardingPayload>
      name="email"
      label="Email"
      component="TextField"
      props={{ placeholder: 'you@example.com' }}
    />
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Box sx={{ flex: 1 }}>
        <Formzk.MUI.Item<OnboardingPayload>
          name="password"
          label="Password"
          component="TextField"
          props={{ type: 'password', placeholder: '••••••••' }}
          caption="Minimum 8 characters"
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Formzk.MUI.Item<OnboardingPayload>
          name="confirmPassword"
          label="Confirm Password"
          component="TextField"
          props={{ type: 'password', placeholder: '••••••••' }}
        />
      </Box>
    </Stack>
  </Stack>
);

const ProfileStep = () => (
  <Stack spacing={2}>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Box sx={{ flex: 1 }}>
        <Formzk.MUI.Item<OnboardingPayload>
          name="firstName"
          label="First name"
          component="TextField"
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Formzk.MUI.Item<OnboardingPayload>
          name="lastName"
          label="Last name"
          component="TextField"
        />
      </Box>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Box sx={{ flex: 1 }}>
        <Formzk.MUI.Item<OnboardingPayload>
          name="role"
          label="Role"
          component="Select"
          props={{
            options: [
              { label: 'Engineer', value: 'engineer' },
              { label: 'Designer', value: 'designer' },
              { label: 'Product Manager', value: 'pm' },
              { label: 'Founder', value: 'founder' },
              { label: 'Other', value: 'other' },
            ],
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Formzk.MUI.Item<OnboardingPayload>
          name="birthday"
          label="Birthday"
          component="DateInput"
        />
      </Box>
    </Stack>
    <Formzk.MUI.Item<OnboardingPayload>
      name="bio"
      label="Short bio"
      component="TextField"
      caption="Optional · max 280 characters"
      props={{
        multiline: true,
        minRows: 3,
        placeholder: 'Tell us a bit about yourself',
      }}
    />
  </Stack>
);

const PreferencesStep = () => (
  <Stack spacing={2}>
    <Formzk.MUI.Item<OnboardingPayload>
      name="interests"
      label="Interests"
      component="CheckboxGroup"
      layout="wrapped"
      props={{
        options: [
          { label: 'Frontend', value: 'frontend' },
          { label: 'Backend', value: 'backend' },
          { label: 'Mobile', value: 'mobile' },
          { label: 'DevOps', value: 'devops' },
          { label: 'AI / ML', value: 'ai' },
        ],
      }}
    />
    <Formzk.MUI.Item<OnboardingPayload>
      name="theme"
      label="Theme"
      component="RadioGroup"
      layout="wrapped"
      props={{
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'System', value: 'system' },
        ],
      }}
    />
    <Formzk.MUI.Item<OnboardingPayload>
      name="notifications"
      label="Notifications"
      component="CheckboxGroup"
      layout="wrapped"
      props={{
        options: [
          { label: 'Email', value: 'email' },
          { label: 'SMS', value: 'sms' },
          { label: 'Push', value: 'push' },
        ],
      }}
    />
    <Formzk.MUI.Item<OnboardingPayload>
      valueKey="checked"
      name="newsletter"
      component="Switch"
      props={{ label: 'Subscribe to product updates' }}
    />
  </Stack>
);

const StepNavigator = ({
  step,
  fields,
  onBack,
  onNext,
  isLast,
}: {
  step: number;
  fields: StepFields;
  onBack: () => void;
  onNext: () => void;
  isLast: boolean;
}) => {
  const { trigger } = useFormContext<OnboardingPayload>();

  const handleNext = async () => {
    const valid = await trigger(fields, { shouldFocus: true });
    if (valid) onNext();
  };

  return (
    <Stack
      direction="row"
      sx={{ marginTop: 4, justifyContent: 'space-between' }}
    >
      <Button variant="outlined" disabled={step === 0} onClick={onBack}>
        Back
      </Button>
      {isLast ? (
        <Formzk.MUI.Submit text="Complete onboarding" />
      ) : (
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      )}
    </Stack>
  );
};

const SummaryView = () => (
  <Box sx={{ marginTop: 2 }}>
    <LiveFormPreview<OnboardingPayload> title="Review your details" />
  </Box>
);

export function OnboardingPage() {
  const ref = useRef<FormzkFormRefProps<OnboardingPayload>>(null);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const isLast = step === stepLabels.length - 1;

  return (
    <div className="wrapper">
      <div className="container">
        <BackToHome />
        <div id="welcome">
          <h1>Multi-step Onboarding 🚀</h1>
        </div>

        <Stepper activeStep={step} sx={{ marginTop: 3, marginBottom: 3 }}>
          {stepLabels.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {completed && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            Onboarding complete — check the console for the submitted payload.
          </Alert>
        )}

        <Formzk.MUI.Form<OnboardingPayload>
          name="onboarding-form"
          ref={ref}
          options={{
            mode: 'onTouched',
            resolver: yupResolver(schema) as never,
            defaultValues: {
              email: '',
              password: '',
              confirmPassword: '',
              firstName: '',
              lastName: '',
              role: '',
              bio: '',
              birthday: '',
              newsletter: true,
              interests: [],
              theme: 'system',
              notifications: ['email'],
            },
          }}
          onSubmit={(values) => {
            console.log('Onboarding submitted ->', values);
            setCompleted(true);
          }}
        >
          <StepPanel active={step === 0}>
            <AccountStep />
          </StepPanel>
          <StepPanel active={step === 1}>
            <ProfileStep />
          </StepPanel>
          <StepPanel active={step === 2}>
            <PreferencesStep />
          </StepPanel>

          {isLast && <SummaryView />}

          <Formzk.MUI.Errors
            containerProps={{ sx: { marginTop: 2 } }}
            title="Please fix the highlighted fields"
          />

          <StepNavigator
            step={step}
            fields={stepFieldGroups[step]}
            isLast={isLast}
            onBack={() => setStep((s) => Math.max(0, s - 1))}
            onNext={() =>
              setStep((s) => Math.min(stepLabels.length - 1, s + 1))
            }
          />
        </Formzk.MUI.Form>
      </div>
    </div>
  );
}

export default OnboardingPage;
