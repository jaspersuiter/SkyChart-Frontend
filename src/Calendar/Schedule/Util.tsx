import { makeApiCall } from "../../APICall";

export async function getReservationData(day: String, options?: { planeid?: string; userid?: string }): Promise<
  Array<{
    reservationId: string;
    pilotId: string;
    planeId: string;
    instructorId: string;
    startTime: string;
    endTime: string
    flightType: string;
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