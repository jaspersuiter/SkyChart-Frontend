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
import VerificationPage from "./Verification/verification";
import Admin from "./Admin/Admin";
import Instructors from "./Instructors/Instructors";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import { AuthorizationContext } from "./AuthContext";

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
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/aircraft" element={<Aircraft />} />
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/calendar" />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/verify" element={<VerificationPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/register" element={<Registration />} />
            </React.Fragment>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
