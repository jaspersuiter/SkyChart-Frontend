import React from 'react';
import './Calendar.css';
import '../App.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
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
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Age
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                    }}
                >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </NativeSelect>
            </FormControl>
        </div>
    </div>
  )}

export default Calendar;
