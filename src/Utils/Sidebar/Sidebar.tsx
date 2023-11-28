import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlightIcon from "@mui/icons-material/Flight";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import LogoutPopup from "../../Logout/Logout";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import { env } from "../../env";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  phoneNum: string;
  email: string;
  type: string;
  username: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  preferredInstructor: string;
  preferredPlanes: string[];
  proficientPlaneModels: string[];
}

function StaticSidebar(props: any) {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
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
      const isAdmin = (await fetch(`${apiUrl}/api/user/get-current-is-admin`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data)) as boolean;
      setAdmin(isAdmin);
    }
    isAdmin();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await fetch(
        "http://localhost:5201/api/user/get-current",
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => data);

      setCurrentUser(currentUser);
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  let sidebarItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "Calendar", icon: <CalendarTodayIcon />, link: "/calendar" },
    { text: "Aircraft", icon: <FlightIcon />, link: "/aircraft" },
    { text: "Instructors", icon: <PersonIcon />, link: "/instructors" },
    { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
    { text: "Logout", icon: <LogoutIcon />, link: "/logout" },
    { text: "Admin", icon: <SettingsIcon />, link: "/admin" },
    { text: "Users", icon: <PersonIcon />, link: "/user-view" },
  ];

  if (!admin) {
    sidebarItems = sidebarItems.filter((item) => item.text !== "Admin");
  }
  if (admin || currentUser.type === "pilot") {
    sidebarItems = sidebarItems.filter((item) => item.text !== "Users");
  }

  return (
    <Drawer
      sx={{
        width: 180,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 180,
          boxSizing: "border-box",
          backgroundColor: "#E4E4E4",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={(event) => {
                const clickedItem = sidebarItems.find(
                  (item) => item.text === event.currentTarget.textContent
                );
                if (clickedItem && clickedItem.text === sidebarItems[5].text) {
                  handleClickOpen();
                } else {
                  if (clickedItem?.link) {
                    navigate(clickedItem.link);
                  }
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <LogoutPopup open={open} onClose={handleClose} />
    </Drawer>
  );
}

export default StaticSidebar;
