import './Unavailable.css';

export interface UnavailableProps {
  duration: number
  startTime: string;
  isDay: Boolean
}

function calculateLengthFromDuration(durationInMinutes: number, pixelsPerHour: number): number {
    const durationInHours = durationInMinutes / 60;
    const lengthInPixels = durationInHours * pixelsPerHour;
    return lengthInPixels;
}

function calculateLeftPosition(startTime: string, pixelsPerHour: number): number {
    const startTimeParts = startTime.split(':');
    if (startTimeParts.length === 2) {
      const hours = parseInt(startTimeParts[0]);
      const minutes = parseInt(startTimeParts[1]);
      const totalMinutes = hours * 60 + minutes;
      return (totalMinutes - 360) * (pixelsPerHour / 60); // 360 minutes = 6:00 AM
    }
    return 0;
}


function Unavailable(props: UnavailableProps) {

    
    var pixelsPerHour = 67.6; // Define the scale

    if(!props.isDay){
        pixelsPerHour = 65.6;
    }

    const lengthInPixels = calculateLengthFromDuration(props.duration, pixelsPerHour);
    var leftPosition = calculateLeftPosition(props.startTime, pixelsPerHour);
    leftPosition = leftPosition + 154


    return (
      <div className='other' style={{ width: `${lengthInPixels}px`, left: `${leftPosition}px`}}>
        <p className='mainText'>Unavailable</p>
      </div>
    );
  }
  
  export default Unavailable;