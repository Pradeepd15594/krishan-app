import React from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import MainCard from './../../../Components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

interface AuthCardProps extends BoxProps {
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, ...other }) => {
  const theme = useTheme(); // Get the theme
  // Ensure custom shadows are correctly typed and available
  const shadow = theme.customShadows?.z1 as string; 

  return (
    <div className={'oooooooooo'}>
    <MainCard
      sx={{
        maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 1 },
        '& > *': { flexGrow: 1, flexBasis: '40%' },
      }}
      // {...other}
      content={false}
      border={false}
      boxShadow={true}
      shadow={shadow} // Use the computed shadow string directly
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
    </div>
  );
};

export default AuthCard;