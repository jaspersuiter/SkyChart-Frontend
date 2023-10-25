import { useEffect, useState } from 'react';
import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';
import Reservation from './Reservation';
import Unavailable from './Unavailable';
import { makeApiCall } from '../../APICall';
import { it } from 'node:test';
import { getReservationData } from './Util';

export interface AircraftSectionProps {
  isDay: Boolean;
  AircraftName: String;
  AircraftId: string;
  Day: string
  isGrounded: Boolean;
}

function AircraftSection(props: AircraftSectionProps) {

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
      const data = await getReservationData( props.Day, {planeid: props.AircraftId});
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

  let unavailable = null;

  if (props.isGrounded) {
    // Create unavailable container with grounded times
    let unavailableProps = {
      resStartTime: '9:00', // Grounded Start Time
      resEndTime: '11:00', // Grounded End Time
      isDay: props.isDay,
      type: 'Unavailable',
      width: undefined
    }
    
    unavailable = Unavailable(unavailableProps);
  }

    return (
      <div className='container'>
        {reservations}
        <div className="mainBar">
          <Identifier Name={props.AircraftName}/>
          {unavailable}
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