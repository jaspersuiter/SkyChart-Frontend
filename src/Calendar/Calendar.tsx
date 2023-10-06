import './Calendar.css';
import '../App.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import StaticSidebar from '../Sidebar/Sidebar';
import Schedule from './Schedule/Schedule';
import NewReservation from '../Reservation/NewReservation';
import React, { useEffect, useState } from 'react';

interface Plane {
    id: number;
    model: string;
    grounded: boolean;
    nickname: string;
}

interface Instructor {
    id: number;
    lastName: string;
    firstName: string;
    phoneNum: string;
    rating: string;
}

function Calendar() {

    const fetchPlanes = async () => {
        try {
            const planes = await fetch('http://localhost:5201/api/plane/get-all',
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data);

            const mappedPlanes = planes.map((plane: any) => ({
                id: plane.planeId,
                model: plane.model,
                grounded: plane.grounded,
                nickname: plane.nickName,
            }));

            setPlanes(mappedPlanes); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPlanes();
    }, []); 

    const fetchInstructors = async () => {
        try {
            const instructors = await fetch('http://localhost:5201/api/instructor/get-all',
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data);

            // Create a new array of rows based on the instructors data
            const mappedRows = instructors.map((instructor: any, index: number) => {
                const nameParts = instructor.name.split(','); // Split by comma
                return {
                id: index + 1,
                lastName: nameParts[0].trim(),
                firstName: nameParts[1].trim(),
                phoneNum: instructor.phone,
                rating: instructor.instructorRatings?.join(', '),
                }
            });

            setInstructors(mappedRows); // Update the state variable with the mapped rows
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchInstructors(); // Call fetchInstructors when the component mounts
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const [planes, setPlanes] = useState<Plane[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]); // Declare rows as a state variable

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <div className="calendar-page">
        <StaticSidebar />
        <div className="calendar-top-content">
            <div className="calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} sx={{fontSize: 20}} />
                </LocalizationProvider>
            </div>
            
            <div className="button-section">
                <div className="calendar-button">
                    <PrimaryButton text="Today"/>
                </div>
                <div className="calendar-button">
                    <PrimaryButton text="Week View"/>
                </div>
                <div className="calendar-button">
                    <PrimaryButton text="New Reservation" onClick={handleClickOpen}/>
                </div>
                
                <NewReservation 
                    open={open}
                    onClose={handleClose}
                />
                
                <div className="calendar-button">
                    <PrimaryButton text="Limit to Me"/>
                </div>
            </div>

            <div className="calendar-dropdown">
                <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
                    <InputLabel id="demo-select-small-label">Aircraft</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="aircraft"
                    >
                        {planes.map((plane) => (
                            <MenuItem key={plane.id} value={plane.id}>
                                {`${plane.model} (${plane.nickname})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
                    <InputLabel id="demo-select-small-label">Reservation Type</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="aircraft"
                    >
                        <MenuItem>All</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
                    <InputLabel id="demo-select-small-label">Instructors</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="instructor"
                    >
                        {instructors.map((instructor) => (
                            <MenuItem key={instructor.id} value={instructor.id}>
                                {instructor.firstName} {instructor.lastName}
                            </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </div>
        </div>
        
        <div className="calendar-schedule">
            <Schedule />
        </div>
    </div>
  )}

export default Calendar;
