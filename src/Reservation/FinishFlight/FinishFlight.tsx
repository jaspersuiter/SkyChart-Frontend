import './FinishFlight.css'
import { Dialog, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { makeApiCall } from '../../APICall';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { ReservationData } from '../../Calendar/Schedule/Reservation';
import { Plane } from '../../Calendar/Calendar';
import CancelButton from '../../Buttons/CancelButton';


export interface FinishFlightProp {
  open: boolean;
  onClose: () => void;
  reservationData: ReservationData;
  plane: Plane;
  updateScreen: () => void;
}

function FinishFlight(props: FinishFlightProp) {
  const { open, onClose, reservationData, plane } = props;
  const [planeId, setplaneId] = useState(reservationData.planeId);
  const [tach, setTach] = useState(plane.tachHours);
  const [hobbs, setHobbs] = useState(plane.hobbsHours);
  const [resTach, setResTach] = useState(reservationData.tachHours);
  const [resHobb, setResHobb] = useState(reservationData.hobbsHours);

  if (resTach == null) {
    setResTach(0);
  }
  if (resHobb == null) {
    setResHobb(0);
  }

  const handleClose = () => {
    onClose();
  };

  const saveFlightHours = async () => {
    let tach_delta = (resTach ? resTach : 0) - (reservationData.tachHours ? reservationData.tachHours : 0) + plane.tachHours;
    let hobb_delta = (resHobb ? resHobb : 0) - (reservationData.hobbsHours ? reservationData.hobbsHours : 0) + plane.hobbsHours;

    const resData = { // data to update reservation
      reservationId: reservationData.reservationId,
      pilotId: reservationData.pilotId,
      planeId: planeId,
      instructorId: reservationData.instructorId,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      flightType: reservationData.flightType,
      tachHours: resTach,
      hobbsHours: resHobb,
    }

    const planeData = {
      planeId: planeId,
      nickName: plane.nickName,
      hourlyRate: plane.hourlyRate,
      numEngines: plane.numEngines,
      tachHours: tach_delta,
      hobbsHours: hobb_delta,
      grounded: plane.grounded,
    }

    try {
      const resResponseData = await makeApiCall("/api/reservation/update", resData, "put");
      
      try {
        const planeResponseData = await makeApiCall("/api/plane/update", planeData, "put");

        props.updateScreen();  
        onClose();
      } catch (error) {
        console.error(error);
      }
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
          <h1>Finish Flight for {plane.tailNumber}</h1>
          <div className='boxframe'><CloseIcon onClick={handleClose} /></div>
        </div>

        <div className='row'>
          <h2>Starting Tach: {tach}</h2>
          <TextField        
            id="tach"
            label="Tach Hours"
            type="number"
            value={resTach}
            onChange={(e) => setResTach(parseFloat(e.target.value))}/>
        </div>
        <div className='row'>
          <h2>Starting Hobbs: {hobbs}</h2>
          <TextField
            id="hobb"
            label="Hobbs Hours"
            type="number"
            value={resHobb}
            onChange={(e) => setResHobb(parseFloat(e.target.value))}/>
        </div>

        <div className='row'>
          <PrimaryButton text="Save Changes" onClick={saveFlightHours} />

          <CancelButton text="Cancel" onClick={handleClose} />
        </div>

      </div>
    </Dialog>
  );

}
export default FinishFlight