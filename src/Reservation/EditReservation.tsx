import { Dialog, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { makeApiCall } from '../APICall';
import './EditReservation.css'
import PrimaryButton from '../Buttons/PrimaryButton';
import { useState } from 'react';
import { ReservationData } from '../Calendar/Schedule/Reservation';
import { Instructor, Plane } from '../Calendar/Calendar';
import InstructorDropDown from '../DropDowns/InstructorDropDown';
import PlaneDropDown from '../DropDowns/PlaneDropDown';
import ReservationTypeDropDown, { ReservationType } from '../DropDowns/ReservationTypeDropDown';
import CancelButton from '../Buttons/CancelButton';
import ConfirmPopup from '../ConfirmPopup/Confirm';
import { Days } from '../../api-typescript/data-contracts';
import FinishFlight from './FinishFlight/FinishFlight';


export interface EditReservationProp {
  open: boolean;
  onClose: () => void;
  reservationData: ReservationData;
  Instructors: Array<Instructor>;
  Planes: Array<Plane>;
  updateScreen: () => void;
}

function EditReservation(props: EditReservationProp) {
  const { open, onClose, reservationData } = props;
  const [plane, setPlane] = useState(reservationData.planeId);
  const [instructor, setInstructor] = useState(reservationData.instructorId);
  const [flightType, setFlightType] = useState<ReservationType>(reservationData.flightType as ReservationType);
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(reservationData.startTime, "MM/DD/YYYY h:mm:ssA"));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(reservationData.endTime, "MM/DD/YYYY h:mm:ssA"));
  const [day, setDay] = useState<Dayjs | null>(dayjs(reservationData.startTime, "MM/DD/YYYY h:mm:ssA"));
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
  const [openEditConfirm, setOpenEditConfirm] = useState(false);
  const [finishFlight, setFinishFlight] = useState(false);
  const [recurrances, setRecurrances] = useState(reservationData.repeat);

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

  const closeCancelConfirmDialog = () => {
    setOpenCancelConfirm(false);
  }
  const openCancelConfirmDialog = () => {
    setOpenCancelConfirm(true);
  }

  const closeEditConfirmDialog = () => {
    setOpenEditConfirm(false);
  }
  const openEditConfirmDialog = () => {
    setOpenEditConfirm(true);
  }

  const closeFinishFlight = () => {
    setFinishFlight(false);
  }
  const openFinishFlight = () => {
    setFinishFlight(true);
  }

  const editReservation = async () => {
    let day_str = day?.format("YYYY-MM-DD");
    let start_str = startTime?.format("HH:mm:ss");
    let end_str = endTime?.format("HH:mm:ss");

    if (day_str == null) {
      day_str = props.reservationData.startTime;
    }

    let start_date = dayjs(day_str + start_str, "YYYY-MM-DDHH:mm:ss");
    let end_date = dayjs(day_str + end_str, "YYYY-MM-DDHH:mm:ss");

    const data = {
      reservationId: reservationData.reservationId,
      pilotId: reservationData.pilotId,
      planeId: plane,
      instructorId: instructor,
      startTime: start_date,
      endTime: end_date,
      flightType: flightType,
      repeat: recurrances,
    }

    try {
      const responseData = await makeApiCall("/api/reservation/update", data, 'put')
      props.updateScreen();
      onClose();
    } catch (error) {
      console.error(error);
    }

  }

  const cancelReservation = async () => {
    try {
      const responseData = await makeApiCall("/api/reservation/delete", {}, 'delete', { reservationId: reservationData.reservationId })
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

        <div className='horizontal'>
          <TextField
            id="recur"
            label="Weeks to repeat"
            type="number"
            value={recurrances}
            onChange={(e) => setRecurrances(parseInt(e.target.value))}/>
          <p>Number of weeks to repeat reservation (leave as default 0 to not repeat)</p>
        </div>

        <div className='spacertwo'></div>

        <div className='flexRow'>
          <div className='button'>
            <PrimaryButton text="Finish Flight" onClick={openFinishFlight} />
            <FinishFlight
              open={finishFlight}
              onClose={closeFinishFlight}
              reservationData={reservationData}
              plane={props.Planes.find((value, index, obj) => value.planeId === plane) || props.Planes[0]}
              updateScreen={props.updateScreen}
            />
          </div>

          <div className='button'>
            <PrimaryButton text="Save Changes" onClick={openEditConfirmDialog} />
            <ConfirmPopup
              open={openEditConfirm}
              onClose={closeEditConfirmDialog}
              func={editReservation}
              text="Are you sure you want to make these changes?" />
          </div>

          <div className='button'>
            <CancelButton text="Cancel Reservation" onClick={openCancelConfirmDialog} />
            <ConfirmPopup
              open={openCancelConfirm}
              onClose={closeCancelConfirmDialog}
              func={cancelReservation}
              text="Are you sure you want to cancel this reservation?" />
          </div>
        </div>

      </div>
    </Dialog>
  );

}
export default EditReservation