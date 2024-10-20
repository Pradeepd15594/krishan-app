// theme.d.ts
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      button: string;
      text: string;
      z1: string;
      // Add other custom shadows here if needed
    };
  }

  // Allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: {
      button?: string;
      text?: string;
      z1?: string;
      // Add other custom shadows here if needed
    };
  }
}