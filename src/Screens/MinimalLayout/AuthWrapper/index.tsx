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
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '80vh', zIndex:9 }}>
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} style={{maxWidth:'100%',zIndex:1, position:'absolute', height:100}} />
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
            <Grid item style={{zIndex:9}}>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>

      <img src={`${process.env.PUBLIC_URL}/tree.png`} 
      style={{position: 'absolute',zIndex: 0,bottom: 0, right: 0, maxWidth:300}} />
    </Box>
  );
};

AuthWrapper.propTypes = { children: PropTypes.node };

export default AuthWrapper;