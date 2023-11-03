import CancelButton from '../Utils/Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../Utils/Buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthorizationContext } from '../AuthContext';
import { response } from 'express';
import "./Logout.css";

export interface LogoutProps {
    open: boolean;
    onClose: () => void;
}


function LogoutPopup(props: LogoutProps) {
    const context = useContext(AuthorizationContext);
    const navigate = useNavigate();

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    interface UserCredentials { 
        UserNameOrEmail: string, 
        password: string 
    };

    const handleLogOut = () => {
        const userCredentials: UserCredentials = { UserNameOrEmail: email, password: password };
        fetch('http://localhost:5201/api/user/authentication/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Success:');
              context.logout();
              navigate('/login');
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle the error, e.g., by showing an error message to the user
          });
      
          navigate('/login');
        onClose();
      }
      

    return (
        <div className="logout-popup">
            <Dialog onClose={handleClose} open={open}
              sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "30%",
                    maxWidth: "57.5vw",
                    height: "25%",
                    maxHeight: "95vh",
                    paddingBottom: "30px",
                    paddingLeft: "30px",
                    paddingRight: "30px"
                  },
                },
              }}>
                <div className="logout-header">
                  <h2>Are you sure that you want to log out?</h2>
                </div>
                {/* Confirm and Cancel Buttons */}
                <div className='FlexRowItem'>
                    <CancelButton text="Logout" onClick={handleLogOut}/>
                    <SecondaryButton text="Cancel" onClick={handleClose}/>
                </div>
            </Dialog>
        </div>
    );
}

export default LogoutPopup;