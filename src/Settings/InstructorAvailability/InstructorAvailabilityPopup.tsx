import CancelButton from '../../Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../../Buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import InstructorAvailibility from './InstructorAvailability';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export interface InstructorAvailibilityProps {
    open: boolean;
    onClose: () => void;
  }

function InstructorAvailibilityPopup(props: InstructorAvailibilityProps) {

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
                <div className="reservation-time">
                <FormControl sx={{ minWidth: 244 }} size="medium">
                        <InputLabel id="demo-select-small-label">Day</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="day"
                        >
                            <MenuItem>Sunday</MenuItem>
                            <MenuItem>Monday</MenuItem>
                            <MenuItem>Tuesday</MenuItem>
                            <MenuItem>Wednesday</MenuItem>
                            <MenuItem>Thursday</MenuItem>
                            <MenuItem>Friday</MenuItem>
                            <MenuItem>Saturday</MenuItem>
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Start Time" />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="End Time" />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </Dialog>
        </div>
    );
}

export default InstructorAvailibilityPopup;