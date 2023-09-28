import './Aircraft.css';
import '../App.css';
import StaticSidebar from '../Sidebar/Sidebar';
import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import { SetStateAction, useState } from 'react';


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
              backgroundColor: '#a9a9a9', // Change to your desired background color
              borderRadius: '12px', // Adjust the border radius as needed
              padding: '16px', // Add padding for content spacing
              // You can also add other styles like boxShadow, margin, etc.
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
            <Paper elevation={3} style={customStyles.paper} >
              <Button fullWidth onClick={() => {
                  // Handle click action here
                  console.log(`Clicked on ${item.description}`);
                }}>
                <Typography variant="h6" align="center">
                    {item.description}
                  </Typography>
                  <br/>
                  <img
                    src={item.src}
                    alt={item.description}
                    style={{ width: '200px', height: '150px', cursor: 'pointer' }}
                  />
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid> 
      </div>
      </div>       
      </div>      
  )}

export default Aircraft;
