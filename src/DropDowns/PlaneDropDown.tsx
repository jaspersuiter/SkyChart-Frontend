import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Plane } from "../Calendar/Calendar";
import { useState } from "react";

export interface PlanceSelectionProps {
    Planes: Array<Plane>;
    PlaneID: string;
    SetPlaneIdParent: (event: any) => void;
}

function PlaneDropDown ( props: PlanceSelectionProps) {

    const [PlaneId, setPlaneId] = useState(props.PlaneID);

    const handlePlaneId = (event: SelectChangeEvent) => {
        setPlaneId(event.target.value as string);
        props.SetPlaneIdParent(event.target.value as string);
      } 

    return (
        <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
            <InputLabel id="demo-select-small-label">Aircraft</InputLabel>
            <Select
                label="Aircraft"
                value={PlaneId}
                onChange={handlePlaneId}
            >
                {props.Planes.map((plane) => (
                    <MenuItem key={plane.planeId} value={plane.planeId}>
                        {`${plane.tailNumber} (${plane.nickName})`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default PlaneDropDown;