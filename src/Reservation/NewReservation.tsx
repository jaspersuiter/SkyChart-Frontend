import './NewReservation.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PrimaryButton from '../Buttons/PrimaryButton';
import CancelButton from '../Buttons/CancelButton';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';

export interface NewReservationProps {
    open: boolean;
    onClose: () => void;
  }

function NewReservation(props: NewReservationProps) {

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
      };

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className="reservation-popup">
            <Dialog onClose={handleClose} open={open}>
                <h1>Create a Reservation</h1>
                
                {/* Dropdown Menus for Selecting Aircraft & Instructor */}
                <div className="reservation-dropdown">
                    <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
                        <InputLabel id="demo-select-small-label">Instructor</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="instructor"
                        >
                            <MenuItem>All</MenuItem>
                        </Select>
                    </FormControl>
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
                        <InputLabel id="demo-select-small-label">Type of flight</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="type of flight"
                            value={selectedValue} // Set the selected value here
                            onChange={handleChange} // Handle change event
                        >
                            <MenuItem value="" style={{ color: '#FF8080' }}>Clear</MenuItem>
                            <MenuItem value="dual lesson">dual lesson</MenuItem>
                            <MenuItem value="student solo">student solo</MenuItem>
                            <MenuItem value="checkride">checkride</MenuItem>
                            <MenuItem value="standard reserved">standard reserved</MenuItem>
                            <MenuItem value="aircraft checkout">aircraft checkout</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* Date and Time Pickers to Select Reservation Time */}
                <div className="reservation-time">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Select Day"/>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Start Time" />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="End Time" />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>


                {/* Confirm and Cancel Buttons */}
                <div className="reservation-buttons">
                    <PrimaryButton text="Create Reservation"/>
                    <CancelButton text="Cancel" onClick={handleClose}/>
                </div>
            </Dialog>
        </div>
    );
}

export default NewReservation;