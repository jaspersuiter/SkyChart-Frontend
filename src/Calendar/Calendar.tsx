import './Calendar.css';
import PrimaryButton from '../Utils/Buttons/PrimaryButton';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import StaticSidebar from '../Utils/Sidebar/Sidebar';
import Schedule from './Schedule/Schedule';
import NewReservation from '../Reservation/CreateReservation/CreateReservation';
import dayjs, { Dayjs } from 'dayjs';
import WeekPicker from './Schedule/WeekPicker';
import React, { useEffect, useState } from 'react';
import AircraftPopup from '../Aircraft/AircraftPopup/AircraftPopup';
import AddSqauwkPopup from '../Aircraft/AddSquawkPopup/AddSquawkPopup';
import DayPicker from './Schedule/DayPicker';
import ModifyAircraft from '../Aircraft/ModifyAircraft/ModifyAircraft';
import Reservation, { ReservationData } from './Schedule/Reservation';
import EditReservation from '../Reservation/EditReservation/EditReservation';
import AircraftMultiSelect from '../Utils/DropDowns/AircraftMultiselectDropDown';
import InstructorMultiselect from '../Utils/DropDowns/InstructorMultiselectDropDown';
import ReservationTypeMultiselect, { DropDownType } from '../Utils/DropDowns/ReservationTypeMultiselectDropDown';
import { ReservationType } from '../Utils/DropDowns/ReservationTypeDropDown';
import AutoReservation from '../Reservation/AutoReservation/AutoReservation';

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

export interface User {
    student: boolean;
    faaId: any
    ratings: Array<string>;
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    emergencyContactName: string;
    type: string;
    emergencyContactPhoneNumber: string;
    preferredInstructorId: string;
    preferredInstructor: string;
    preferredPlanes: Array<string>;
    proficientPlaneModels: any
}

function Calendar() {

    const fetchPlanes = async () => {
        try {
            const planes = await fetch('http://localhost:5201/api/plane/get-all',
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data) as Array<Plane>;

            setPlanes(planes);
            setSelectedPlanes(planes); 
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
            setSelectedInstructors(instructors)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchInstructors(); 
    }, []);

    const fetchUser = async () => {
        try {
            const instructors = await fetch('http://localhost:5201/api/user/get-current',
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data) as User;

            setCurrentUser(instructors);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser(); 
    }   , []);


    const [planes, setPlanes] = useState<Plane[]>([]);
    const [selectedPlanes, setSelectedPlanes] = useState<Plane[]>([]); 
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [selectedInstructors, setSelectedInstructors] = useState<Instructor[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<ReservationType[]>([ReservationType.AircraftCheckout, ReservationType.DualLesson, ReservationType.Checkride, ReservationType.GroundSchool, ReservationType.Simulator, ReservationType.StandardReserved, ReservationType.StudentSolo]); 
    const [plane, setPlane] = useState<Plane>({planeId: '', tailNumber: '', model: '', nickName: '', hourlyRate: 0, numEngines: 0, tachHours: 0, hobbsHours: 0, grounded: false});
    const [reservation, setReservation] = useState<ReservationData>({reservationId: '', planeId: '', pilotId: '', instructorId: '', startTime: '', endTime: '', flightType: ReservationType.DualLesson, tachHours: 0, hobbsHours: 0, repeat: 0});
    const [open, setOpen] = React.useState(false);
    const [openAircraft, setOpenAircraft] = React.useState(false);
    const [updateScreen, setUpdateScreen] = React.useState(false);
    const [openEditReservation, setOpenEditReservation] = React.useState(false);
    const [openAutoReservation, setOpenAutoReservation] = React.useState(false);
    const [isDay, setIsDay] = React.useState(true);
    const [currentUser, setCurrentUser] = React.useState<User>({} as User); 
    const [isLimited, setIsLimited] = React.useState(false);
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

    const handleClickOpenEditReservation = (updatedReservation: ReservationData) => {
        setReservation(updatedReservation);
        setOpenEditReservation(true);
    };

    const handleCloseEditReservation = () => {
        setOpenEditReservation(false);
    }

    const handleClickOpenAutoReservation = () => {
        setOpenAutoReservation(true);
    };

    const handleCloseAutoReservation = () => {
        setOpenAutoReservation(false);
    }

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
    
    const handleLimitToMe = () => {
        setIsLimited(!isLimited);
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

                    <PrimaryButton text="Automatic Scheduler" onClick={handleClickOpenAutoReservation}/>

                    <PrimaryButton text={isLimited ? "Stop Limiting" : "Limit to Me"} onClick={handleLimitToMe}/>

                </div>

                <div className="sorting-frame">

                    <AircraftMultiSelect planes={planes} setSelectedPlanes={setSelectedPlanes}/>

                    <InstructorMultiselect instructors={instructors} setSelectedInstructors={setSelectedInstructors}/>

                    <ReservationTypeMultiselect setSelectedTypes={setSelectedTypes}/>
                    </div>

            </div>

            { day && <Schedule isDay={isDay} day={day} isLimited={isLimited} currentUser={currentUser} openAirplane={handleClickOpenAircraft} openReservation={handleClickOpenEditReservation} updateScreen={updateScreenFunction} selectedPlanes={selectedPlanes} selectedInstructors={selectedInstructors} selectedTypes={selectedTypes} key={day.toString() + isDay.toString() + open.toString() + updateScreen.toString() + selectedInstructors.toString() + selectedPlanes.toString() + selectedTypes.toString() + isLimited.toString()}/>}

            
        </div>
        <NewReservation open={open} onClose={handleClose} Instructors={instructors} Planes={planes} SelectedPlane={plane}/>
        <AircraftPopup open={openAircraft} onClose={handleCloseAircraft} plane={plane} openSquawk={handleClickOpenSquawk} openModify={handleClickOpenModify} openCreateReservation={handleClickOpen} />
        <AddSqauwkPopup open={openSquawk} onClose={handleCloseSquawk} plane={plane}/>
        <ModifyAircraft open={openModify} onClose={handleCloseModify} planeId={plane.planeId} updateScreen={updateScreenFunction} setCurrentPlane={setPlane}/>
        <EditReservation open={openEditReservation} onClose={handleCloseEditReservation} reservationData={reservation} Instructors={instructors} Planes={planes} updateScreen={updateScreenFunction} key={openEditReservation.toString()}/>
        <AutoReservation open={openAutoReservation} onClose={handleCloseAutoReservation} Instructors={instructors} Planes={planes} updateScreen={updateScreenFunction}/>
      </div>
  )}

export default Calendar;
