import CancelButton from "../../Utils/Buttons/CancelButton";
import Dialog from "@mui/material/Dialog";
import SecondaryButton from "../../Utils/Buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthorizationContext } from "../../AuthContext";
import { response } from "express";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import "./ResetPassword.css";
import { TextField } from "@mui/material";
import { env } from "../../env";

export interface ResetPasswordProps {
  open: boolean;
  onClose: () => void;
}

function ResetPassword(props: ResetPasswordProps) {
  const { open, onClose } = props;
  const [email, setEmail] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleRequestReset = () => {
    fetch(`${env.SKYCHART_API_URL}/api/password/send-reset?email=${email}`, {
      credentials: "include",
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="logout-popup">
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "32em",
              height: "100%",
              maxHeight: "20em",
              padding: "1em",
              backgroundColor: "#D3D3D3",
            },
          },
        }}
      >
        <div className="reset-password-content">
          <p className="reset-password-text">
            Please enter the email associated with your account
          </p>

          <TextField
            id="Email"
            label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            sx={{
              width: "21em",
              margin: "2em",
            }}
          />

          <div className="reset-password-button">
            <PrimaryButton
              onClick={() => handleRequestReset()}
              text="Request Password Reset"
            />
          </div>
          <a onClick={() => handleClose()}>
            <u className="reset-password-link-text">Return to Log In</u>
          </a>
        </div>
      </Dialog>
    </div>
  );
}

export default ResetPassword;
