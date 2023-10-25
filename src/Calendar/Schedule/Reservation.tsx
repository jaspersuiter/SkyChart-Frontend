import { useEffect, useState } from 'react';
import { makeApiCall } from '../../APICall';
import './Reservation.css';
import EditReservation from './EditReservation';
import { title } from 'process';
import { calculateDurationInMinutes, calculateLeftPosition, calculateLengthFromDuration, convertToMilitaryTime, formatTime } from './Util';
import { Instructor, Plane } from '../Calendar';

export interface ReservationProps {
  resStartTime: string;
  resEndTime: string;
  pilotid: string;
  isDay: Boolean;
  reservationData: ReservationData;
  Instructors: Array<Instructor>;
  Planes: Array<Plane>;
  width: number| undefined
  updateScreen: () => void;
}

export interface ReservationData {
  reservationId: string;
  pilotId: string;
  planeId: string;
  instructorId: string;
  startTime: string;
  endTime: string;
  flightType: string;
}

async function getUserData(planeid: String): Promise<
  {
    userId: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string
    phoneNumber: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhoneNumber: string;
    preferredInstructorId: string;
    preferredPlanes: string;
  }
> {

  const params = {
    userId: planeid
    
  }

  try {
    const responseData2 = await makeApiCall("/api/user/get", {}, "get", params);
    return responseData2;
  } catch (error) {
    console.error(error);
    return {
      userId: "",
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      emergencyContactName: "",
      emergencyContactPhoneNumber: "",
      preferredInstructorId: "",
      preferredPlanes: "",
    };
  }
}


function Reservation(props: ReservationProps) {

  const [userData, SetUserData] = useState<any>({});
  const [openEditReservation, setOpenEditReservation] = useState(false);

  const closeEditReservationDialog = () => {
    setOpenEditReservation(false);
  }
  const openEditReservationDialog = () => {
    setOpenEditReservation(true);
  }

  useEffect(() => {
    async function fetchReservationData() {
      const data = await getUserData(props.pilotid);
      SetUserData(data);
    }

    fetchReservationData();
  }, []);

  const startTime = convertToMilitaryTime(props.resStartTime)
  const endTime = convertToMilitaryTime(props.resEndTime)
  const duration = calculateDurationInMinutes(startTime, endTime)
  var namesection = 154
  
  const startTimeDisplay = formatTime(props.resStartTime)



  const Title = startTimeDisplay + " " + userData.firstName + " " + userData.lastName
    
  var pixelsPerHour = props.width; // Define the scale
  if(pixelsPerHour == undefined){
    pixelsPerHour= 64
  }

    const lengthInPixels = calculateLengthFromDuration(duration, pixelsPerHour);
    var leftPosition = calculateLeftPosition(startTime, pixelsPerHour);
    leftPosition = leftPosition + namesection


    return (
      <div className='mainContainer' style={{ width: `${lengthInPixels}px`, left: `${leftPosition}px` }} onClick={openEditReservationDialog}>
        <p className='mainText'>{Title}</p>
        <EditReservation
          open={openEditReservation}
          onClose={closeEditReservationDialog}
          reservationData={props.reservationData}
          Instructors={props.Instructors}
          Planes={props.Planes} 
          updateScreen={props.updateScreen}/>
      </div>
    );
}
  

  export default Reservation;

  