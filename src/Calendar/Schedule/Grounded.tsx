import './Grounded.css';
import { calculateDurationInMinutes, calculateLeftPosition, calculateLengthFromDuration, convertToMilitaryTime, convertToMilitaryTimeNoDate } from './Util';

export interface GroundedProps {
  resStartTime: string;
  resEndTime: string;
  isDay: Boolean
  width: number| undefined
}


function Grounded(props: GroundedProps) {

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
      <div className='grounded' style={{ width: `${lengthInPixels}px`, left: `${leftPosition}px`}}>
        <p className='mainText'>Grounded</p>
      </div>
    );
  }
  
  export default Grounded;