import './NewReservation.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PrimaryButton from '../Buttons/PrimaryButton';
import CancelButton from '../Buttons/CancelButton';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Dialog from '@mui/material/Dialog';
import { makeApiCall } from '../APICall';
import { useState } from 'react';

export interface NewReservationProps {
    open: boolean;
    onClose: () => void;
  }

function NewReservation(props: NewReservationProps) {

    const {open, onClose } = props;

    const handleClose = () => {
        setSelectedValue("")
        onClose();
      };

    const enum flightType {
        DualLesson,
        StudentSolo,
        Checkride,
        StandardReserved,
        AircraftCheckout,
        GroundSchool,
    }

    const resetAll = () => {
        setPilotId("")
        setPlaneId("")
        setInstructorId("")
        setStartTime(null)
        setEndTime(null)
        setFlightType(0)  
        handleClose()
      }

    const [PilotId, setPilotId] = useState('');
    const [PlaneId, setPlaneId] = useState('');
    const [InstructorId, setInstructorId] = useState('');
    const [StartTime, setStartTime] = useState<Date | null>(null);
    const [EndTime, setEndTime] = useState<Date | null>(null);
    const [FlightType, setFlightType] = useState<flightType>(0);
    
    const createReservation = async () => {
            const data = {
                PilotId: "123e4567-e89b-12d3-a456-426655440000",
                PlaneId: "123e4567-e89b-12d3-a456-426655440000",
                InstructorId: "123e4567-e89b-12d3-a456-426655440000",
                StartTime: StartTime,
                EndTime: EndTime,
                FlightType: FlightType,
            }

            try {
                const responseData2 = await makeApiCall("/api/reservation/create", data)
                console.log(responseData2)
                resetAll()
            } catch (error) {
                console.error(error)
            }

            handleClose()
    }
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: any) => {
        setSelectedValue(event.target.value);
        setFlightType(event.target.value);
    };

    const handleStartTime = (newTime: Date | null) => {
        setStartTime(newTime);
    };

    const handleEndTime = (newTime: Date | null) => {
        setEndTime(newTime);
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
                            <MenuItem value={flightType.DualLesson}>dual lesson</MenuItem>
                            <MenuItem value={flightType.StudentSolo}>student solo</MenuItem>
                            <MenuItem value={flightType.Checkride}>checkride</MenuItem>
                            <MenuItem value={flightType.StandardReserved}>standard reserved</MenuItem>
                            <MenuItem value={flightType.AircraftCheckout}>aircraft checkout</MenuItem>
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
                            <TimePicker label="Start Time" value={StartTime} onChange={handleStartTime} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="End Time" value={EndTime} onChange={handleEndTime} />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>


                {/* Confirm and Cancel Buttons */}
                <div className="reservation-buttons">
                    <PrimaryButton text="Create Reservation" onClick={createReservation}/>
                    <CancelButton text="Cancel" onClick={handleClose}/>
                </div>
            </Dialog>
        </div>
    );
}

export default NewReservation;