import CancelButton from '../../Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../../Buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthorizationContext } from '../../AuthContext';
import { response } from 'express';
import PrimaryButton from '../../Buttons/PrimaryButton';
import './ResetPassword.css';
import { TextField } from '@mui/material';

export interface ResetPasswordProps {
    open: boolean;
    onClose: () => void;
  }

function ResetPassword(props: ResetPasswordProps) {
    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    const [email, setEmail] = useState('');

    return (
        <div className="logout-popup">
            <Dialog onClose={handleClose} open={open} sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "32em",
                    height: "100%",
                    maxHeight: "20em",
                    padding: "1em",
                    backgroundColor: "#D3D3D3"
                  },
                },
              }}>
                <div className="reset-password-content">
                  <p className="reset-password-text">
                    Please enter the email associated with your account
                  </p>

                  <TextField id="Email" 
                              label="Email" 
                              value={email} 
                              onChange={(event) => {setEmail(event.target.value)}}
                              sx={{
                                width: "21em",
                                margin: "2em"
                              }}
                />

                  <div className="reset-password-button">
                      <PrimaryButton text="Request Password Reset"/>
                  </div>
                  <a onClick={()=>handleClose()}><u className="reset-password-link-text">Return to Log In</u></a>
                </div>
            </Dialog>
        </div>
    );
}

export default ResetPassword;