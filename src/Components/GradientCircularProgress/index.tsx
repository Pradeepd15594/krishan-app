import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// Custom LinearProgress with styling for height and color
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10, // Adjust the height of the LinearProgress bar
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

// Define the props for the component
interface GradientCircularProgressProps {
  size?: number;  // Optional size prop, with default value
  thickness?: number;  // Optional thickness prop
  value?: number;  // Progress value for the linear progress bar (if needed)
}

const GradientCircularProgress: React.FC<GradientCircularProgressProps> = ({
  size = 80,  // Default size to 80 if not provided
  thickness = 5,  // Default thickness to 5 if not provided
  value = 50,  // Default progress value to 50 if not provided
}) => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
      <React.Fragment>
        {/* Gradient for CircularProgress */}
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>

        {/* CircularProgress with dynamic size */}
        <CircularProgress
          sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
          size={size}  // Pass the dynamic size prop here
          thickness={thickness}  // Pass the dynamic thickness prop
        />
      </React.Fragment>
    </Stack>
  );
};

export default GradientCircularProgress;