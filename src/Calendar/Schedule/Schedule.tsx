import { Dayjs } from "dayjs";
import DayCalendar from "./DayCalendar";

export interface ScheduleProps {
  isDay: Boolean;
  day: Dayjs;
}

function Schedule(props: ScheduleProps) {
  return (
    <div className='main-calendar-frame'>
        
      <DayCalendar isDay={props.isDay} day={props.day}/>
    </div>
  );
}

export default Schedule;