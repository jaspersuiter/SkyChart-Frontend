import './NewReservation.css'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import PrimaryButton from '../../Utils/Buttons/PrimaryButton';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { makeApiCall } from '../../APICall';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Instructor, Plane } from '../../Calendar/Calendar';
import InstructorDropDown from '../../Utils/DropDowns/InstructorDropDown';
import PlaneDropDown from '../../Utils/DropDowns/PlaneDropDown';
import ReservationTypeDropDown, { ReservationType } from '../../Utils/DropDowns/ReservationTypeDropDown';
import React from 'react';
import UpcomingMaintenance from '../UpcomingMaintenance/UpcomingMaintenance';

export interface NewReservationProps {
    open: boolean;
    Instructors: Array<Instructor>;
    Planes: Array<Plane>;
    onClose: () => void;
    SelectedPlane?: Plane;
}

function NewReservation(props: NewReservationProps) {
    const {open, onClose } = props;
    const [maintenanceOpen, setMaintenanceOpen] = React.useState(false);

    const handleClickOpenMaintenance = () => {
        setMaintenanceOpen(true);
    }

    const handleCloseMaintenance = () => {
        setMaintenanceOpen(false);
    }

    const handleClose = (event?: any, reason?: any) => {
        if (reason !== 'backdropClick') {
            setSelectedValue("")
            onClose();
          } 
      };

    const showUpcomingMaintenanceLink = () => {
        if (planeId != '') {
            return(<p className='link-text' onClick={handleClickOpenMaintenance}><u>See plane's upcoming maintenance</u></p>)
        } else {
            return(<p><br></br></p>)
        }
    }

    const resetAll = () => {
        setPlaneId("")
        setInstructorId("")
        setStartTime(null)
        setEndTime(null)
        setDay(null)
        setReservationType(ReservationType.DualLesson)
        setErrormessage("")  
        handleClose()
      }

    const [planeId, setPlaneId] = useState((props.SelectedPlane ? props.SelectedPlane.planeId : ''));
    const [instructorId, setInstructorId] = useState('');
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [reservationType, setReservationType] = useState<ReservationType>(ReservationType.DualLesson);
    const [day, setDay] = useState<Dayjs | null>(null);
    const [errormessage, setErrormessage] = useState('');
    const [recurrances, setRecurrances] = useState(0);
    
    const createReservation = async () => {

            const data = {
                PlaneId: planeId,
                InstructorId: instructorId,
                StartTime: startTime,
                EndTime: endTime,
                FlightType: reservationType,
                Repeat: recurrances,
            }

            let responseData2 = null
            try {
                responseData2 = await makeApiCall("/api/reservation/create", data, "post")

                console.log(responseData2)
                
                if (responseData2 === "Reservation cannot be created due to conflicts with other reservations."){
                    setErrormessage(responseData2)
                    return
                }else if (responseData2 === "Start time must be before end time."){
                    setErrormessage(responseData2)
                    return
                }
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

    function addDatetoTime(time: Dayjs | null){
        let newTime = (time ? time.set('date', (day ? day?.date(): dayjs().date())): null)
        newTime = (newTime ? newTime.set('month', (day ? day?.month(): dayjs().month())) : null)
        newTime = (newTime? newTime.set('year', (day ? day?.year(): dayjs().year())) : null)
        return newTime
    }

    const handleStartTime = (newTime: Dayjs | null) => { 
        setStartTime(addDatetoTime(newTime));
    };

    const handleEndTime = (newTime: Dayjs | null) => {
        setEndTime(addDatetoTime(newTime));
    };

    const handleDay = (day: Dayjs | null) => {

        setStartTime(addDatetoTime(startTime));

        setEndTime(addDatetoTime(endTime));

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

                    <div className='toggleableText'>
                        {showUpcomingMaintenanceLink()}
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
                            minTime={dayjs().set('hour', 5).set('minute', 59)}
                            maxTime={dayjs().set('hour', 22).set('minute', 59)} 
                            sx={{
                                svg: { color: '#4DE8B4' },
                            }}/>

                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                            <TimePicker label="End Time" value={endTime} onChange={handleEndTime}
                            minTime={dayjs().set('hour', 5).set('minute', 59)}
                            maxTime={dayjs().set('hour', 22).set('minute', 59)} 
                            sx={{
                                svg: { color: '#4DE8B4' },
                            }}/>

                        </LocalizationProvider>
                    </div>

                    <div className='horizontal'>
                        <TextField
                            id="recur"
                            label="Weeks to repeat"
                            type="number"
                            value={recurrances}
                            onChange={(e) => setRecurrances(parseInt(e.target.value))}/>
                        <p>Number of weeks to repeat reservation (leave as default 0 to not repeat)</p>
                    </div>

                    <div className='error-message'>
                        {errormessage}
                    </div>

                </div>
                
                
                
                


                {/* Confirm and Cancel Buttons */}
                <div className='TitleBar'>
                    <PrimaryButton text="Create Reservation" onClick={createReservation} disabled={startTime === null || endTime === null || day === null}/>
                </div>
                <UpcomingMaintenance open={maintenanceOpen} onClose={handleCloseMaintenance} planeId={planeId} />
            </Dialog>
        </div>
    );
}

export default NewReservation;