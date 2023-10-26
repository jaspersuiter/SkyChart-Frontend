import './FinishFlight.css'
import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { makeApiCall } from '../../APICall';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { ReservationData } from '../../Calendar/Schedule/Reservation';
import { Instructor, Plane } from '../../Calendar/Calendar';
import CancelButton from '../../Buttons/CancelButton';


export interface FinishFlightProp {
  open: boolean;
  onClose: () => void;
  reservationData: ReservationData;
  updateScreen: () => void;
}

function FinishFlight(props: FinishFlightProp) {
  const { open, onClose, reservationData } = props;
  const [plane, setPlane] = useState(reservationData.planeId);

  const handleClose = () => {
    onClose();
  };

  const saveFlightHours = async () => {
    const data = {
      reservationId: reservationData.reservationId,
      pilotId: reservationData.pilotId,
      planeId: plane,
      instructorId: reservationData.instructorId,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      flightType: reservationData.flightType
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

          </div>
        </div>

        <div className='spacertwo'>

        </div>

        <div className='flexRow'>

          <div className='button'>
            <PrimaryButton text="Save Changes" onClick={() => 0} />
          </div>

          <div className='button'>
            <CancelButton text="Cancel" onClick={() => 0} />
          </div>
        </div>

      </div>
    </Dialog>
  );

}
export default FinishFlight