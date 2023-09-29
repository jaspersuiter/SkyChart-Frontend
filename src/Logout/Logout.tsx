import CancelButton from '../Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../Buttons/SecondaryButton';

export interface LogoutProps {
    open: boolean;
    onClose: () => void;
  }

function LogoutPopup(props: LogoutProps) {

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
      };

    return (
        <div className="logout-popup">
            <Dialog onClose={handleClose} open={open}>
                <h1>Are you sure that you want to log out?</h1>
                
                {/* Confirm and Cancel Buttons */}
                <div className="reservation-buttons">
                    <SecondaryButton text="Cancel"/>
                    <CancelButton text="Logout" onClick={handleClose}/>
                </div>
            </Dialog>
        </div>
    );
}

export default LogoutPopup;