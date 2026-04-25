import { useMemo, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { FormzkFormRefProps } from '@formzk/core';
import { Formzk, FormzkFormMUIProps } from '@formzk/mui';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';

import { BackToHome, LiveFormPreview } from '../components';

type ClaimPayload = {
  policyNumber: string;
  claimantName: string;
  email: string;
  phone: string;
  incidentDate: string;
  category: 'auto' | 'health' | 'property' | 'travel' | 'other';
  otherCategory?: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'MYR';
  severity: number;
  description: string;
  injuriesReported: boolean;
  policeReportFiled: boolean;
  attachments: { name: string; size: number; type: string }[];
  consent: boolean;
};

const schema = yup.object().shape({
  policyNumber: yup
    .string()
    .required('Policy number is required')
    .matches(/^[A-Z0-9-]{6,}$/i, 'Looks like an invalid policy number'),
  claimantName: yup.string().required('Required'),
  email: yup.string().required('Required').email('Invalid email'),
  phone: yup
    .string()
    .required('Required')
    .matches(/^[+\d\s()-]{7,}$/, 'Invalid phone'),
  incidentDate: yup.string().required('Required'),
  category: yup
    .string()
    .oneOf(['auto', 'health', 'property', 'travel', 'other'])
    .required(),
  otherCategory: yup.string().when('category', {
    is: 'other',
    then: (s) => s.required('Please describe the category'),
    otherwise: (s) => s.optional(),
  }),
  amount: yup
    .number()
    .typeError('Enter a valid amount')
    .required('Amount is required')
    .min(1, 'Amount must be greater than 0'),
  currency: yup.string().oneOf(['USD', 'EUR', 'GBP', 'MYR']).required(),
  severity: yup
    .number()
    .min(1, 'Rate the severity')
    .max(5)
    .required('Rate the severity'),
  description: yup
    .string()
    .required('Description is required')
    .min(20, 'Please provide at least 20 characters'),
  injuriesReported: yup.bool().required(),
  policeReportFiled: yup.bool().required(),
  attachments: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
        size: yup.number().required(),
        type: yup.string().required(),
      }),
    )
    .min(1, 'Attach at least one supporting document')
    .required(),
  consent: yup
    .bool()
    .oneOf([true], 'You must confirm before submitting')
    .required(),
});

const ConditionalOtherCategory = () => {
  const category = useWatch<ClaimPayload>({ name: 'category' });
  if (category !== 'other') return null;
  return (
    <Formzk.MUI.Item<ClaimPayload>
      name="otherCategory"
      label="Specify category"
      component="TextField"
      props={{ placeholder: 'e.g. equipment damage' }}
    />
  );
};

export function ClaimPage() {
  const ref = useRef<FormzkFormRefProps<ClaimPayload>>(null);

  const config = useMemo<FormzkFormMUIProps<ClaimPayload>['config']>(
    () => [
      [
        {
          name: 'policyNumber',
          label: 'Policy number',
          component: 'TextField',
          props: { placeholder: 'POL-123456' },
          layoutProps: { sm: 6 },
        },
        {
          name: 'incidentDate',
          label: 'Incident date',
          component: 'DateInput',
          layoutProps: { sm: 6 },
        },
      ],
      [
        {
          name: 'claimantName',
          label: 'Claimant name',
          component: 'TextField',
          layoutProps: { sm: 12 },
        },
      ],
      [
        {
          name: 'email',
          label: 'Email',
          component: 'TextField',
          props: { placeholder: 'you@example.com' },
          layoutProps: { sm: 6 },
        },
        {
          name: 'phone',
          label: 'Phone',
          component: 'TextField',
          props: { placeholder: '+1 555 0100' },
          layoutProps: { sm: 6 },
        },
      ],
      [
        {
          name: 'category',
          label: 'Claim category',
          component: 'Select',
          props: {
            options: [
              { label: 'Auto', value: 'auto' },
              { label: 'Health', value: 'health' },
              { label: 'Property', value: 'property' },
              { label: 'Travel', value: 'travel' },
              { label: 'Other', value: 'other' },
            ],
          },
          layoutProps: { sm: 6 },
        },
        {
          name: 'currency',
          label: 'Currency',
          component: 'Select',
          props: {
            options: [
              { label: 'USD', value: 'USD' },
              { label: 'EUR', value: 'EUR' },
              { label: 'GBP', value: 'GBP' },
              { label: 'MYR', value: 'MYR' },
            ],
          },
          layoutProps: { sm: 6 },
        },
      ],
      [
        {
          content: <ConditionalOtherCategory />,
          layoutProps: { xs: 12 },
        },
      ],
      [
        {
          name: 'amount',
          label: 'Claimed amount',
          component: 'CurrencyInput',
          caption: 'Enter the total amount you are claiming',
          layoutProps: { sm: 6 },
        },
        {
          name: 'severity',
          label: 'Severity',
          component: 'RatingInput',
          layout: 'wrapped',
          caption: '1 = minor, 5 = severe',
          props: { max: 5 },
          layoutProps: { sm: 6 },
        },
      ],
      [
        {
          name: 'description',
          label: 'Describe what happened',
          component: 'TextField',
          props: {
            multiline: true,
            minRows: 4,
            placeholder: 'Time, location, sequence of events…',
          },
        },
      ],
      [
        {
          valueKey: 'checked',
          name: 'injuriesReported',
          component: 'Switch',
          props: { label: 'Were any injuries reported?' },
          layoutProps: { sm: 6 },
        },
        {
          valueKey: 'checked',
          name: 'policeReportFiled',
          component: 'Switch',
          props: { label: 'Was a police report filed?' },
          layoutProps: { sm: 6 },
        },
      ],
      [
        {
          name: 'attachments',
          label: 'Supporting documents',
          component: 'FileUpload',
          layout: 'wrapped',
          caption: 'Photos, receipts, police reports — multiple allowed',
          props: { accept: 'image/*,application/pdf', maxSizeMb: 10 },
        },
      ],
      [
        {
          valueKey: 'checked',
          name: 'consent',
          component: 'Checkbox',
          props: { label: 'I confirm the information provided is accurate' },
        },
      ],
    ],
    [],
  );

  return (
    <div className="wrapper">
      <div className="container">
        <BackToHome />
        <div id="welcome">
          <h1>Submit a Claim 🛡️</h1>
        </div>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1, marginBottom: 2 }}
        >
          Provide as much detail as possible. Required fields are validated on
          submit, and the "Other" category reveals an additional input.
        </Typography>

        <Formzk.MUI.Form<ClaimPayload>
          name="claim-form"
          ref={ref}
          options={{
            mode: 'onTouched',
            resolver: yupResolver(schema) as never,
            defaultValues: {
              policyNumber: '',
              claimantName: '',
              email: '',
              phone: '',
              incidentDate: '',
              category: 'auto',
              otherCategory: '',
              amount: 0,
              currency: 'USD',
              severity: 0,
              description: '',
              injuriesReported: false,
              policeReportFiled: false,
              attachments: [],
              consent: false,
            },
          }}
          onSubmit={(values) => {
            console.log('Claim submitted ->', values);
            window.alert('Claim submitted — see console for payload');
          }}
          configLayoutProps={{ containerProps: { spacing: 2 } }}
          config={config}
        >
          <Box sx={{ marginTop: 3 }}>
            <Formzk.MUI.Errors title="Please fix these issues" />
          </Box>

          <Box sx={{ marginTop: 3 }}>
            <LiveFormPreview<ClaimPayload> title="Claim payload preview" />
          </Box>

          <Divider sx={{ marginY: 3 }} />

          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Formzk.MUI.Reset text="Clear" />
            <Formzk.MUI.Submit text="Submit claim" />
          </Stack>
        </Formzk.MUI.Form>
      </div>
    </div>
  );
}

export default ClaimPage;
