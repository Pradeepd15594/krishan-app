import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Project import
import AuthFooter from './../AuthFooter';
import AuthCard from './../AuthCard';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '80vh' }} className="ttttt">
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '80vh' }}>
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <img src={`${process.env.PUBLIC_URL}/logo.jpg`} style={{maxWidth:'100%', height:50}} />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 130px)' } }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Box>
  );
};

AuthWrapper.propTypes = { children: PropTypes.node };

export default AuthWrapper;