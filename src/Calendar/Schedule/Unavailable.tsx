import './Unavailable.css';
import { calculateDurationInMinutes, calculateLeftPosition, calculateLengthFromDuration, convertToMilitaryTime, convertToMilitaryTimeNoDate } from './Util';

export interface UnavailableProps {
  resStartTime: string;
  resEndTime: string;
  isDay: Boolean
  type: string
}


function Unavailable(props: UnavailableProps) {

  const startTime = convertToMilitaryTimeNoDate(props.resStartTime)
  const endTime = convertToMilitaryTimeNoDate(props.resEndTime)
  const duration = calculateDurationInMinutes(startTime, endTime)

    
    var pixelsPerHour = 67.6; // Define the scale

    if(!props.isDay){
        pixelsPerHour = 65.6;
    }

    const lengthInPixels = calculateLengthFromDuration(duration, pixelsPerHour);
    var leftPosition = calculateLeftPosition(startTime, pixelsPerHour);
    leftPosition = leftPosition + 154


    return (
      <div className={props.type === "Perfered" ? 'other' : 'unavailable'} style={{ width: `${lengthInPixels}px`, left: `${leftPosition}px`}}>
        <p className='mainText'>{props.type === "Perfered" ? 'Perfered' : 'Unavailable'}</p>
      </div>
    );
  }
  
  export default Unavailable;