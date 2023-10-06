import './Registration.css'

import TextField from '@mui/material/TextField';
import PrimaryButton from '../Buttons/PrimaryButton';


function Registration() {
  return (
    <div className="register-page">
      <div className="register-form">
        <h2>SkyChart</h2>
        <form>
          <TextField id="name" label="Name" type="name" required />
        </form>
        <br/>
        <form>
          <TextField id="email" label="Email" type="email" required />
        </form>
        <br/>
        <form>
          <TextField id="password" label="Password" type="password" required />
        </form>
        <br/>
        <form>
          <TextField id="confirm_password" label="Confirm Password" type="password" required />
        </form>
        <br/>
        <form>
          <TextField id="address" label="Address" type="address" required />
        </form>
        <br/>
        <form>
          <TextField id="ec_name" label="Emergency Contact Name" type="name" required />
        </form>
        <br/>
        <form>
          <TextField id="ec_phone" label="Emergency Contact Phone Number" type="phone number" required />
        </form>
        <br/>
        <PrimaryButton text="Create Account" />
      </div>
    </div>
  );
}

export default Registration;