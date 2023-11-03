import './Calendar.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import StaticSidebar from '../Sidebar/Sidebar';
import Schedule from './Schedule/Schedule';
import NewReservation from '../Reservation/NewReservation';
import dayjs, { Dayjs } from 'dayjs';
import WeekPicker from './Schedule/WeekPicker';
import React, { useEffect, useState } from 'react';
import AircraftPopup from '../Aircraft/AircraftPopup';
import AddSqawkPopup from '../Aircraft/AddSquawkPopup';
import DayPicker from './Schedule/DayPicker';
import ModifyAircraft from '../Aircraft/ModifyAircraft';

export interface Plane {
    planeId: string;
    tailNumber: string;
    model: string;
    nickName: string;
    hourlyRate: number;
    numEngines: number;
    tachHours: number;
    hobbsHours: number;
    grounded: boolean;
}

export interface Instructor {
    userId: string;
    name: string;
    email: string;
    phone: string;
    instructorRatings: Array<string>;
}

function Calendar() {

    const fetchPlanes = async () => {
        try {
            const planes = await fetch('http://localhost:5201/api/plane/get-all',
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data) as Array<Plane>;

            setPlanes(planes); 
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
                .then((data) => data) as Array<Instructor>;

            setInstructors(instructors);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchInstructors(); // Call fetchInstructors when the component mounts
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const [planes, setPlanes] = useState<Plane[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]); // Declare rows as a state variable
    const [plane, setPlane] = useState<Plane>({planeId: '', tailNumber: '', model: '', nickName: '', hourlyRate: 0, numEngines: 0, tachHours: 0, hobbsHours: 0, grounded: false});
    const [open, setOpen] = React.useState(false);
    const [openAircraft, setOpenAircraft] = React.useState(false);
    const [updateScreen, setUpdateScreen] = React.useState(false);
    const [isDay, setIsDay] = React.useState(true);
    const [day, SetDay] = React.useState<Dayjs | null>(dayjs());

    const [openSquawk, setOpenSquawk] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenAircraft = (plane: Plane) => {
        setOpenAircraft(true);
        setPlane(plane);
    };

    const handleCloseAircraft = () => {
        setOpenAircraft(false);
    };

    const handleClickOpenSquawk = () => {
        setOpenSquawk(true);
      };
      const handleCloseSquawk = () => {
        setOpenSquawk(false);
      }

    const handleSwapDayWeek = () => {
        setIsDay(!isDay);
    };

    const swapDayandWeek = () => {
        handleSwapDayWeek()
    };

    const setToday = () => {
        SetDay(dayjs())
    }

    const updateScreenFunction = () => {
        setUpdateScreen(!updateScreen)
    }

    const [openModify, setOpenModify] = React.useState(false);

    const handleClickOpenModify = () => {
        setOpenModify(true);
      };
    
      const handleCloseModify = () => {
        setOpenModify(false);
      }
    

  return (
    <div className='fullpage'>
        <StaticSidebar />
        <div className="content">

            <div className='top-content-frame'>
                <div>
                    {isDay ? 
                    <DayPicker day={day} updateDay={(newValue) => SetDay(newValue)}/>
                    :
                    <WeekPicker day={day} updateDay={(newValue) => SetDay(newValue)}/>}
                </div>
                
            
                <div className="buttons-frame">

                    <PrimaryButton text="Today" onClick={setToday}/>
               
                    <PrimaryButton text={ isDay ? "Week View" : "Day View"} onClick={swapDayandWeek}/>

                    <PrimaryButton text="New Reservation" onClick={handleClickOpen}/>

                    <PrimaryButton text="Limit to Me"/>

                </div>

                <div className="sorting-frame">
                    <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
                    <InputLabel id="demo-select-small-label">Aircraft</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="aircraft"
                    >
                        {/* {planes.map((plane) => (
                            <MenuItem key={plane.id} value={plane.id}>
                                {`${plane.model} (${plane.nickname})`}
                            </MenuItem>
                        ))} */}
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
                        {/* {instructors.map((instructor) => (
                            <MenuItem key={instructor.id} value={instructor.id}>
                                {instructor.firstName} {instructor.lastName}
                            </MenuItem>
                            ))} */}
                    </Select>
                    </FormControl>
                    </div>

            </div>

            { day && <Schedule isDay={isDay} day={day} openAirplane={handleClickOpenAircraft} updateScreen={updateScreenFunction} key={day.toString() + isDay.toString() + open.toString() + updateScreen.toString()}/>}

           
        </div>
        <NewReservation open={open} onClose={handleClose} Instructors={instructors} Planes={planes} SelectedPlane={plane}/>
        <AircraftPopup open={openAircraft} onClose={handleCloseAircraft} plane={plane} openSquawk={handleClickOpenSquawk} openModify={handleClickOpenModify} openCreateReservation={handleClickOpen} />
        <AddSqawkPopup open={openSquawk} onClose={handleCloseSquawk} plane={plane}/>
        <ModifyAircraft open={openModify} onClose={handleCloseModify} planeId={plane.planeId} updateScreen={updateScreenFunction} setCurrentPlane={setPlane}/>
    </div>
  )}

export default Calendar;
