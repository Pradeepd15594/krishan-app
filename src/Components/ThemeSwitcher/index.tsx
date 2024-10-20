import React, { useState } from 'react';
import { ConfigProvider, Button } from 'antd';
import { blue, red, green, orangeDark, greenDark } from '@ant-design/colors';

const ThemeSwitcher = () => {
  const [themeColor, setThemeColor] = useState(blue.primary);

  // Function to update the theme color dynamically
  const switchTheme = (type:string) => {
    if(type=='BlueTheme'){
        setThemeColor(blue.primary);
    }
    

    if(type=='RedTheme'){
        setThemeColor(red.primary);
    }

    if(type=='GreenTheme'){
        setThemeColor(green.primary);
    }

    if(type=='OrangeDarkTheme'){
        setThemeColor(orangeDark.primary);
    }

    if(type=='GreenDarkTheme'){
        setThemeColor(greenDark.primary);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeColor, // Dynamically updating the primary color
        },
      }}
    >
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: themeColor }}>Dynamic Theme Switcher</h2>
        <Button type="primary" style={{ marginRight: '10px' }}>Primary Button</Button>
        <Button onClick={() => switchTheme('GreenTheme')}>GreenTheme</Button>
        <Button onClick={() => switchTheme('OrangeDarkTheme')}>OrangeDarkTheme</Button>
        <Button onClick={() => switchTheme('GreenDarkTheme')}>GreenDarkTheme</Button>
        <Button onClick={() => switchTheme('RedTheme')} style={{ marginLeft: '10px' }}>RedTheme</Button>
        <Button onClick={() => switchTheme('BlueTheme')} style={{ marginLeft: '10px' }}>BlueTheme</Button>
      </div>
    </ConfigProvider>
  );
};

export default ThemeSwitcher;