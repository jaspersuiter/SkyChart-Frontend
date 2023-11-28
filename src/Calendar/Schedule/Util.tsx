import { makeApiCall } from "../../APICall";
import { ReservationData } from "./Reservation";

export async function getReservationData(day: String, options?: { planeid?: string; userid?: string }): Promise<
  Array<{
    reservationId: string;
    pilotId: string;
    planeId: string;
    instructorId: string;
    startTime: string;
    endTime: string
    flightType: string;
    repeat: number;
  }>
> {

    const { planeid, userid } = options || {};

  const params = {
    startDate: day,
    endDate: day,
    planeId: planeid,
    userId: userid
    
}

  try {
    const responseData2 = await makeApiCall("/api/reservation/get", {}, "get", params);
    return responseData2;
  } catch (error) {
    console.error(error);
    return [];
  }
}

 export function calculateLengthFromDuration(durationInMinutes: number, pixelsPerHour: number): number {
    const durationInHours = durationInMinutes / 60;
    const lengthInPixels = durationInHours * pixelsPerHour;
    return lengthInPixels;
}

export function calculateLeftPosition(startTime: string, pixelsPerHour: number): number {
    const startTimeParts = startTime.split(':');
    if (startTimeParts.length === 2) {
      const hours = parseInt(startTimeParts[0]);
      const minutes = parseInt(startTimeParts[1]);
      const totalMinutes = hours * 60 + minutes;
      return (totalMinutes - 360) * (pixelsPerHour / 60); // 360 minutes = 6:00 AM
    }
    return 0;
}

export function calculateDurationInMinutes(startTime: string, endTime: string) {
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


export function convertToMilitaryTime(inputDateTime: string) {
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

export function convertToMilitaryTimeNoDate(inputDateTime: string) {
    // Split the input string by space to separate date and time
    const dateTimeParts = inputDateTime.split(' ');
  
    // Extract the time part (index 1)
    const timePart = dateTimeParts[0];
    const dem = dateTimeParts[1]
  
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

export function formatTime(input: string) {
  const date = new Date(input);

  // Extract hour, minutes, and AM/PM
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zeros to minutes if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
}

export function isCurrentUserInReservationData(reservations: ReservationData[], currentUserid: string, isLimited: boolean): boolean {

  if (!isLimited) {
    return false;
  }

  for (const reservation of reservations) {

    if (reservation.pilotId === currentUserid || reservation.instructorId === currentUserid) {
      return true; 
    }
  }

  return false;
}
