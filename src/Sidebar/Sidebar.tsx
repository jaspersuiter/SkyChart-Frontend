import React from 'react';
import './Sidebar.css';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlightIcon from '@mui/icons-material/Flight';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function StaticSidebar(props: any) {

    const sidebarItems = [
        { text: 'Home', icon: <HomeIcon/>, link: '/' },
        { text: 'Calendar', icon: <CalendarTodayIcon/>, link: '/calendar' },
        { text: 'Aircraft', icon: <FlightIcon/>, link: '/aircraft' },
        { text: 'Instructors', icon: <PersonIcon/>, link: '/instructors' },
        { text: 'Settings', icon: <SettingsIcon/>, link: '/settings' },
        { text: 'Logout', icon: <LogoutIcon/>, link: '/logout' },
    ]

  return (
   //<ThemeProvider theme={theme}>
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#E4E4E4',
        },
        
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
    //</ThemeProvider>
  );}

export default StaticSidebar;