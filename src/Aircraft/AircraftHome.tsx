import './Aircraft.css';
import '../App.css';
import StaticSidebar from '../Utils/Sidebar/Sidebar';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ModifyAircraft from './ModifyAircraft/ModifyAircraft';
import AircraftPopup from './AircraftPopup/AircraftPopup';
import AddSqauwkPopup from './AddSquawkPopup/AddSquawkPopup';
import NewReservation from '../Reservation/CreateReservation/CreateReservation';
import { Instructor, Plane } from '../Calendar/Calendar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Aircraft from "./Aircraft";


function AircraftHome() {
  // Aircraft Popup
  const [openAircraftPage, setOpenAircraftPage] = useState(false);

  const handleCloseAircraftPage = () => {
    setOpenAircraftPage(false);
  };

  // Update Screens
  const [updateScreen, setUpdateScreen] = useState(false);
  const [updateAircraftScreen, setUpdateAircraftScreen] = useState(false);
  const handleUpdateScreen = () => {
    setUpdateScreen(!updateScreen);
  }

  useEffect(() => {
    if (updateScreen) {
      setUpdateScreen(false);
    }
  }, [updateAircraftScreen]);

  const gridStyle = {
    paper: {
      backgroundColor: '#DDDDDD',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'fit-content',
    }
  };

  const buttonStyle = {
    paper: {
      variant: "h4"
    }
  }

  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/Aircraft');
    } else if (newValue === 1) {
      navigate('/AircraftMaintenance');
    }
  };
        
  return (
    <div className="aircraft-page">
      <StaticSidebar />
      <div className="page-content">
        <Tabs value={value} onChange={handleChange}  centered>
            <Tab label="View Planes"  />
            <Divider orientation="vertical" flexItem />
            <Tab label="View Plane Maintenance" />
        </Tabs>
        <Routes>
          <Route path="/aircrafthome/aircrafts" element={<Aircraft />} />
          <Route path="/AircraftMaintenance" />
        </Routes>
      </div>       
    </div>      
  )}

export default AircraftHome;