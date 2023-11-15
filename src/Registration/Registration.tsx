import "./Registration.css";

import TextField from "@mui/material/TextField";
import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import React from "react";
import { makeApiCall } from "../APICall";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [userName, setUserName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_password, setConfirmPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [ec_name, setECName] = React.useState("");
  const [ec_phone, setECPhone] = React.useState("");

  const [errormessage, setErrormessage] = React.useState("");

  const validpassword = password === confirm_password;
  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\d{9}$/;

    return phoneRegex.test(phoneNumber);
  };
  const isDisabled = !(
    email &&
    password &&
    confirm_password &&
    firstName &&
    lastName &&
    phone &&
    address &&
    ec_name &&
    ec_phone &&
    validpassword
  );

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/calendar");
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
      emergencyContactPhoneNumber: ec_phone,
    };

    const params = {
      token: token,
    };

    let responseData2 = null;
    try {
      responseData2 = await makeApiCall(
        "/api/register/confirm-new-user",
        data,
        "post",
        params
      );

      console.log(responseData2);

      if (
        responseData2 ===
        "Invalid verification. Please see your system administrator for access."
      ) {
        setErrormessage(responseData2);
        return;
      }
    } catch (error) {
      console.error(error);
    }
    goToLogin();
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <div className="TitleBar">
          <h2 style={{ fontSize: 35 }}>SkyChart</h2>
        </div>

        <div className="FlexColumnItem">
          <TextField
            id="username"
            label="Username"
            type="name"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="FlexColumnItem">
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="FlexColumnItem">
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="FlexColumnItem">
          <TextField
            id="confirm_password"
            label="Confirm Password"
            type="password"
            value={confirm_password}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        {validpassword ? null : <p className="error">Passwords do not match</p>}

        <div className="FlexColumnItem">
          <TextField
            id="first name"
            label="First Name"
            type="name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="FlexColumnItem">
          <TextField
            id="last name"
            label="Last Name"
            type="name"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="FlexColumnItem">
          <TextField
            id="phone"
            label="Phone Number"
            type="Phone Number"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="FlexColumnItem">
          <TextField
            id="address"
            label="Address"
            type="Address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="FlexColumnItem">
          <TextField
            id="ec_name"
            label="Emergency Contact Name"
            type="name"
            value={ec_name}
            onChange={(event) => {
              setECName(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="FlexColumnItemPadded">
          <TextField
            id="ec_phone"
            label="Emergency Contact Phone Number"
            type="Phone Number"
            value={ec_phone}
            onChange={(event) => {
              setECPhone(event.target.value);
            }}
            required
            fullWidth
          />
        </div>

        <div className="error-message">{errormessage}</div>

        <div className="FlexColumnItem">
          <PrimaryButton
            text="Create Account"
            width="100%"
            disabled={isDisabled}
            onClick={registerUser}
          />
        </div>
      </div>
    </div>
  );
}

export default Registration;
