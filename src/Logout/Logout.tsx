import CancelButton from '../Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';

export interface LogoutProps {
    open: boolean;
    onClose: () => void;
  }

function LogoutPopup(props: LogoutProps) {

    const navigate = useNavigate();

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
      };

    const handleLogOut = () => {
        onClose();
    }

    return (
        <div className="logout-popup">
            <Dialog onClose={handleClose} open={open}>
                <h1>Are you sure that you want to log out?</h1>
                
                {/* Confirm and Cancel Buttons */}
                <div className="reservation-buttons">
                    <SecondaryButton text="Cancel" onClick={handleClose}/>
                    <CancelButton text="Logout" onClick={handleLogOut}/>
                </div>
            </Dialog>
        </div>
    );
}

export default LogoutPopup;