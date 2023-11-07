import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import React from 'react';
import PrimaryButton from '../../Utils/Buttons/PrimaryButton';
import InstructorAvailibilityPopup from './InstructorAvailabilityPopup';

function InstructorAvailibility() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <div className="instructor-availibility">
        <PrimaryButton text="Add Availability" onClick={handleClickOpen}/>

        <InstructorAvailibilityPopup 
            open = {open}
            onClose = {handleClose}
        />
    </div>
  )}

export default InstructorAvailibility;
