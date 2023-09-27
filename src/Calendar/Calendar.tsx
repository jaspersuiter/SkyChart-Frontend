import React from 'react';
import './Calendar.css';
import '../App.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import StaticSidebar from '../Sidebar/Sidebar';

function Calendar() {
  return (
    <div className="calendar-page">

        <StaticSidebar />

        <div className="calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
            </LocalizationProvider>
        </div>
        
        <div className="button">
            <PrimaryButton text="Today"/>
            <PrimaryButton text="Week View"/>
            <PrimaryButton text="New Reservation"/>
            <PrimaryButton text="Limit to Me"/>
        </div>

        <div className="dropdown">
            <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="demo-select-small-label">Aircraft</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="aircraft"
                >
                    <MenuItem>All</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="demo-select-small-label">Reservation Type</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="aircraft"
                >
                    <MenuItem>All</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
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
  )}

export default Calendar;
