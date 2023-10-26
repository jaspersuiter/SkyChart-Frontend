import CancelButton from '../../Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../../Buttons/SecondaryButton';
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
import PrimaryButton from '../../Buttons/PrimaryButton';
import { time } from 'console';

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
        Available = "Available",
        PreferredTime = "PreferredTime"
    }

    const resetAll = () => {
        setDay(null)
        setStartTime(null)
        setEndTime(null)
        setAvailabilityType(AvailabilityType.Available)
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
                FlightType: availabilityType,
            }

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
        <div className="logout-popup">
            <Dialog onClose={handleClose} open={open}>
                <div className="reservation-time">
                <FormControl sx={{ minWidth: 244 }} size="medium">
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

                    <PrimaryButton text="Confirm" onClick={createAvailability} />
                </div>
            </Dialog>
        </div>
    );
}

export default InstructorAvailibilityPopup;