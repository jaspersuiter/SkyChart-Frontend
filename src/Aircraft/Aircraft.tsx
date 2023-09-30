import './Aircraft.css';
import '../App.css';
import StaticSidebar from '../Sidebar/Sidebar';
import { Box, Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';


function Aircraft() {
    const imagesData = [
        { src: 'logo192.png', description: 'Plane 1' },
        { src: 'logo512.png', description: 'Plane 2' },
        { src: 'favicon.ico', description: 'Plane 3' },
        // Add more images and descriptions here
      ];
      
        const [selectedCategory, setSelectedCategory] = useState('All');
      
        const handleCategoryChange = (description: SetStateAction<string>) => {
          setSelectedCategory(description);
        };
      
        const filteredImages = selectedCategory === 'All'
          ? imagesData
          : imagesData.filter((item) => item.description === selectedCategory);

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
        <ButtonGroup variant="outlined" aria-label="Image Categories">
          <Button onClick={() => handleCategoryChange('All')}>All</Button>
          <Button onClick={() => handleCategoryChange('Plane 1')}>Plane 1</Button>
          <Button onClick={() => handleCategoryChange('Plane 2')}>Plane 2</Button>
          {/* Add more category buttons as needed */}
        </ButtonGroup>
        </div>

        <div className="images">
          <Grid container spacing={2} >
          {filteredImages.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} >
            <Paper elevation={3} style={{...customStyles.paper, flexDirection: 'column', flexWrap: 'nowrap'}} component={Link} to={`/aircraft/${item.description}`}>  
              <Typography variant="h6" align="center">
                {item.description}
              </Typography>
              <img
                src={item.src}
                alt={item.description}
                style={{ width: '200px', height: '150px', cursor: 'pointer' }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid> 
      </div>
      </div>       
      </div>      
  )}

export default Aircraft;