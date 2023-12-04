import "../App.css";
import "./Home.css";
import StaticSidebar from "../Utils/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AllSquawks from "../Aircraft/AllSquawks/AllSquawks";
import { get } from "http";
import HomePageSquawks from "./HomePageSquawks/HomePageSquawks";
import { Navigate, useNavigate } from "react-router-dom";
import CurrentWeather from "../Weather/CurrentWeather";
import HomePageNotices from "./HomePageNotices/HomePageNotices";
import HomePageReservations from "./HomePageReservations/HomePageReservations";

export interface Plane {
  planeId: string;
  nickName: string;
  tailNumber: string;
}

export interface Instructor {
  userId: string;
  name: string;
}

function Home() {
  // Get All Planes
  const [planes, setPlanes] = useState<Plane[]>([]);
  const getPlanes = async () => {
    try {
      const planeFetch = (await fetch(
        `http://localhost:5201/api/plane/get-all`,
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => data)) as Array<Plane>;
      setPlanes(planeFetch);
    } catch (error) {
      console.log(error);
    }
  };

  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const getInstructors = async () => {
    try {
      const instructorFetch = (await fetch(
        `http://localhost:5201/api/instructor/get-all`,
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => data)) as Array<Instructor>;
      setInstructors(instructorFetch);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlanes();
    getInstructors();
  }, []);

  return (
    <div className="home-page">
      <StaticSidebar />
      <div className="home-page-content">
        <div className="home-page-row-content">
          <div className="home-page-corner">
            <p className="home-page-header">Upcoming Reservations</p>
            <HomePageReservations planes={planes} instructors={instructors}/>
          </div>
          <div className="home-page-corner">
            <CurrentWeather />
          </div>
        </div>
        <div className="home-page-row-content">
          <div className="home-page-corner">
            <p className="home-page-header">General Notices</p>
            <HomePageNotices />
          </div>
          <div className="home-page-corner">
            <p className="home-page-header">Squawks</p>
            <HomePageSquawks planes={planes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
