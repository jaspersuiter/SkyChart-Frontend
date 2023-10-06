import { Dayjs } from 'dayjs';
import './DayCalendar.css';
import InstructorSelection from './Instructor';
import AircraftSection from './AircraftSection';
import { makeApiCall } from '../../APICall';
import { useEffect, useState } from 'react';

export interface DayCalendarProps {
  isDay: Boolean;
  day: Dayjs;
}

async function getAircraftData(): Promise<
  Array<{
    planeId: string;
    tailNumber: string;
    model: string;
    nickName: string;
    hourlyRate: number;
    numEngines: number;
    tachHours: number;
    hobbsHours: number;
  }>
> {

  const data = {
    usernameOrEmail: "tkm",
    password: "1234"
  }
  try {
    //const reponseDate = await makeApiCall("/api/user/authentication/login", data, "post")
    const responseData2 = await makeApiCall("/api/plane/get-all", {}, "get");
    return responseData2;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getInstructorData(): Promise<
  Array<{
    userId: string;
    name: string;
    email: string;
    phone: string;
    instructorRatings: Array<{}>;
  }>
> {
  try {
    const responseData2 = await makeApiCall("/api/instructor/get-all", {}, "get");
    return responseData2;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function DayCalendar(props: DayCalendarProps) {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const [aircraftData, setAircraftData] = useState<Array<any>>([]);
  const [InstructorData, setInstructorData] = useState<Array<any>>([]);

  let daystr = props.day.format('YYYY-MM-DD')

  useEffect(() => {
    async function fetchAircraftData() {
      const data = await getAircraftData();
      setAircraftData(data);
    }

    async function fetchInstructorData(){
      const data = await getInstructorData();
      setInstructorData(data);
    }

    fetchAircraftData();
    fetchInstructorData();
  }, []);

  // Map the aircraft data to JSX elements
  const planes = aircraftData.map((item, index) => (
    <AircraftSection isDay={props.isDay} AircraftName={item.nickName} AircraftId={item.planeId} Day={daystr} key={index} />
  ));

  const instruictors = InstructorData.map((item, index) => (
    <InstructorSelection isDay={props.isDay} InstructorName={item.name} key={index} Day={daystr} InstructorId={item.userId} DayName={dayNames[props.day.day()]}/>
  ));

  return (
    <div className="mainSection">
      {!props.isDay && <p className="dayTextFormating">{dayNames[props.day.day()]}</p>}
      <div className="time-frame">
        {planes}
        {instruictors}
        <InstructorSelection isDay={props.isDay} DayName={dayNames[props.day.day()]} InstructorName={"Gustavo"} Day={daystr} InstructorId="fa2538b5-36b9-4415-b815-826ca2f9200f"/>
      </div>
    </div>
  );
}

export default DayCalendar;