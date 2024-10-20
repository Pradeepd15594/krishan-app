import { ReactNode, useEffect, useState } from 'react';

// material-ui
import { Button, CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import Dark from './Dark';
import Light from './Light';
import Indigo from './Indigo';
import { useSelector } from 'react-redux';

// project import
// import Palette from './palette';
// import Typography from './Typography';
// import CustomShadows from './Shadows';
// import ComponentsOverrides from './Overrides';
import { deepOrange, red, lightGreen, orange, yellow, grey } from '@mui/material/colors';

// ==============================|| DEFAULT THEME - MAIN ||============================== //

interface ThemeCustomizationProps {
  children: ReactNode;
}

export default function ThemeCustomization({ children }: ThemeCustomizationProps): JSX.Element {
  // const themes=Dark;
  // const themes=Light;
  // const [activeTheme, setActiveTheme] = useState('light');
  const selectedTheme:any=useSelector((state:any)=>state?.AppReducer?.selectedTheme)

  useEffect(()=>{
    console.log(selectedTheme, 'selectedTheme');
    
  },[selectedTheme]);


  const themes:any = {
    light: Light,
    dark: Dark,
    indigo: Indigo, // Add more themes if needed
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes[selectedTheme ? selectedTheme: 'light']}>
        <CssBaseline />

        {/* <div style={{padding:14, marginTop:45, marginLeft:320}}>
          <Button onClick={()=>setActiveTheme('light')} variant={'contained'} color={'primary'}>Light Theme</Button>
          <Button onClick={()=>setActiveTheme('dark')} variant={'contained'} color={'primary'}>Dark Theme</Button>
          <Button onClick={()=>setActiveTheme('indigo')} variant={'contained'} color={'primary'}>Indigo Theme</Button>
        </div> */}
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}