import CancelButton from '../../Utils/Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../../Utils/Buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import InstructorAvailibility from './InstructorAvailability';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { makeApiCall } from '../../APICall';
import { useState } from 'react';
import PrimaryButton from '../../Utils/Buttons/PrimaryButton';
import { time } from 'console';
import './InstructorAvailabilityPopup.css'
import CloseIcon from '@mui/icons-material/Close';


export interface InstructorAvailibilityProps {
    open: boolean;
    onClose: () => void;
  }

function InstructorAvailibilityPopup(props: InstructorAvailibilityProps) {

    const navigate = useNavigate();

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
      };

    const handleLogOut = () => {
        onClose();
    }

    enum AvailabilityType {
        PreferredTime = "PreferredTime",
        Available = "Available"
    }

    const resetAll = () => {
        setDay(null)
        setStartTime(null)
        setEndTime(null)
        setAvailabilityType(AvailabilityType.Available)
        handleClose();
      }

    const [day, setDay] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [availabilityType, setAvailabilityType] = useState<AvailabilityType>(AvailabilityType.Available);
    const [errormessage, setErrormessage] = useState('')


    const createAvailability = async () => {

            const data = {
                day: day,
                StartTime: startTime,
                EndTime: endTime,
                type: availabilityType,
            }

            console.log(data)

            let responseData2 = null
            try {
                responseData2 = await makeApiCall("/api/availability/create", data, "post")

                console.log(responseData2)
                
                if (responseData2 === "End Time cannot be before Start Time"){
                    setErrormessage(responseData2)
                    return
                }else if (responseData2 === "User has already created a preferred time within this frame"){
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

    const handleStartTime = (newTime: Dayjs | null) => {
        // API endpoint only accepts time, not date
        let finalTime = newTime?.get('hour') + ":" + newTime?.get('minute');
        setStartTime(finalTime);
    };

    const handleEndTime = (newTime: Dayjs | null) => {
        // API endpoint only accepts time, not date
        let finalTime = newTime?.get('hour') + ":" + newTime?.get('minute');
        setEndTime(finalTime);
    };

    const handleDay = (event: any) => {
        setDay(event.target.value);
    };

    return (
        <div className="availability-popup">
            <Dialog onClose={handleClose} open={open}
            sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "57.5vw",
                    height: "50%",
                    maxHeight: "80vh",
                    padding: "30px"
                  },
                },
              }}>
                <div className='TitleBar'>
                    <div className='spaceFiller' />
                    <h1 className='h1'>Please enter times you are available</h1>
                    <div className='spaceFiller'>
                        <CloseIcon onClick={resetAll}/>
                    </div>
                </div>
                <div className='dialogBox'>
                <div className="flexRow">
                <FormControl sx={{ minWidth: 244, marginTop: 1 }} size="medium" >
                        <InputLabel id="demo-select-small-label">Day</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="day"
                            value={day}
                            onChange={handleDay}
                        >
                            <MenuItem value="Sunday">Sunday</MenuItem>
                            <MenuItem value="Monday">Monday</MenuItem>
                            <MenuItem value="Tuesday">Tuesday</MenuItem>
                            <MenuItem value="Wednesday">Wednesday</MenuItem>
                            <MenuItem value="Thursday">Thursday</MenuItem>
                            <MenuItem value="Friday">Friday</MenuItem>
                            <MenuItem value="Saturday">Saturday</MenuItem>
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Start Time" value={dayjs(startTime)} onChange={handleStartTime} 
                            minTime={dayjs().set('hour', 5).set('minute', 59)}
                            maxTime={dayjs().set('hour', 22).set('minute', 59)} 
                            sx={{
                                svg: { color: '#4DE8B4' },
                            }}/>
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="End Time" value={dayjs(endTime)} onChange={handleEndTime} 
                            minTime={dayjs().set('hour', 5).set('minute', 59)}
                            maxTime={dayjs().set('hour', 22).set('minute', 59)} 
                            sx={{
                                svg: { color: '#4DE8B4' },
                            }}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                </div>
                <div className='TitleBar'>
                    <PrimaryButton text="Confirm" onClick={createAvailability} />
                </div>
                <div className='error-message'>
                    {errormessage}
                </div>
            </Dialog>
        </div>
    );
}

export default InstructorAvailibilityPopup;