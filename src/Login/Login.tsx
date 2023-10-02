import './Login.css'

import TextField from '@mui/material/TextField';
import PrimaryButton from '../Buttons/PrimaryButton';


function Login() {
  

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>SkyChart</h2>
        <form>
          <TextField id="email" label="Email" type="email" required />
        </form>
        <br/>
        <form>
          <TextField id="password" label="Password" type="password" required />
        </form>
        <br/>
        <PrimaryButton text="Log in" />
      </div>
    </div>
  );
}

export default Login;