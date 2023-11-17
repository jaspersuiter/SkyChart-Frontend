import React, { useContext, useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

import Calendar from "./Calendar/Calendar";
import Settings from "./Settings/Settings";
import Logout from "@mui/icons-material/Logout";
import Aircraft from "./Aircraft/Aircraft";
import Verification from "./Registration/Verification/verification";
import Admin from "./Admin/Admin";
import Instructors from "./Instructors/Instructors";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import { AuthorizationContext } from "./AuthContext";
import ResetPassword from "./Login/ResetPassword/ResetPassword";
import NewPassword from "./Login/NewPassword/NewPassword";
import Home from "./Home/Home";
import AircraftHome from "./Aircraft/AircraftHome";

function App() {
  const context = useContext(AuthorizationContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          {!context.authorization ? (
            <React.Fragment>
              <Route path="*" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/resetPassword" element={<NewPassword />} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/home" element={<Home />} />
              <Route path="/aircraft/*" element={<AircraftHome />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/resetPassword" element={<NewPassword />} />
            </React.Fragment>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
