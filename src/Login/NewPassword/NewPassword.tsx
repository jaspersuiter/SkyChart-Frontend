import './NewPassword.css';

import TextField from '@mui/material/TextField';
import PrimaryButton from '../../Utils/Buttons/PrimaryButton';
import { useContext, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import React from 'react';



function NewPassword() {

  const [password, setPassword] = useState('');
  const  params  = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  
  const handleNewPassword = () => {
    fetch(`http://localhost:5201/api/user/password/reset?userId=${params.get('userId')}`, {credentials: 'include', method: 'PUT', headers: {'Content-Type': 'application/json'} , body: JSON.stringify({newPassword: password})})
      .then(response => response.json())
      .then(data => {
        
       
          console.log('Success:', data);
          navigate('/login');
 
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <div className="new-password-page">
      <div className="new-password-form">
        <div className='TitleBar'>
          <h2 style={{fontSize: 35}}>SkyChart</h2>
        </div>
        <div className='TextFieldBar'>
          <h5 style={{fontSize: 18}}>Enter New Password</h5>
        </div>
        <div className="FlexColumnItem">
          <TextField id="password" label="Password" type="password" required value={password} onChange={handlePasswordChange} fullWidth />
          <br/>
        </div>
        <br/>
        <div className="FlexColumnItem">
          <PrimaryButton text="Reset Password" onClick={handleNewPassword} width="100%" />
        </div>
      </div>
    </div>
  );
}

export default NewPassword;