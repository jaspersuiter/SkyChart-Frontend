import { Dayjs } from 'dayjs';
import './DayCalendar.css';
import InstructorSelection from './Instructor';
import AircraftSection from './AircraftSection';
import { makeApiCall } from '../../APICall';
import { useEffect, useState } from 'react';
import { Instructor, Plane, User } from '../Calendar';
import { ReservationData } from './Reservation';
import { DropDownType } from '../../Utils/DropDowns/ReservationTypeMultiselectDropDown';
import { ReservationType } from '../../Utils/DropDowns/ReservationTypeDropDown';

export interface DayCalendarProps {
  isDay: Boolean;
  day: Dayjs;
  isLimited: boolean;
  currentUser: User;
  updateScreen: () => void;
  openAirplane: (plane: Plane) => void;
  openReservation: (reservation: ReservationData) => void;
  selectedPlanes: Array<Plane>;
  selectedInstructors: Array<Instructor>;
  selectedTypes: Array<ReservationType>;
}

function DayCalendar(props: DayCalendarProps) {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let daystr = props.day.format('YYYY-MM-DD')

  // Map the aircraft data to JSX elements
  const planes = props.selectedPlanes.map((item, index) => (
    <AircraftSection isDay={props.isDay} isLimited={props.isLimited} currentUser={props.currentUser} Aircraft={item} Day={daystr} key={index} Instructors={props.selectedInstructors} Planes={props.selectedPlanes}  selectedTypes={props.selectedTypes} updateScreen={props.updateScreen} openAirplane={props.openAirplane}  openReservation={props.openReservation} isGrounded={item.grounded}/>
  ));
  
  const instruictors = props.selectedInstructors.map((item, index) => (
    <InstructorSelection isDay={props.isDay} isLimited={props.isLimited} currentUser={props.currentUser} InstructorName={item.name} key={index} Day={daystr} InstructorId={item.userId} DayName={dayNames[props.day.day()]} Instructors={props.selectedInstructors} Planes={props.selectedPlanes} selectedTypes={props.selectedTypes}updateScreen={props.updateScreen} openReservation={props.openReservation}/>
  ));

  return (
    <div className="mainSection">
      {!props.isDay && <p className="dayTextFormating">{dayNames[props.day.day()]}</p>}
      <div className="time-frame">
        {planes}
        {instruictors}
      </div>
    </div>
  );
}

export default DayCalendar;