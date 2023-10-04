import { Dayjs } from 'dayjs';
import './DayCalendar.css';
import React from 'react';
import Hour from './HourIdentifier';
import Identifier from './Identifier';
import InstructorSelection from './Instructor';
import AircraftSection from './AircraftSection';

export interface DayCalendarProps {
  isDay: Boolean;
  day: Dayjs;
}

function DayCalendar(props: DayCalendarProps) {

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    return (
      <div className="mainSection">
            {!props.isDay && <p className='dayTextFormating'>{dayNames[props.day.day()]}</p>}
            <div className='time-frame'>
                <AircraftSection isDay={props.isDay}  AircraftName={"Starscream"}/>
                <InstructorSelection isDay={props.isDay} InstructorName={"Gustavo"}/>
                    
            </div>
      </div>
    );
  }
  
  export default DayCalendar;