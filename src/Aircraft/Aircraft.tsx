import './Aircraft.css';
import '../App.css';
import StaticSidebar from '../Sidebar/Sidebar';
import { Box, Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Plane {
  id: number;
  model: string;
  grounded: boolean;
  nickname: string;
}

function Aircraft() {

  const [planes, setPlanes] = useState<Plane[]>([]);

  
  const fetchPlanes = async () => {
    try {
        const planes = await fetch('http://localhost:5201/api/plane/get-all',
        {credentials: 'include'})
            .then((response) => response.json())
            .then((data) => data);

        const mappedPlanes = planes.map((plane: any) => ({
            id: plane.planeId,
            model: plane.model,
            grounded: plane.grounded,
            nickname: plane.nickName,
        }));

        setPlanes(mappedPlanes); 
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    fetchPlanes();
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
          <Grid container spacing={2} >
          {planes.map((plane, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} >
            <Paper elevation={3} style={{...customStyles.paper, flexDirection: 'column', flexWrap: 'nowrap'}}>  
              <Typography variant="h4" align="center">
                {plane.nickname}
              </Typography>
              <Typography align="center">
                {`${plane.model}, ${plane.grounded ? 'Grounded' : 'In Service'}`}
              </Typography>
              
            </Paper>
          </Grid>
        ))}
      </Grid> 
      </div>
      </div>       
      </div>      
  )}

export default Aircraft;