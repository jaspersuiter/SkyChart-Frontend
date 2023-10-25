import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { makeApiCall } from '../../APICall';
import './EditReservation.css'
import PrimaryButton from '../../Buttons/PrimaryButton';
import { useState } from 'react';
import { ReservationData } from './Reservation';
import { Instructor, Plane } from '../Calendar';
import InstructorDropDown from '../../DropDowns/InstructorDropDown';
import PlaneDropDown from '../../DropDowns/PlaneDropDown';
import ReservationTypeDropDown, { ReservationType } from '../../DropDowns/ReservationTypeDropDown';


export interface EditReservationProp {
  open: boolean;
  onClose: () => void;
  reservationData: ReservationData;
  Instructors: Array<Instructor>;
  Planes: Array<Plane>;
  updateScreen: () => void;
}

function AddNewAircraft(props: EditReservationProp) {
  const { open, onClose, reservationData } = props;
  const [plane, setPlane] = useState(reservationData.planeId);
  const [instructor, setInstructor] = useState(reservationData.instructorId);
  const [flightType, setFlightType] = useState<ReservationType>(reservationData.flightType as ReservationType);
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(reservationData.startTime, "MM/DD/YYYY h:mm:ssA"));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(reservationData.endTime, "MM/DD/YYYY h:mm:ssA"));
  const [day, setDay] = useState<Dayjs | null>(dayjs(reservationData.startTime, "MM/DD/YYYY h:mm:ssA"));


  const handleClose = () => {
    onClose();
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

  const editReservation = async () => {
    const data = {
      reservationId: reservationData.reservationId,
      pilotId: reservationData.pilotId,
      planeId: plane,
      instructorId: instructor,
      startTime: startTime,
      endTime: endTime,
      flightType: flightType
    }

    try {
      const responseData = await makeApiCall("/api/reservation/update", data, 'put')
      props.updateScreen();
      onClose();
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Dialog onClose={handleClose} open={open} sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "900px",
          height: "100%",
          maxHeight: "650px",
          padding: "30px"
        },
      },
    }} >
      <div className='maincontent'>
        <div className='top-title'>
          <div className='space-filler'></div>
          <h1>Edit Reservation</h1>
          <div className='boxframe'><CloseIcon onClick={handleClose} /></div>
        </div>

        <div className='maindropdowncontent'>
          <div className='threewide'>
            <InstructorDropDown Instructors={props.Instructors} InstructorId={instructor} setInstructorIdParent={setInstructor} />

            <PlaneDropDown Planes={props.Planes} PlaneID={plane} SetPlaneIdParent={setPlane} />

            <ReservationTypeDropDown ReservationType={flightType} setReservationTypeParent={setFlightType} />
          </div>
          <div className='flexRow'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Select Day" value={day} onChange={handleDay} sx={{
                svg: { color: '#4DE8B4' },
              }} />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <TimePicker label="Start Time" value={startTime} onChange={handleStartTime}
                minTime={dayjs().set('hour', 6)}
                maxTime={dayjs().set('hour', 22).set('minute', 59)}
                sx={{
                  svg: { color: '#4DE8B4' },
                }} />

            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <TimePicker label="End Time" value={endTime} onChange={handleEndTime}
                minTime={dayjs().set('hour', 6)}
                maxTime={dayjs().set('hour', 22).set('minute', 59)}
                sx={{
                  svg: { color: '#4DE8B4' },
                }} />

            </LocalizationProvider>
          </div>
        </div>

        <div className='spacertwo'>

        </div>

        <div className='confirmationbutton'>
          <PrimaryButton text="Save Changes" onClick={editReservation} />
        </div>
      </div>


    </Dialog>
  );

}
export default AddNewAircraft