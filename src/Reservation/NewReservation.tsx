import './NewReservation.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PrimaryButton from '../Buttons/PrimaryButton';
import CancelButton from '../Buttons/CancelButton';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Dialog from '@mui/material/Dialog';

export interface NewReservationProps {
    open: boolean;
    onClose: () => void;
  }

function NewReservation(props: NewReservationProps) {

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
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