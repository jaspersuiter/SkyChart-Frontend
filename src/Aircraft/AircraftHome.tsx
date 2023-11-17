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
import AllSquawks from '../Home/AllSquawks/AllSquawks';


function AircraftHome() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Plane Data Retrieval and Storage
  const [planes, setPlanes] = useState<Plane[]>([]);
  const fetchPlanes = async () => {
    try {
      const planes = await fetch('http://localhost:5201/api/plane/get-all',
      {credentials: 'include'})
        .then((response) => response.json())
        .then((data) => data) as Array<Plane>;

      setPlanes(planes); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Run fetchPlanes when the component is initially loaded
    fetchPlanes();
  }, []);
        
  return (
    <div className="aircraft-page">
      <StaticSidebar />
      <div className="page-content">
        <Tabs value={value} onChange={handleChange}  centered>
            <Tab label="View Planes" sx={{fontSize: '1.2rem'}} />
            <Tab label="View Plane Maintenance" sx={{fontSize: '1.2rem'}} />
        </Tabs>
        {value === 0 && <Aircraft />}
        {value === 1 && <AllSquawks planes={planes} />}
      </div>       
    </div>      
  )}

export default AircraftHome;