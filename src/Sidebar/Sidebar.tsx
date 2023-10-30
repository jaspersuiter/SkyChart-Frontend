import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlightIcon from '@mui/icons-material/Flight';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useState } from 'react';
import LogoutPopup from '../Logout/Logout';
import { useNavigate } from 'react-router-dom';

function StaticSidebar(props: any) {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState<any | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('http://localhost:5201/api/user/get-current', {
                    credentials: 'include',
                });
                const data = await response.json();
                setUser(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserData();
    }, []);



    const sidebarItems = [
        { text: 'Home', icon: <HomeIcon/>, link: '/' },
        { text: 'Calendar', icon: <CalendarTodayIcon/>, link: '/calendar' },
        { text: 'Aircraft', icon: <FlightIcon/>, link: '/aircraft' },
        { text: 'Instructors', icon: <PersonIcon/>, link: '/instructors' },
        { text: 'Settings', icon: <SettingsIcon/>, link: '/settings' },
        { text: 'Logout', icon: <LogoutIcon/>, link: '/logout' },
    ]

    if (user && user.type === 'Instructor') {
      sidebarItems.push({ text: 'Admin', icon: <SettingsIcon />, link: '/admin' });
      console.log(sidebarItems);
  }

    return (
      <Drawer
        sx={{
          width: 180,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 180,
            boxSizing: 'border-box',
            backgroundColor: '#E4E4E4',
          },
          
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {sidebarItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={(event) => {
                const clickedItem = sidebarItems.find(item => item.text === event.currentTarget.textContent);
                if (clickedItem && clickedItem.text === sidebarItems[5].text) {
                  handleClickOpen();
                } else {
                  if (clickedItem?.link) {
                    navigate(clickedItem.link);
                  }
                }
              }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <LogoutPopup 
                      open={open}
                      onClose={handleClose}
                  />
      </Drawer>
    );}

export default StaticSidebar;