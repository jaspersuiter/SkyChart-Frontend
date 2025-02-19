import "./Login.css";

import TextField from "@mui/material/TextField";
import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../AuthContext";
import React from "react";
import ResetPassword from "./ResetPassword/ResetPassword";

function Login() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const context = useContext(AuthorizationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  interface UserCredentials {
    UserNameOrEmail: string;
    password: string;
  }

  const navigate = useNavigate();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    const userCredentials: UserCredentials = {
      UserNameOrEmail: email,
      password: password,
    };
    fetch("http://localhost:5201/api/authentication/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.verified === true) {
          console.log("Success:", data);
          context.login();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Incorrect Username or Password. Please try again.");
      });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-page">
      <div className="login-image" />
      <div className="login-form">
        <div className="login-title-bar">
          <p style={{ fontSize: 36 }}>SkyChart</p>
        </div>
        <div className="TextFieldBar">
          <h5 style={{ fontSize: 18 }}>Email</h5>
        </div>
        <div className="FlexColumnItem">
          <TextField
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter') {
                console.log('Give me a kiss Ben');
              }
            }}
            onChange={handleEmailChange}
            fullWidth
          />
        </div>
        <div className="TextFieldBar">
          <h5 style={{ fontSize: 18 }}>Password</h5>
        </div>
        <div className="FlexColumnItemPadded">
          <TextField
            id="password"
            label="Password"
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </div>
        <div className="FlexColumnItem">
          <PrimaryButton text="Log in" onClick={handleLogin} width="100%" />
        </div>
        <br />
        <div className="ResetPasswordText">
          <a onClick={handleClickOpen}>
            <u>Reset your Password</u>
          </a>
          <ResetPassword open={open} onClose={handleClose} />
        </div>
      </div>
    </div>
  );
}

export default Login;
