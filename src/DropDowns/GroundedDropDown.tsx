import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export interface GroundedDropDownProps {
    grounded: boolean;
    setGroundedParent: (event: any) => void;
}

function GroundedDropDown(props: GroundedDropDownProps) {

    const [grounded, setGrounded] = useState<boolean>(props.grounded);

    const handleSquawkType = (event: SelectChangeEvent<unknown>) => {
        setGrounded(event.target.value as boolean);
        props.setGroundedParent(event.target.value as boolean);
    }

    return (
        <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
            <InputLabel id="demo-select-small-label">Grounded</InputLabel>
            <Select
                label="Grounded"
                value={grounded} // Set the selected value here
                onChange={handleSquawkType} // Handle change event
            >
                <MenuItem value={true as any}>Yes</MenuItem>
                <MenuItem value={false as any}>No</MenuItem>


            </Select>
        </FormControl>
    );
}

export default GroundedDropDown;