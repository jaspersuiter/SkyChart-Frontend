import './Calendar.css';
import '../App.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import StaticSidebar from '../Sidebar/Sidebar';
import Schedule from './Schedule/Schedule';
import NewReservation from '../Reservation/NewReservation';
import React from 'react';
import Hour from './Schedule/HourIdentifier';

function Calendar() {
    const [open, setOpen] = React.useState(false);
    const [isDay, setIsDay] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDayView = () => {
        setIsDay(true);
    };

    const handleClickWeekView = () => {
        setIsDay(false);
    };
  return (
    <div className="mainpage">
        <StaticSidebar />
        <div className="main-content">

            <div className='top-content-frame'>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} sx={{fontSize: 20}} />
                    </LocalizationProvider>
                </div>
                
            
                <div className="buttons-frame">

                    <PrimaryButton text="Today"/>
               
                    <PrimaryButton text="Week View"/>

                    <PrimaryButton text="New Reservation" onClick={handleClickOpen}/>

                    <PrimaryButton text="Limit to Me"/>

                </div>

                <div className="sorting-frame">
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
                        label="instructor"
                    >
                        <MenuItem>All</MenuItem>
                    </Select>
                    </FormControl>
                    </div>

            </div>

            <div className='main-calendar-frame'>

                {!isDay && <div className='weekday-frame'></div>}
                <div className='time-frame'>
                    <Hour isDay={true} Time={"6am"}></Hour>
                    <Hour isDay={true} Time={"7am"}></Hour>
                    <Hour isDay={true} Time={"8am"}></Hour>
                    <Hour isDay={true} Time={"9am"}></Hour>
                    <Hour isDay={true} Time={"10am"}></Hour>
                    <Hour isDay={true} Time={"11am"}></Hour>
                    <Hour isDay={true} Time={"12am"}></Hour>
                    <Hour isDay={true} Time={"1pm"}></Hour>
                    <Hour isDay={true} Time={"2pm"}></Hour>
                    <Hour isDay={true} Time={"3pm"}></Hour>
                    <Hour isDay={true} Time={"4pm"}></Hour>
                    <Hour isDay={true} Time={"5pm"}></Hour>
                    <Hour isDay={true} Time={"6pm"}></Hour>
                    <Hour isDay={true} Time={"7pm"}></Hour>
                    <Hour isDay={true} Time={"8pm"}></Hour>
                    <Hour isDay={true} Time={"9pm"}></Hour>
                    <Hour isDay={true} Time={"10pm"}></Hour>
                </div>
                
            </div>
           
        </div>
        <NewReservation open={open} onClose={handleClose}/>
    </div>
  )}

export default Calendar;
