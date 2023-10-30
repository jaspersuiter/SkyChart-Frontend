import './Registration.css'

import TextField from '@mui/material/TextField';
import PrimaryButton from '../Buttons/PrimaryButton';
import React from 'react';
import { makeApiCall } from '../APICall';
import { useNavigate } from 'react-router-dom';


function Registration() {

  const [userName, setUserName] = React.useState(''); 
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm_password, setConfirmPassword] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [ec_name, setECName] = React.useState('');
  const [ec_phone, setECPhone] = React.useState('');

  const [errormessage, setErrormessage] = React.useState('')

  const validpassword = password === confirm_password;
  const isDisabled = !(email && password && confirm_password && firstName && lastName && phone && address && ec_name && ec_phone && validpassword);
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const verificationCode = urlParams.get('verificationCode')

  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/calendar'); 
  };

  const registerUser = async () => {

    const data = {
        username: userName,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        address: address,
        emergencyContactName: ec_name,
        emergencyContactPhoneNumber: ec_phone
    }

    const params = {
      verificationCode: verificationCode,
    }

    let responseData2 = null
    try {
        responseData2 = await makeApiCall("/api/user/register", data, "post", params)

        console.log(responseData2)
        
        if (responseData2 === "Invalid verification. Please see your system administrator for access."){
            setErrormessage(responseData2)
            return
        }
    } catch (error) {
        console.error(error)
    }
    goToLogin()
  }


  return (
    <div className="register-page">
      <div className="register-form">
        <div className='TitleBar'>
          <h2 style={{fontSize: 35}}>SkyChart</h2>
        </div>

        <div className='FlexColumnItem'>
          <h5 className='h5'>Enter Username</h5>
          <TextField id="username" 
            label="Username" 
            type="name" 
            value={userName} 
            onChange={(event) => {setUserName(event.target.value)}} 
            required fullWidth />
        </div>

        <div className="FlexColumnItem">
          <h5 className='h5'>Enter Email</h5>
          <TextField id="email" 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(event) => {setEmail(event.target.value)}} 
            required fullWidth />
        </div>

        <div className="FlexColumnItem">
          <h5 className='h5'>Enter Password</h5>
          <TextField id="password" 
            label="Password" 
            type="password"
            value={password}
            onChange={(event) => {setPassword(event.target.value)}} 
            required fullWidth />

        </div>

        <div className="FlexColumnItem">
          <h5 className='h5'>Confirm Password</h5>
          <TextField id="confirm_password" 
            label="Confirm Password" 
            type="password"
            value={confirm_password}
            onChange={(event) => {setConfirmPassword(event.target.value)}} 
            required fullWidth />
        </div>

        {validpassword ? null : <p className='error'>Passwords do not match</p>}

        <div className="FlexColumnItem">
          <h5 className='h5'>Enter First Name</h5>
          <TextField id="first name" 
            label="First Name" 
            type="name" 
            value={firstName} 
            onChange={(event) => {setFirstName(event.target.value)}} 
            required fullWidth />
        </div>

        <div className="FlexColumnItem">
          <h5 className='h5'>Enter Last Name</h5>
          <TextField id="last name" 
            label="Last Name" 
            type="name" 
            value={lastName} 
            onChange={(event) => {setLastName(event.target.value)}} 
            required fullWidth />
        </div>

        <div className="FlexColumnItem">
          <h5 className='h5'>Enter Phone Number</h5>
          <TextField id="phone" 
            label="Phone Number" 
            type="Phone Number" 
            value={phone} 
            onChange={(event) => {setPhone(event.target.value)}} 
            required fullWidth />
        </div>

        <div className="FlexColumnItem">
          <h5 className='h5'>Enter Address</h5>
          <TextField id="address" 
            label="Address" 
            type="Address" 
            value={address}
            onChange={(event) => {setAddress(event.target.value)}}
            required fullWidth />  
        </div>

        <div className="FlexColumnItem">
          <h5 className='h5'>Enter Emergency Contact Name</h5>
          <TextField id="ec_name" 
            label="Emergency Contact Name" 
            type="name" 
            value={ec_name}
            onChange={(event) => {setECName(event.target.value)}}
           required fullWidth />
        </div>

        <div className="FlexColumnItemPadded">
          <h5 className='h5'>Enter Emergency Contact Phone Number</h5>
          <TextField id="ec_phone" 
            label="Emergency Contact Phone Number" 
            type="Phone Number" 
            value={ec_phone}
            onChange={(event) => {setECPhone(event.target.value)}}
            required fullWidth />
        </div>

        <div className='error-message'>
          {errormessage}
        </div>

        <div className="FlexColumnItem">
          <PrimaryButton text="Create Account" width="100%" disabled={isDisabled} onClick={registerUser}/>
        </div>
      </div>
    </div>
  );
}

export default Registration;