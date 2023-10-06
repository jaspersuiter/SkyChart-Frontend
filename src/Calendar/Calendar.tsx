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
import Identifier from './Schedule/Identifier';
import HourBar from './Schedule/HourHolder';
import AircraftSection from './Schedule/AircraftSection';
import InstructorSelection from './Schedule/Instructor';
import dayjs, { Dayjs } from 'dayjs';
import WeekPicker from './Schedule/WeekPicker';

function Calendar() {
    const [open, setOpen] = React.useState(false);
    const [isDay, setIsDay] = React.useState(true);
    const [day, SetDay] = React.useState<Dayjs | null>(dayjs());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSwapDayWeek = () => {
        setIsDay(!isDay);
    };

    const swapDayandWeek = () => {
        handleSwapDayWeek()
    };

    const setToday = () => {
        SetDay(dayjs())
    }

  return (
    <div className="mainpage">
        <StaticSidebar />
        <div className="main-content">

            <div className='top-content-frame'>
                <div>
                    {isDay ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar showDaysOutsideCurrentMonth 
                        fixedWeekNumber={6} 
                        sx={{fontSize: 20}} 
                        value={day} 
                        onChange={(newValue) => SetDay(newValue)} />
                    </LocalizationProvider>
                    :
                    <WeekPicker day={day} updateDay={(newValue) => SetDay(newValue)}/>}
                </div>
                
            
                <div className="buttons-frame">

                    <PrimaryButton text="Today" onClick={setToday}/>
               
                    <PrimaryButton text={ isDay ? "Week View" : "Day View"} onClick={swapDayandWeek}/>

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

            { day && <Schedule isDay={isDay} day={day} key={day.toString() + isDay.toString()}/>}

           
        </div>
        <NewReservation open={open} onClose={handleClose}/>
    </div>
  )}

export default Calendar;
