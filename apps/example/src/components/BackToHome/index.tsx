import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

export const BackToHome = () => (
  <Button
    component={Link}
    href="/"
    size="small"
    startIcon={<ArrowBackIcon fontSize="small" />}
    sx={{ marginTop: 3, textTransform: 'none' }}
  >
    Back to examples
  </Button>
);

export default BackToHome;
