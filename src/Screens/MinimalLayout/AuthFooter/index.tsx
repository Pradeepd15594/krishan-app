import React from 'react';
// Material-UI
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        spacing={2}
        textAlign={{ xs: 'center', sm: 'inherit' }}
      >
        <Typography variant="subtitle2" color="secondary">
          This site is protected by{' '}
          <Typography component={Link} variant="subtitle2" href="https://www.termsfeed.com/live/96516d2a-bcbe-4019-bf9e-949fc8551604" target="_blank" underline="hover">
            Privacy Policy
          </Typography>
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} textAlign={{ xs: 'center', sm: 'inherit' }}>
          {/* <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://codedthemes.com"
            target="_blank"
            underline="hover"
          >
            Terms and Conditions
          </Typography> */}
          {/* <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://www.termsfeed.com/live/96516d2a-bcbe-4019-bf9e-949fc8551604"
            target="_blank"
            underline="hover"
          >
            Privacy Policy
          </Typography> */}
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;