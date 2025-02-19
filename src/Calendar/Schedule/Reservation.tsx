import { useEffect, useState } from 'react';
import { makeApiCall } from '../../APICall';
import './Reservation.css';
import EditReservation from '../../Reservation/EditReservation/EditReservation';
import { calculateDurationInMinutes, calculateLeftPosition, calculateLengthFromDuration, convertToMilitaryTime, formatTime } from './Util';
import { Instructor, Plane, User } from '../Calendar';
import { DropDownType } from '../../Utils/DropDowns/ReservationTypeMultiselectDropDown';
import { ReservationType } from '../../Utils/DropDowns/ReservationTypeDropDown';

export interface ReservationProps {
  resStartTime: string;
  resEndTime: string;
  pilotid: string;
  isDay: Boolean;
  isLimited: Boolean;
  currentUser: User;
  reservationData: ReservationData;
  Instructors: Array<Instructor>;
  Planes: Array<Plane>;
  width: number| undefined
  updateScreen: () => void;
  openReservation: (reservation: ReservationData) => void;
  selectedTypes: Array<ReservationType>;
}

export interface ReservationData {
  reservationId: string;
  pilotId: string;
  planeId: string;
  instructorId: string;
  startTime: string;
  endTime: string;
  flightType: ReservationType;
  tachHours?: number;
  hobbsHours?: number;
  repeat: number;
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

  const [currUser, setCurrUser] = useState<User>(props.currentUser)
  const [isadmin, setIsAdmin] = useState<boolean>(false);


  const fetchCurrentUser = async () => {
    try {
        const request2 = await fetch('http://localhost:5201/api/user/get-current-is-admin',
        {credentials: 'include'})
            .then((response) => response.json())
            .then((data) => data) as boolean;
          setIsAdmin(request2);
    } catch (error) {
        console.log(error);
    }
}

  const [userData, SetUserData] = useState<any>({});

  const openEditReservationDialog = () => {
    if (currUser.id === props.reservationData.instructorId ||
        currUser.id === props.reservationData.pilotId || isadmin) {
          props.openReservation(props.reservationData);
      }
  }

  useEffect(() => {
    fetchCurrentUser();
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
    
  var grayed = false;
  if(!props.selectedTypes.includes(props.reservationData.flightType)){
    grayed = true;
  }
  if(props.isLimited && (props.reservationData.pilotId !== props.currentUser.id && props.reservationData.instructorId !== props.currentUser.id)){  
    grayed = true;
  }
  


    return (
      <div className={(grayed ? "mainContainerGrayed": "mainContainer")} style={{ width: `${lengthInPixels}px`, left: `${leftPosition}px` }} onClick={openEditReservationDialog}>
        <p className='mainText'>{Title}</p>
      </div>
    );
}
  

  export default Reservation;

  