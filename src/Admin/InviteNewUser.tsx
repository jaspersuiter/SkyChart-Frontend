
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import PrimaryButton from '../Buttons/PrimaryButton';
import { Dialog } from '@mui/material';
import CancelButton from '../Buttons/CancelButton';

export interface InviteNewUserProps {
    open: boolean;
    onClose: () => void;
  }

function InviteNewUser(props: InviteNewUserProps) {

    const navigate = useNavigate();

    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
      };

    const handleLogOut = () => {
        onClose();
    }

    return (
        <div className="invite-new-user-popup">
          <Dialog onClose={handleClose} open={open}>
            <h2>SkyChart</h2>
            <p>Invite an instructor, student, or pilot to join SkyChart</p>
            <form>
              <TextField id="email" label="Email" type="email" required />
            </form>
            <br/>
            <div className='invite-new-user-buttons' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '16px' }}>
              <PrimaryButton text="Send Invatation" />
              <CancelButton text="Cancel" onClick={handleClose}/>
            </div>
          </Dialog>
        </div>
    );
}

export default InviteNewUser;