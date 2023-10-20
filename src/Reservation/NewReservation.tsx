import './NewReservation.css'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import PrimaryButton from '../Buttons/PrimaryButton';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { makeApiCall } from '../APICall';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Instructor, Plane } from '../Calendar/Calendar';
import InstructorDropDown from '../DropDowns/InstructorDropDown';
import PlaneDropDown from '../DropDowns/PlaneDropDown';
import ReservationTypeDropDown, { ReservationType } from '../DropDowns/ReservationTypeDropDown';


export interface NewReservationProps {
    open: boolean;
    Instructors: Array<Instructor>;
    Planes: Array<Plane>;
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

    

    const resetAll = () => {
        setPlaneId("")
        setInstructorId("")
        setStartTime(null)
        setEndTime(null)
        setDay(null)
        setReservationType(0)  
        handleClose()
      }

    const [planeId, setPlaneId] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [reservationType, setReservationType] = useState<ReservationType>(0);
    const [day, setDay] = useState<Dayjs | null>(null);
    
    const createReservation = async () => {

            const data = {
                PlaneId: planeId,
                InstructorId: instructorId,
                StartTime: startTime,
                EndTime: endTime,
                FlightType: reservationType,
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
        setReservationType(event.target.value);
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

                        <InstructorDropDown Instructors={props.Instructors} InstructorId={instructorId} setInstructorIdParent={setInstructorId}/>
                        
                        <PlaneDropDown Planes={props.Planes} PlaneID={planeId} SetPlaneIdParent={setPlaneId}/>

                        <ReservationTypeDropDown ReservationType={reservationType} setReservationTypeParent={setReservationType}/>
                        
                    </div>

                    {/* Date and Time Pickers to Select Reservation Time */}
                    <div className='flexRow'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Select Day" value={day} onChange={handleDay} sx={{
                                    svg: { color: '#4DE8B4' },
                            }}/>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                            <TimePicker label="Start Time" value={startTime} onChange={handleStartTime}
                            minTime={dayjs().set('hour', 6)}
                            maxTime={dayjs().set('hour', 22).set('minute', 59)} 
                            sx={{
                                svg: { color: '#4DE8B4' },
                            }}/>

                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                            <TimePicker label="End Time" value={endTime} onChange={handleEndTime}
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
                    <PrimaryButton text="Create Reservation" onClick={createReservation} disabled={startTime === null || endTime === null || day === null}/>
                </div>
            </Dialog>
        </div>
    );
}

export default NewReservation;