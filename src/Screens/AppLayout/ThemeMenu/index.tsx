import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { setTheme, } from '../../../Redux/Actions/SagaAction';
import { useDispatch, useSelector } from 'react-redux';

export default function ThemeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const selectedTheme:any=useSelector((state:any)=>state?.AppReducer?.selectedTheme)
  const open = Boolean(anchorEl);
  const dispatch=useDispatch()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChangeTheme = (themeName:string) => {
      dispatch(setTheme(themeName))
      setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <Button variant={'text'}
            color="secondary"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <DarkModeIcon sx={{ width: 24, height: 24 }} />
            <Typography sx={{paddingLeft:'5px'}}>Theme {selectedTheme}</Typography>
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
        <MenuItem onClick={()=>handleChangeTheme('light')}>
          <ListItemIcon>
            <LightbulbCircleIcon fontSize="small" />
          </ListItemIcon>
         Light
        </MenuItem>
        <MenuItem onClick={()=>handleChangeTheme('dark')}>
          <ListItemIcon>
            <NightlightIcon fontSize="small" />
          </ListItemIcon>
          Dark
        </MenuItem>
        <MenuItem onClick={()=>handleChangeTheme('indigo')}>
          <ListItemIcon>
            <FlashOnIcon fontSize="small" />
          </ListItemIcon>
          Indigo
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
