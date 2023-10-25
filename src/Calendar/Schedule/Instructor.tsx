import { useRef, useEffect, useState } from 'react';
import './HourHolder.css';
import Hour from './HourIdentifier';
import Identifier from './Identifier';
import Reservation from './Reservation';
import { convertToMilitaryTimeNoDate, getReservationData } from './Util';
import Unavailable from './Unavailable';
import { makeApiCall } from '../../APICall';
import { Instructor, Plane } from '../Calendar';

export interface InstructorSelectionProps {
  isDay: Boolean;
  InstructorName: string;
  InstructorId: string;
  Day: string;
  DayName: string;
  Instructors: Array<Instructor>;
  Planes: Array<Plane>;
}

async function getAvailabilityData(userid: string): Promise<
  Array<{
    availabilityId: string;
    day: string;
    startTime: string;
    endTime: string;
    userId: string;
    type: string
  }>
> {

  const params = {
    userId: userid
    
}

  try {
    const responseData2 = await makeApiCall("/api/availability/get", {}, "get", params);
    return responseData2;
  } catch (error) {
    console.error(error);
    return [];
  }
}




function InstructorSelection(props: InstructorSelectionProps) {

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
  }>>([]);

  const [availabilityData, setavailabilityData] = useState< Array<{
    availabilityId: string;
    day: string;
    startTime: string;
    endTime: string;
    userId: string;
    type: string
  }>>([]);

  useEffect(() => {
    async function fetchReservationData() {
      const data = await getReservationData( props.Day, {userid: props.InstructorId});
      setReservationData(data);
    }

    async function fetchAvailabilityData() {
      const data = await getAvailabilityData( props.InstructorId);
      setavailabilityData(data);
    }

    fetchReservationData();
    fetchAvailabilityData();
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
        Planes={props.Planes} />
    ));
  }

  const preferredArray = availabilityData.filter(obj => obj.type === "PreferredTime" && obj.day === props.DayName);
  const avilableArray = availabilityData.filter(obj => obj.day === props.DayName);


  let perferred = null;
  
  if (reservationData.length > 0) {
    perferred = preferredArray.map((item, index) => (
      <Unavailable resStartTime={item.startTime} resEndTime={item.endTime} isDay={props.isDay} type='Perfered' width={divWidth} key={index}/>
    ));
  }

  const slot1 = {
    availabilityId: "Not Available Generated Unavailable",
    day: "Friday",
    startTime: "6:00 AM",
    endTime: "11:00 PM",
    userId: props.InstructorId,
    type: "Unavailable"
  };

  const unavailableArray = createUnavilable(avilableArray, slot1)

  let unavailablecomp = null;
  
  if (unavailableArray.length > 0) {
    unavailablecomp = unavailableArray.map((item, index) => (
      <Unavailable resStartTime={item.startTime} resEndTime={item.endTime} isDay={props.isDay} type='Unavailable' width={divWidth} key={index}/>
    ));
  }

    return (
      <div className='container'>
        {/* <Reservation isDay={props.isDay} resStartTime={"10/5/2023 12:00:00 PM"} resEndTime={"10/5/2023 2:00:00 PM"} pilotid={"fa2538b5-36b9-4415-b815-826ca2f9200f"}/> */}
        {reservations}
        {perferred}
        {unavailablecomp}
      <div className="mainBar">
        <Identifier Name={props.InstructorName}/>
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
  
  export default InstructorSelection;


  function splitAvailabilitySlot(slot1: any, slot2: any) {
    const startTime1 = convertToMilitaryTimeNoDate(slot1.startTime)
    const startTime2 = convertToMilitaryTimeNoDate(slot2.startTime)

    const endTime1 = convertToMilitaryTimeNoDate(slot1.endTime)
    const EndTime2 = convertToMilitaryTimeNoDate(slot2.endTime)
    

    // Check if the second slot starts before or after the first slot
    if (startTime2 <= startTime1 && EndTime2 >= endTime1) {
      // Slot 2 completely covers Slot 1, no split needed
      return [slot1];
    } else if (startTime2 >= endTime1 || EndTime2 <= startTime1) {
      // Slot 2 is entirely before or after Slot 1, no overlap
      return [slot1];
    } else {
      // Slot 2 partially overlaps with Slot 1, split Slot 1 into two slots
      const splitSlots = [];
      
      if (startTime2 > startTime1) {
        // Create the first split slot before Slot 2
        const firstSlot = { ...slot1, endTime: slot2.startTime };
        splitSlots.push(firstSlot);
      }
  
      if (EndTime2 < endTime1) {
        // Create the second split slot after Slot 2
        const secondSlot = { ...slot1, startTime: slot2.endTime };
        splitSlots.push(secondSlot);
      }
  
      return splitSlots;
    }
  }

  function createUnavilable(Available: Array<any>, baseUnavailable: any){
    let unavailable = [];
    unavailable.push(baseUnavailable)

    let secondary: any[] = [];

    for (let i = 0; i < Available.length; i++) {
      while (unavailable.length > 0){
        const base = unavailable.pop()
        const remove = Available[i]
        let splitSlots = splitAvailabilitySlot(base, remove)
        while(splitSlots.length > 0){
          secondary.push(splitSlots.pop())
        }
      }

      unavailable = secondary;
      secondary = []
    }
    return unavailable;
  }