import './Aircraft.css';
import '../App.css';
import StaticSidebar from '../Utils/Sidebar/Sidebar';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ModifyAircraft from './ModifyAircraft/ModifyAircraft';
import AircraftPopup from './AircraftPopup/AircraftPopup';
import AddSqauwkPopup from './AddSquawkPopup/AddSquawkPopup';
import NewReservation from '../Reservation/CreateReservation/CreateReservation';
import { Instructor, Plane } from '../Calendar/Calendar';

function Aircraft() {
  // Aircraft Popup
  const [openAircraftPage, setOpenAircraftPage] = useState(false);
  const [currentPlane, setCurrentPlane] = useState<Plane>({} as Plane);
  
  const handleClickPlane = (plane: any) => {
    setCurrentPlane(plane);
    setOpenAircraftPage(true);
  };

  const handleCloseAircraftPage = () => {
    setOpenAircraftPage(false);
  };
  
  // Add Squawk Popup
  const [openAddSquawk, setOpenAddSquawk] = useState(false);
  
  const handleClickOpenSquawk = () => {
    setOpenAddSquawk(true);
  };

  const handleCloseSquawk = () => {
    setOpenAddSquawk(false);
  }

  // Modify Plane Popup
  const [openModifyPlane, setOpenModifyPlane] = useState(false);
  const handleClickOpenModify = () => {
    setOpenModifyPlane(true);
  };

  const handleCloseModify = () => {
    setOpenModifyPlane(false);
  }

  // Create Reservation 
  const [openCreateReservation, setOpenCreateReservation] = useState(false);
  
  const handleClickOpenCreateReservation = () => {
    setOpenCreateReservation(true);
  };

  const handleCloseCreateReservation = () => {
    setOpenCreateReservation(false);
  }

  // Update Screens
  const [updateScreen, setUpdateScreen] = useState(false);
  const [updateAircraftScreen, setUpdateAircraftScreen] = useState(false);
  const handleUpdateScreen = () => {
    setUpdateScreen(!updateScreen);
  }

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

  // Instructor Data Retrieval and Storage
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const fetchInstructors = async () => {
    try {
      const instructors = await fetch('http://localhost:5201/api/instructor/get-all',
      {credentials: 'include'})
        .then((response) => response.json())
        .then((data) => data) as Array<Instructor>;

      setInstructors(instructors); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (updateScreen) {
      fetchPlanes();
      setUpdateScreen(false);
    }
  }, [updateAircraftScreen]);

  useEffect(() => {
    fetchPlanes();
    fetchInstructors();
  }, []); 

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
        
  return (
    <div className="aircraft-page">
      <StaticSidebar />
      <div className="page-content">
        <div className="aircraft-page-header">
          {/*<p>Aircraft</p>*/}
        </div>
        <div className="images" key={ updateScreen.toString()}>
          {/* MaterialUI Grid of Planes*/}
          <Grid container spacing={2}>
            {planes.map((plane, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} >
              <Paper elevation={2} style={{...gridStyle.paper, flexDirection: 'column', flexWrap: 'nowrap'}}>
                <Button fullWidth onClick={()=>{handleClickPlane(plane)}}>
                  <Typography 
                    variant="h5" 
                    align="center" 
                    fontFamily={"Segoe UI"}>
                    {`${plane.nickName} [${plane.tailNumber}]`}
                  </Typography>
                </Button>
              </Paper>
            </Grid>
            ))}
          </Grid>

          {/* Popup Components */}
          <AircraftPopup 
            open={openAircraftPage} 
            onClose={handleCloseAircraftPage} 
            plane={currentPlane} 
            openSquawk={handleClickOpenSquawk} 
            openCreateReservation={handleClickOpenCreateReservation} 
            openModify={handleClickOpenModify}/>
          <AddSqauwkPopup 
            open={openAddSquawk} 
            onClose={handleCloseSquawk} 
            plane={currentPlane}/>
          <NewReservation 
            open={openCreateReservation} 
            onClose={handleCloseCreateReservation} 
            Planes={planes} 
            Instructors={instructors} 
            SelectedPlane={currentPlane}/>
          <ModifyAircraft 
            open={openModifyPlane} 
            onClose={handleCloseModify} 
            planeId={currentPlane.planeId} 
            updateScreen={handleUpdateScreen} 
            setCurrentPlane={setCurrentPlane}/>
        </div>
      </div>       
    </div>      
  )}

export default Aircraft;