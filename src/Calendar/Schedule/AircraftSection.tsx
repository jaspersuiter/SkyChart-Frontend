import { useEffect, useState } from 'react';
import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';
import Reservation from './Reservation';
import Unavailable from './Unavailable';
import { makeApiCall } from '../../APICall';

export interface AircraftSectionProps {
  isDay: Boolean;
  AircraftName: String;
  AircraftId: String;
  Day: String
}

async function getReservationData(day: String, planeid: String): Promise<
  Array<{
    reservationId: string;
    pilotId: string;
    planeId: string;
    instructorId: string;
    startTime: string;
    endTime: string
    flightType: string;
  }>
> {

  const params = {
    startDate: day,
    endDate: day,
    planeId: planeid
    
}

  try {
    const responseData2 = await makeApiCall("/api/reservation/get", {}, "get", params);
    return responseData2;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function AircraftSection(props: AircraftSectionProps) {

  const [reservationData, setReservationData] = useState<Array<any>>([]);

  useEffect(() => {
    async function fetchReservationData() {
      const data = await getReservationData( props.Day, props.AircraftId);
      setReservationData(data);
    }

    fetchReservationData();
  }, []);
  
  const reservations = reservationData.map((item, index) => (
    <Reservation Title='Tommy' duration={60} startTime='12:00' isDay={props.isDay} resStartTime={item.startTime} resEndTime={item.endTime} key={index}/>
  ));

    return (
      <div className='container'>
        {reservations}
        <Unavailable duration={60} startTime='14:00' isDay={props.isDay}/>
        <div className="mainBar">
          <Identifier Name={props.AircraftName}/>
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
  
  export default AircraftSection;