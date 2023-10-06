import { useEffect, useState } from 'react';
import { makeApiCall } from '../../APICall';
import './Reservation.css';
import { title } from 'process';
import { calculateDurationInMinutes, calculateLeftPosition, calculateLengthFromDuration, convertToMilitaryTime, formatTime } from './Util';

export interface ReservationProps {
  resStartTime: string;
  resEndTime: string;
  pilotid: string;
  isDay: Boolean
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
  
  const startTimeDisplay = formatTime(props.resStartTime)



  const Title = startTimeDisplay + " " + userData.firstName + " " + userData.lastName
    
    var pixelsPerHour = 67.6; // Define the scale

    if(!props.isDay){
        pixelsPerHour = 65.6;
    }

    const lengthInPixels = calculateLengthFromDuration(duration, pixelsPerHour);
    var leftPosition = calculateLeftPosition(startTime, pixelsPerHour);
    leftPosition = leftPosition + 154


    return (
      <div className='mainContainer' style={{ width: `${lengthInPixels}px`, left: `${leftPosition}px`}}>
        <p className='mainText'>{Title}</p>
      </div>
    );
}
  

  export default Reservation;

  