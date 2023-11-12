import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import { Dialog } from "@mui/material";
import CancelButton from "../../Utils/Buttons/CancelButton";
import React from "react";
import { makeApiCall } from "../../APICall";

export interface InviteNewUserProps {
  open: boolean;
  onClose: () => void;
}

function InviteNewUser(props: InviteNewUserProps) {
  const [email, setEmail] = React.useState("");
  const { open, onClose } = props;
  const [errormessage, setErrormessage] = React.useState("");

  const handleClose = () => {
    onClose();
  };

  const handleLogOut = () => {
    onClose();
  };

  const resetAll = () => {
    setEmail("");
    setErrormessage("");
    handleClose();
  };

  const createNewUser = async () => {
    const params = {
      email: email,
    };
    try {
      const responseData2 = await makeApiCall(
        "/api/register/register-user",
        params,
        "post"
      );

      if (responseData2 === "User already exists") {
        setErrormessage(responseData2);
        return;
      } else if (responseData2 === "Invalid Email") {
        setErrormessage(responseData2);
        return;
      }
      resetAll();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="invite-new-user-popup">
      <Dialog onClose={handleClose} open={open}>
        <h2>SkyChart</h2>
        <p>Invite an instructor, student, or pilot to join SkyChart</p>
        <form>
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </form>
        <br />
        <div className="error-message">{errormessage}</div>
        <div
          className="invite-new-user-buttons"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <PrimaryButton text="Send Invatation" onClick={createNewUser} />
          <CancelButton text="Cancel" onClick={handleClose} />
        </div>
      </Dialog>
    </div>
  );
}

export default InviteNewUser;
