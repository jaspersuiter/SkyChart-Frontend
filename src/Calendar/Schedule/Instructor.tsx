import { useEffect, useState } from 'react';
import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';
import Reservation from './Reservation';
import { getReservationData } from './Util';

export interface InstructorSelectionProps {
  isDay: Boolean;
  InstructorName: string;
  InstructorId: string;
  Day: string
}

function InstructorSelection(props: InstructorSelectionProps) {

  const [reservationData, setReservationData] = useState<Array<{
    reservationId: string;
    pilotId: string;
    planeId: string;
    instructorId: string;
    startTime: string;
    endTime: string
    flightType: string;
  }>>([]);

  useEffect(() => {
    async function fetchReservationData() {
      const data = await getReservationData( props.Day, {userid: props.InstructorId});
      setReservationData(data);
    }

    fetchReservationData();
  }, []);

  let reservations = null;
  
  if (reservationData.length > 0) {
    reservations = reservationData.map((item, index) => (
      <Reservation isDay={props.isDay} resStartTime={item.startTime} resEndTime={item.endTime} pilotid={item.pilotId} key={index}/>
    ));
  }


    return (
      <div className='container'>
        {/* <Reservation isDay={props.isDay} resStartTime={"10/5/2023 12:00:00 PM"} resEndTime={"10/5/2023 2:00:00 PM"} pilotid={"fa2538b5-36b9-4415-b815-826ca2f9200f"}/> */}
        {reservations}
      <div className="mainBar">
        <Identifier Name={props.InstructorName}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
        <Hour isDay={props.isDay}/>
      </div>
      </div>
    );
  }
  
  export default InstructorSelection;