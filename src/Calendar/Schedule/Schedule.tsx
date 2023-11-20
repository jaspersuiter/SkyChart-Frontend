import { Dayjs } from "dayjs";
import DayCalendar from "./DayCalendar";
import HourBar from "./HourHolder";
import './Schedule.css';
import { Plane } from "../Calendar";
import { ReservationData } from "./Reservation";

export interface ScheduleProps {
  isDay: Boolean;
  day: Dayjs;
  updateScreen: () => void;
  openAirplane: (plane: Plane) => void;
  openReservation: (reservation: ReservationData) => void;
  selectedPlanes: Array<Plane>;
}

function Schedule(props: ScheduleProps) {

  const week = [];

  if (!props.isDay){
      var index = props.day.day()

      for (let i = 0; i < 7; i++){
        week.push(props.day.day(i))
        index++
      }
  } else{
    week.push(props.day)
  } 

  const dayCalendars = week.map((item, index) => (
    <div className= 'frame' key={index}>
      <DayCalendar isDay={props.isDay} day={item} updateScreen={props.updateScreen} openAirplane={props.openAirplane} openReservation={props.openReservation} selectedPlanes={props.selectedPlanes}/>
      {(!props.isDay && index != 6) && <div className="breakLine"></div>}
    </div>
  ));

  return (
    <div className='main-calendar-frame'>
      <HourBar isDay={props.isDay}/> 
      {dayCalendars}
    </div>
  );
}

export default Schedule;