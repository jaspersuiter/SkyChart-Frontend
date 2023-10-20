import './NewReservation.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PrimaryButton from '../Buttons/PrimaryButton';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { makeApiCall } from '../APICall';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export interface NewReservationProps {
    open: boolean;
    onClose: () => void;
  }

function NewReservation(props: NewReservationProps) {

    const {open, onClose } = props;

    const handleClose = (event?: any, reason?: any) => {
        if (reason !== 'backdropClick') {
            setSelectedValue("")
            onClose();
          } 
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
        setDay(null)
        setFlightType(0)  
        handleClose()
      }

    const [PilotId, setPilotId] = useState('');
    const [PlaneId, setPlaneId] = useState('');
    const [InstructorId, setInstructorId] = useState('');
    const [StartTime, setStartTime] = useState<Dayjs | null>(null);
    const [EndTime, setEndTime] = useState<Dayjs | null>(null);
    const [FlightType, setFlightType] = useState<flightType>(0);
    const [Day, setDay] = useState<Dayjs | null>(null);
    
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
                const responseData2 = await makeApiCall("/api/reservation/create", data, "get")
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

    const handleStartTime = (newTime: Dayjs | null) => {
        setStartTime(newTime);
    };

    const handleEndTime = (newTime: Dayjs | null) => {
        setEndTime(newTime);
    };

    const handleDay = (day: Dayjs | null) => {
        setDay(day);
    };

    return (
        <div className="reservation-popup">
            <Dialog onClose={handleClose} open={open}
            sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "57.5vw",
                    height: "100%",
                    maxHeight: "80vh",
                    padding: "30px"
                  },
                },
              }}>

                <div className='TitleBar'>
                    <div className='spaceFiller'/>
                    <h1 className='h1'>Create a Reservation</h1>
                    <div className='spaceFiller'>
                    <CloseIcon onClick={resetAll}/>
                    </div>
                </div>

                <div className='dialogBox'>
                    {/* Dropdown Menus for Selecting Aircraft & Instructor */}
                    <div className='flexRow'>
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
                    <div className='flexRow'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Select Day" value={Day} onChange={handleDay} sx={{
                                    svg: { color: '#4DE8B4' },
                            }}/>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                            <TimePicker label="Start Time" value={StartTime} onChange={handleStartTime}
                            minTime={dayjs().set('hour', 6)}
                            maxTime={dayjs().set('hour', 22).set('minute', 59)} 
                            sx={{
                                svg: { color: '#4DE8B4' },
                            }}/>

                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                            <TimePicker label="End Time" value={EndTime} onChange={handleEndTime}
                            minTime={dayjs().set('hour', 6)}
                            maxTime={dayjs().set('hour', 22).set('minute', 59)} 
                            sx={{
                                svg: { color: '#4DE8B4' },
                            }}/>

                        </LocalizationProvider>
                    </div>
                </div>
                
                
                


                {/* Confirm and Cancel Buttons */}
                <div className='TitleBar'>
                    <PrimaryButton text="Create Reservation" onClick={createReservation} disabled={StartTime === null && EndTime === null}/>
                </div>
            </Dialog>
        </div>
    );
}

export default NewReservation;