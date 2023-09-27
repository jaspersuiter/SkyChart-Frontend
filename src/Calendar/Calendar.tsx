import React from 'react';
import logo from '../logo.svg';
import './Calendar.css';
import '../App.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';

function Calendar() {
  return (
    <div className="calendar-page">
        <div className="static-sidebar">

        {
        /* Static Sidebar */
        }
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25" fill="none">
            <path d="M16.3258 0.457641C15.5936 -0.152547 14.4064 -0.152547 13.6742 0.457641L0.54917 11.3951C-0.183057 12.0053 -0.183057 12.9947 0.54917 13.6048C1.28141 14.215 2.46859 14.215 3.20084 13.6048L3.75001 13.1472V23.4375C3.75001 24.3005 4.58948 25 5.62501 25H9.37501C10.4105 25 11.25 24.3005 11.25 23.4375V20.3125C11.25 19.4495 12.0895 18.75 13.125 18.75H16.875C17.9106 18.75 18.75 19.4495 18.75 20.3125V23.4375C18.75 24.3005 19.5895 25 20.625 25H24.375C25.4106 25 26.25 24.3005 26.25 23.4375V13.1472L26.7992 13.6048C27.5314 14.215 28.7187 14.215 29.4509 13.6048C30.183 12.9947 30.183 12.0053 29.4509 11.3951L16.3258 0.457641Z" fill="#949494"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 25" fill="none">
            <path d="M27 2.27273H25.5V0H22.5V2.27273H7.5V0H4.5V2.27273H3C1.35 2.27273 0 3.29545 0 4.54545V22.7273C0 23.9773 1.35 25 3 25H27C28.65 25 30 23.9773 30 22.7273V4.54545C30 3.29545 28.65 2.27273 27 2.27273ZM27 22.7273H3V7.95455H27V22.7273Z" fill="black"/>
        </svg>

        </div>
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
