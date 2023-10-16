import './Unavailable.css';
import { calculateDurationInMinutes, calculateLeftPosition, calculateLengthFromDuration, convertToMilitaryTime, convertToMilitaryTimeNoDate } from './Util';

export interface UnavailableProps {
  resStartTime: string;
  resEndTime: string;
  isDay: Boolean
  type: string
  width: number| undefined
}


function Unavailable(props: UnavailableProps) {

  const startTime = convertToMilitaryTimeNoDate(props.resStartTime)
  const endTime = convertToMilitaryTimeNoDate(props.resEndTime)
  const duration = calculateDurationInMinutes(startTime, endTime)
  var namesection = 154

    
    var pixelsPerHour = props.width; // Define the scale
    if(pixelsPerHour == undefined){
      pixelsPerHour= 64
    }

    const lengthInPixels = calculateLengthFromDuration(duration, pixelsPerHour);
    var leftPosition = calculateLeftPosition(startTime, pixelsPerHour);
    leftPosition = leftPosition + namesection


    return (
      <div className={props.type === "Perfered" ? 'other' : 'unavailable'} style={{ width: `${lengthInPixels}px`, left: `${leftPosition}px`}}>
        <p className='mainText'>{props.type === "Perfered" ? 'Perfered' : 'Unavailable'}</p>
      </div>
    );
  }
  
  export default Unavailable;