import React from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import './Calendar.css';
import '../App.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import StaticSidebar from '../Sidebar/Sidebar';
import Schedule from './Schedule/Schedule';

function Calendar() {
  return (
    <div className="calendar-page">
        <StaticSidebar />
        <div className="top-content">
            <div className="calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} sx={{fontSize: 20}} />
                </LocalizationProvider>
            </div>
            
            <div className="button-section">
                <div className="calendar-button">
                    <PrimaryButton text="Today"/>
                </div>
                <div className="calendar-button">
                    <PrimaryButton text="Week View"/>
                </div>
                <div className="calendar-button">
                    <PrimaryButton text="New Reservation"/>
                </div>
                <div className="calendar-button">
                    <PrimaryButton text="Limit to Me"/>
                </div>
            </div>

            <div className="dropdown">
                <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
                    <InputLabel id="demo-select-small-label">Aircraft</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="aircraft"
                    >
                        <MenuItem>All</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
                    <InputLabel id="demo-select-small-label">Reservation Type</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="aircraft"
                    >
                        <MenuItem>All</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
                    <InputLabel id="demo-select-small-label">Instructors</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="aircraft"
                    >
                        <MenuItem>All</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
        
        <div className="schedule">
            <Schedule />
        </div>
    </div>
  )}

export default Calendar;
