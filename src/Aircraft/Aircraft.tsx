import './Aircraft.css';
import '../App.css';
import StaticSidebar from '../Sidebar/Sidebar';
import { Box, Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SecondaryButton from '../Buttons/SecondaryButton';
import React from 'react';
import ModifyAircraft from './ModifyAircraft';
import AircraftPopup from './AircraftPopup';
import { Instructor, Plane } from '../Calendar/Calendar';
import AddSqawkPopup from './AddSquawkPopup';
import NewReservation from '../Reservation/NewReservation';

function Aircraft() {

  const [open, setOpen] = React.useState(false);
  const [openSquawk, setOpenSquawk] = React.useState(false);
  const [openCreateReservation, setOpenCreateReservation] = React.useState(false);
  const [currentPlane, setCurrentPlane] = React.useState<Plane>({} as Plane);

  const handleClickOpen = (plane: any) => {
    setCurrentPlane(plane);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenSquawk = () => {
    setOpenSquawk(true);
  };
  const handleCloseSquawk = () => {
    setOpenSquawk(false);
  }

  const handleClickOpenCreateReservation = () => {
    setOpenCreateReservation(true);
  };

  const handleCloseCreateReservation = () => {
    setOpenCreateReservation(false);
  }

  const [planes, setPlanes] = useState<Plane[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  
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
    fetchPlanes();
    fetchInstructors();
  }, []); 

          const customStyles = {
            paper: {
              backgroundColor: '#D3D3D3',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'fit-content',
            
            },
          };
        
  return (
    <div className="aircraft-page">
        <StaticSidebar />
        <div className="page-content">
          <div className="filters">
        
          </div>

          <div className="images">
            <Grid container spacing={2}>
              {planes.map((plane, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} >
                <Paper elevation={3} style={{...customStyles.paper, flexDirection: 'column', flexWrap: 'nowrap'}}>
                  <Button fullWidth onClick={()=>{handleClickOpen(plane)}}>  
                    <Typography variant="h4" align="center">
                      {plane.nickName}
                    </Typography>
                    <Typography align="center">
                      {`${plane.model}, ${plane.grounded ? 'Grounded' : 'In Service'}`}
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <AircraftPopup open={open} onClose={handleClose} plane={currentPlane} openSquawk={handleClickOpenSquawk} openCreateReservation={handleClickOpenCreateReservation} key={openSquawk.toString()}/>
          <AddSqawkPopup open={openSquawk} onClose={handleCloseSquawk} plane={currentPlane}/>
          <NewReservation open={openCreateReservation} onClose={handleCloseCreateReservation} Planes={planes} Instructors={instructors} SelectedPlane={currentPlane}/>
          {/* <ModifyAircraft open={open} onClose={handleClose} planeId={currentPlaneId}/> */}
        </div>
      </div>       
    </div>      
  )}

export default Aircraft;