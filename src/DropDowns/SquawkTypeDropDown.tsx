import { useState } from "react";
import { SquawkType } from "../Aircraft/AircraftPopup";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export interface SquawkTypeSelectionProps {
    SquawkType: SquawkType;
    setSquawkTypeParent: (event: any) => void;
}

function SquawkTypeDropdown(props: SquawkTypeSelectionProps) {

    const [squawkType, setSquawkTypw] = useState<SquawkType>(props.SquawkType);

    const handleSquawkType = (event: SelectChangeEvent<unknown>) => {
        setSquawkTypw(event.target.value as SquawkType);
        props.setSquawkTypeParent(event.target.value as SquawkType);
    }

    return (
        <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
            <InputLabel id="demo-select-small-label">Squawk Type</InputLabel>
            <Select
                label="Squawk Type"
                value={squawkType} // Set the selected value here
                onChange={handleSquawkType} // Handle change event
            >
                <MenuItem value={SquawkType.planned}>Planned</MenuItem>
                <MenuItem value={SquawkType.unplanned}>Unplanned</MenuItem>
                <MenuItem value={SquawkType.hundredhr}>100hr</MenuItem>
                <MenuItem value={SquawkType.annual}>Annual</MenuItem>

            </Select>
        </FormControl>
    );
}

export default SquawkTypeDropdown;