import React, { useState } from 'react';
import './NewReservation.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function NewReservation() {
    return (
        <div>
            <h1>Create a Reservation</h1>

            <div className="reservation-dropdown">
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

            <div className="reservation-buttons">

            </div>
        </div>
    );
}

export default NewReservation;