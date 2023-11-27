import "../App.css";
import "./Home.css";
import StaticSidebar from "../Utils/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AllSquawks from "./AllSquawks/AllSquawks";
import { get } from "http";

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
  accountType: string;
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
        <p className="home-page-header">All Squawks</p>
        <AllSquawks planes={planes} />
        {/* <p>
          Proficient Plane Models:{" "}
          <b>{user?.proficientPlaneModels.join(", ")}</b>
        </p> */}
      </div>
    </div>
  );
}

export default Home;
