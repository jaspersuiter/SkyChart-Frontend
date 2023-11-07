import '../App.css';
import './Home.css';
import StaticSidebar from '../Utils/Sidebar/Sidebar';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Instructor, Plane } from '../Calendar/Calendar';


function Home() {
    return (
        <div className="home-page">
            <StaticSidebar />
            <div className="home-page-content">
                <p className="home-page-header">Welcome to Home Page!</p>
            </div>
        </div>      
    )}

export default Home;