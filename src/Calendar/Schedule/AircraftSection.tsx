import { useEffect, useRef, useState } from 'react';
import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';
import Reservation from './Reservation';
import Unavailable from './Unavailable';
import Grounded from './Grounded';
import { makeApiCall } from '../../APICall';
import { it } from 'node:test';
import { getReservationData } from './Util';
import { Instructor, Plane } from '../Calendar';

export interface AircraftSectionProps {
  isDay: Boolean;
  Aircraft: Plane;
  Day: string
  isGrounded: Boolean;
  Instructors: Array<Instructor>;
  Planes: Array<Plane>;
  updateScreen: () => void;
  openAirplane: (plane: Plane) => void;
}

function AircraftSection(props: AircraftSectionProps) {

  const divRef = useRef<HTMLDivElement | null>(null);

  const [divWidth, setDivWidth] = useState(0);

  const updateDivWidth = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setDivWidth(rect.width);
    }
  };

  useEffect(() => {
    updateDivWidth();

    const resizeObserver = new ResizeObserver(updateDivWidth);

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const [reservationData, setReservationData] = useState<Array<{
    reservationId: string;
    pilotId: string;
    planeId: string;
    instructorId: string;
    startTime: string;
    endTime: string
    flightType: string;
    repeat: number;
    tachHours?: number;
    hobbsHours?: number;
  }>>([]);

  useEffect(() => {
    async function fetchReservationData() {
      const data = await getReservationData( props.Day, {planeid: props.Aircraft.planeId});
      setReservationData(data);
    }

    fetchReservationData();
  }, []);

  let reservations = null;
  
  if (reservationData.length > 0) {
    reservations = reservationData.map((item, index) => (
      <Reservation
        isDay={props.isDay}
        resStartTime={item.startTime}
        resEndTime={item.endTime}
        pilotid={item.pilotId}
        key={index}
        reservationData={item}
        width={divWidth}
        Instructors={props.Instructors}
        Planes={props.Planes} 
        updateScreen={props.updateScreen}/>
    ));
  }

  let grounded = null;

  if (props.isGrounded) {
    // Create unavailable container with grounded times
    let GroundedProps = {
      resStartTime: '9:00:00', // Grounded Start Time
      resEndTime: '11:00:00', // Grounded End Time
      isDay: props.isDay,
      width: divWidth
    }
    
    grounded = Grounded(GroundedProps);
  }

    return (
      <div className='container'>
        {reservations}
        {grounded}
        <div className="mainBar">
          <Identifier Name={props.Aircraft.tailNumber + " - [" + props.Aircraft.nickName + "]"} Aircraft={props.Aircraft} openAirplane={props.openAirplane}/>
          <Hour isDay={props.isDay} ref={divRef}/>
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