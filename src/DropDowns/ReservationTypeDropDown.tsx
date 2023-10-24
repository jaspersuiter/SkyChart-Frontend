import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export interface ReservationTypeSelectionProps {
    ReservationType: ReservationType;
    setReservationTypeParent: (event: any) => void;
}

export enum ReservationType {
    DualLesson = "DualLesson",
    StudentSolo = "StudentSolo",
    Checkride = "Checkride",
    StandardReserved = "StandardReserved",
    AircraftCheckout = "AircraftCheckout",
    GroundSchool = "GroundSchool",
}

function ReservationTypeDropDown ( props: ReservationTypeSelectionProps) {

    const [reservationType, setReservationType] = useState<ReservationType>(props.ReservationType);

    const handleReservationType = (event: SelectChangeEvent<unknown>) => {
        setReservationType(event.target.value as ReservationType);
        props.setReservationTypeParent(event.target.value as ReservationType);
    } 

    return (
        <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
            <InputLabel id="demo-select-small-label">Reservation Type</InputLabel>
            <Select
                label="Reservation Type"
                value={reservationType} // Set the selected value here
                onChange={handleReservationType} // Handle change event
            >
                <MenuItem value={ReservationType.DualLesson}>Dual Lesson</MenuItem>
                <MenuItem value={ReservationType.StudentSolo}>Student Solo</MenuItem>
                <MenuItem value={ReservationType.Checkride}>Checkride</MenuItem>
                <MenuItem value={ReservationType.StandardReserved}>Standard Reserved</MenuItem>
                <MenuItem value={ReservationType.AircraftCheckout}>Aircraft Checkout</MenuItem>
            </Select>
        </FormControl>
    );
}

export default ReservationTypeDropDown;