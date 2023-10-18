import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import { makeApiCall } from '../../APICall';
import TextField from '@mui/material/TextField';
import './EditReservation.css'
import PrimaryButton from '../../Buttons/PrimaryButton';
import { useState } from 'react';
import { ReservationData } from './Reservation';

export interface EditReservationProp {
  open: boolean;
  onClose: () => void;
  reservationData: ReservationData;
}
function AddNewAircraft(props: EditReservationProp) {
  const { open, onClose, reservationData } = props;
  const [plane, setPlane] = useState(reservationData.planeId);
  const [instructor, setInstructor] = useState(reservationData.instructorId);
  const [flightType, setFlightType] = useState(reservationData.flightType);
  const [startTime, setStartTime] = useState(reservationData.startTime);
  const [endTime, setEndTime] = useState(reservationData.endTime);

  const planes = ['Plane 1', 'Plane 2', 'Plane 3']; // TODO: get from API
  const instructors = ['Instructor 1', 'Instructor 2', 'Instructor 3']; //TODO: get from API
  const flightTypes = ['DualLesson', 'StudentSolo', 'Checkride', 'StandardReserved', 'AircraftCheckout', 'GroundSchool'];

  const handleClose = () => {
    onClose();
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
          <h1>Add New Aircraft</h1>
          <div className='boxframe'><CloseIcon onClick={handleClose} /></div>
        </div>

        <div className='maindropdowncontent'>
          <div className='threewide'>
            <TextField
              select
              label="Plane"
              value={plane}
              onChange={(event) => setPlane(event.target.value)}
              fullWidth
            >
              {planes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Instructor"
              value={instructor}
              onChange={(event) => setInstructor(event.target.value)}
              fullWidth
            >
              {instructors.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Flight Type"
              value={flightType}
              onChange={(event) => setFlightType(event.target.value)}
              fullWidth
            >
              {flightTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className='twowide'>

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