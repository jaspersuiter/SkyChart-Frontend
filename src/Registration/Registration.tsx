import './Registration.css'

import TextField from '@mui/material/TextField';
import PrimaryButton from '../Buttons/PrimaryButton';


function Registration() {
  return (
    <div className="register-page">
      <div className="register-form">
        <div className='TitleBar'>
          <h2 style={{fontSize: 35}}>SkyChart</h2>
        </div>
        <div className='TextFieldBar'>
            <h5 style={{fontSize: 18}}>Enter Name</h5>
        </div>
        <div className="FlexColumnItem">
          <TextField id="name" label="Name" type="name" required fullWidth />
        </div>
        <div className='TextFieldBar'>
            <h5 style={{fontSize: 18}}>Enter Email</h5>
        </div>
        <div className="FlexColumnItem">
          <TextField id="email" label="Email" type="email" required fullWidth />
        </div>
        <div className='TextFieldBar'>
            <h5 style={{fontSize: 18}}>Enter Password</h5>
        </div>
        <div className="FlexColumnItem">
          <TextField id="password" label="Password" type="password" required fullWidth />
        </div>
        <div className='TextFieldBar'>
            <h5 style={{fontSize: 18}}>Confirm Password</h5>
        </div>
        <div className="FlexColumnItem">
          <TextField id="confirm_password" label="Confirm Password" type="password" required fullWidth />
        </div>
        <div className='TextFieldBar'>
            <h5 style={{fontSize: 18}}>Enter Address</h5>
        </div>
        <div className="FlexColumnItem">
          <TextField id="address" label="Address" type="address" required fullWidth />
        </div>
        <div className='TextFieldBar'>
            <h5 style={{fontSize: 18}}>Enter Emergency Contact Name</h5>
        </div>
        <div className="FlexColumnItem">
          <TextField id="ec_name" label="Emergency Contact Name" type="name" required fullWidth />
        </div>
        <div className='TextFieldBar'>
            <h5 style={{fontSize: 18}}>Enter Emergency Contact Phone Number</h5>
        </div>
        <div className="FlexColumnItemPadded">
          <TextField id="ec_phone" label="Emergency Contact Phone Number" type="Phone Number" required fullWidth />
        </div>
        <div className="FlexColumnItem">
          <PrimaryButton text="Create Account" width="100%" />
        </div>
      </div>
    </div>
  );
}

export default Registration;