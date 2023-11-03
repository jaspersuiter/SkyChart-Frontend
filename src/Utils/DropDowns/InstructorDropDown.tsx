import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Instructor } from "../../Calendar/Calendar";
import { useState } from "react";

export interface InstructorSelectionProps {
    Instructors: Array<Instructor>;
    InstructorId: string;
    setInstructorIdParent: (event: any) => void;
}

function InstructorDropDown ( props: InstructorSelectionProps) {

    const [InstructorId, setInstructorId] = useState(props.InstructorId);

    const handleInstructorId = (event: SelectChangeEvent) => {
        setInstructorId(event.target.value as string);
        props.setInstructorIdParent(event.target.value as string);
      } 

    return (
        <FormControl sx={{ m: 2, minWidth: 240 }} size="small">
            <InputLabel id="demo-select-small-label">Instructor</InputLabel>
            <Select
                label="instructor"
                value={InstructorId}
                onChange={handleInstructorId}
            >
                {props.Instructors.map((instructor) => (
                    <MenuItem key={instructor.userId} value={instructor.userId}>
                        {instructor.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default InstructorDropDown;