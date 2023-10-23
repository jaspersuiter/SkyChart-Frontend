import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import { makeApiCall } from '../../APICall';
import TextField from '@mui/material/TextField';
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
}
function AddNewAircraft(props: EditReservationProp) {
  const { open, onClose, reservationData } = props;
  const [plane, setPlane] = useState(reservationData.planeId);
  const [instructor, setInstructor] = useState(reservationData.instructorId);
  const [flightType, setFlightType] = useState<ReservationType>(reservationData.flightType as unknown as ReservationType);
  const [startTime, setStartTime] = useState(reservationData.startTime);
  const [endTime, setEndTime] = useState(reservationData.endTime);

  console.log(flightType);

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
          <h1>Edit Reservation</h1>
          <div className='boxframe'><CloseIcon onClick={handleClose} /></div>
        </div>

        <div className='maindropdowncontent'>
          <div className='threewide'>
            <InstructorDropDown Instructors={props.Instructors} InstructorId={instructor} setInstructorIdParent={setInstructor} />

            <PlaneDropDown Planes={props.Planes} PlaneID={plane} SetPlaneIdParent={setPlane} />

            <ReservationTypeDropDown ReservationType={flightType} setReservationTypeParent={setFlightType} />
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