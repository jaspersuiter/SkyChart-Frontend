import './Reservation.css';

export interface ReservationProps {
  Title: string
  duration: number
  startTime: string;
  resStartTime: string;
  resEndTime: string;
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


function Reservation(props: ReservationProps) {

  const startTime = convertToMilitaryTime(props.resStartTime)
  const endTime = convertToMilitaryTime(props.resEndTime)
  const duration = calculateDurationInMinutes(startTime, endTime)

    
    var pixelsPerHour = 67.6; // Define the scale

    if(!props.isDay){
        pixelsPerHour = 65.6;
    }

    const lengthInPixels = calculateLengthFromDuration(duration, pixelsPerHour);
    var leftPosition = calculateLeftPosition(startTime, pixelsPerHour);
    leftPosition = leftPosition + 154


    return (
      <div className='mainContainer' style={{ width: `${lengthInPixels}px`, left: `${leftPosition}px`}}>
        <p className='mainText'>{props.Title}</p>
      </div>
    );
}
  

  export default Reservation;

  function calculateDurationInMinutes(startTime: string, endTime: string) {
    // Parse the input times and extract hours and minutes
    const startParts = startTime.split(':');
    const endParts = endTime.split(':');
    
    // Convert hours and minutes to integers
    const startHour = parseInt(startParts[0]);
    const startMinute = parseInt(startParts[1]);
    const endHour = parseInt(endParts[0]);
    const endMinute = parseInt(endParts[1]);
    
    // Calculate the total minutes for each time
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    
    // Calculate the duration in minutes
    const durationInMinutes = endTotalMinutes - startTotalMinutes;
    
    return durationInMinutes;
  }


function convertToMilitaryTime(inputDateTime: string) {
  // Split the input string by space to separate date and time
  const dateTimeParts = inputDateTime.split(' ');

  // Extract the time part (index 1)
  const timePart = dateTimeParts[1];
  const dem = dateTimeParts[2]

  // Split the time by colon to get hours and minutes
  const [hours, minutes] = timePart.split(':');

  // Convert the hours to a number
  let militaryHours = parseInt(hours);

  // If it's PM and not 12:00 PM, add 12 to the military hours
  if (dem === 'PM' && militaryHours !== 12) {
    militaryHours += 12;
  }

  // Convert military hours back to string with leading zeros if needed
  let militaryHoursstr = militaryHours.toString().padStart(2, '0');

  // Construct the military time string
  const militaryTime = `${militaryHoursstr}:${minutes}`;

  return militaryTime;
}