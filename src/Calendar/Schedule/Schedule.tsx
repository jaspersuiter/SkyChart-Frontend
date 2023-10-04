import { Dayjs } from "dayjs";
import DayCalendar from "./DayCalendar";
import Hour from "./HourIdentifier";
import HourBar from "./HourHolder";

export interface ScheduleProps {
  isDay: Boolean;
  day: Dayjs;
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
    <DayCalendar key={index} isDay={props.isDay} day={item} />
  ));

  return (
    <div className='main-calendar-frame'>
      <HourBar isDay={props.isDay}/> 
      {dayCalendars}
    </div>
  );
}

export default Schedule;