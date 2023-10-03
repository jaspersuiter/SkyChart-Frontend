import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './Calendar/Calendar';
import Settings from './Settings/Settings';
import Logout from '@mui/icons-material/Logout';
import Aircraft from './Aircraft/Aircraft'; 
import Admin from './Admin/Admin';
import Instructors from './Instructors/Instructors';
import Login from './Login/Login';
import Registration from './Registration/Registration';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <React.Fragment>
            <Route path='/calendar' element={<Calendar/>} />
            <Route path='/aircraft' element={<Aircraft/>} />
            <Route path='/instructors' element={<Instructors/>} />
            <Route path='/settings' element={<Settings/>} />
            <Route path="/" element={<Navigate to='/calendar'/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path='/admin' element={<Admin/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Registration/>} />
          </React.Fragment>
    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
