import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlightIcon from '@mui/icons-material/Flight';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect } from 'react';
import LogoutPopup from '../Logout/Logout';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { env } from "../env";

function StaticSidebar(props: any) {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  
  const apiUrl = env.SKYCHART_API_URL;
  const [admin, setAdmin] = React.useState(false);
  useEffect(() => {
    async function isAdmin() {
      const isAdmin = await fetch(
        `${apiUrl}/api/user/get-current-is-admin`,
        {
          method: "GET",
          credentials: "include",
        }
      ).then((response) => response.json())
      .then((data) => data) as boolean;
      setAdmin(isAdmin);
      
      console.log("isAdmin", isAdmin);
    }
    isAdmin();
  }, []);

    

    const navigate = useNavigate();

    let sidebarItems = [
        { text: 'Home', icon: <HomeIcon/>, link: '/' },
        { text: 'Calendar', icon: <CalendarTodayIcon/>, link: '/calendar' },
        { text: 'Aircraft', icon: <FlightIcon/>, link: '/aircraft' },
        { text: 'Instructors', icon: <PersonIcon/>, link: '/instructors' },
        { text: 'Settings', icon: <SettingsIcon/>, link: '/settings' },
        { text: 'Logout', icon: <LogoutIcon/>, link: '/logout' },
        { text: 'Admin', icon: <SettingsIcon/>, link: '/admin'},
    ]

    if (!admin) {
      sidebarItems = sidebarItems.filter((item) => item.text !== 'Admin');
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
          {sidebarItems.map((item, index) => (
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