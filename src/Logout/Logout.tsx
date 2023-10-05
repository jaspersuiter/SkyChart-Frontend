import CancelButton from '../Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { getLoggedIn, setLoggedIn } from '../Login/isLoggedIn';

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
        setLoggedIn(false); // update state variable
        navigate('/login');
        onClose();
    }

    return (
        <div className="logout-popup">
            <Dialog onClose={handleClose} open={open}>
                <h1>Are you sure that you want to log out?</h1>
                
                {/* Confirm and Cancel Buttons */}
                <div className="reservation-buttons" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '16px' }}>
                    <CancelButton text="Logout" onClick={handleLogOut}/>
                    <SecondaryButton text="Cancel" onClick={handleClose}/>
                </div>
            </Dialog>
        </div>
    );
}

export default LogoutPopup;