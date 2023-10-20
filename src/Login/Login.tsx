import './Login.css'

import TextField from '@mui/material/TextField';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthorizationContext } from '../AuthContext';
import React from 'react';
import ResetPassword from './ResetPassword/ResetPassword';


function Login() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  const context = useContext(AuthorizationContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  interface UserCredentials { 
    UserNameOrEmail: string, 
    password: string 
  };

  const navigate = useNavigate();
  
  const handleLogin = () => {
   
    const userCredentials: UserCredentials = { UserNameOrEmail: email, password: password };
    fetch('http://localhost:5201/api/user/authentication/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials), 
    })
      .then(response => response.json())
      .then(data => {
        
        if (data.verified === true) { 
          console.log('Success:', data);
          context.login();
          navigate('/calendar');
        }
        
      })
      .catch(error => {
        console.error(error);
        alert('Incorrect Username or Password. Please try again.');
      });
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>SkyChart</h2>
        <form>
          <TextField id="email" label="Email" type="email" required value={email} onChange={handleEmailChange} />
        </form>
        <br/>
        <form>
          <TextField id="password" label="Password" type="password" required value={password} onChange={handlePasswordChange}/>
        </form>
        <br/>
        <PrimaryButton text="Log in" onClick={handleLogin}/>
        <a onClick={handleClickOpen}><u>Reset your Password</u></a>
        <ResetPassword open={open} onClose={handleClose} />
      </div>
    </div>
  );
}

export default Login;