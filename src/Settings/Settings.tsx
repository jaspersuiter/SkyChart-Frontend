import './Settings.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PrimaryButton from '../Buttons/PrimaryButton';
import CancelButton from '../Buttons/CancelButton';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import StaticSidebar from '../Sidebar/Sidebar';
import SecondaryButton from '../Buttons/SecondaryButton';

function Settings() {
    return (
        <div className="settings-page">
            <StaticSidebar />
            <div className="settings-content">
                <div className="settings-top-content">
                    <FormControl sx={{ minWidth: 240 }} size="small">
                        <InputLabel id="demo-select-small-label">Preferred Instructor</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="instructor"
                        >
                            <MenuItem>Tiark Rompf</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 240 }} size="small">
                        <InputLabel id="demo-select-small-label">Preferred Aircraft</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="aircraft"
                        >
                            <MenuItem>Boeing 747</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="confirm-button">
                        <PrimaryButton text="Confirm Changes" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;