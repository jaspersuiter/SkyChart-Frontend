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

export interface Plane {
  planeId: string;
  nickName: string;
  tailNumber: string;
}
interface User {
  id: number;
  lastName: string;
  firstName: string;
  phoneNum: string;
  email: string;
  type: string;
  username: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  preferredInstructor: string;
  preferredPlanes: string[];
  proficientPlaneModels: string[];
}

function Home() {
  // Get All Planes
  const [planes, setPlanes] = useState<Plane[]>([]);
  const [user, setUser] = useState<User>();
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

  const getUser = async () => {
    try {
      const user = await fetch(`http://localhost:5201/api/user/get-current`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data);
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlanes();
    getUser();
  }, []);

  return (
    <div className="home-page">
      <StaticSidebar />
      <div className="home-page-content">
        <div className="home-page-row-content">
          <div className="home-page-corner">
            <p className="home-page-header">Upcoming Reservations</p>
          </div>
          <div className="home-page-corner">
            <CurrentWeather />
          </div>
        </div>
        <div className="home-page-row-content">
          <div className="home-page-corner">
            <p className="home-page-header">General Notices</p>
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
