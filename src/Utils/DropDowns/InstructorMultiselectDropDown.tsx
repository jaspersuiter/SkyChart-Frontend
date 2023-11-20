import React, { useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
  SelectChangeEvent
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Instructor, Plane } from "../../Calendar/Calendar";

export interface InstructorMultiSelectProps {
    instructors: Array<Instructor>;
    setSelectedInstructors: (event: any) => void;
}

export default function InstructorMultiselect(props: InstructorMultiSelectProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedIds(event.target.value as string[]);

    const ids = event.target.value as string[];
    const SelectedInstructor = ids.length > 0
      ? props.instructors.filter(instructor => ids.includes(instructor.userId))
      : props.instructors;
       
    props.setSelectedInstructors(SelectedInstructor);
  };

  const handleDelete = (value: string) => {
    const ids = selectedIds.filter((item) => item !== value)
    setSelectedIds(ids);
    const selectedInstructor = ids.length > 0
      ? props.instructors.filter(instructor => ids.includes(instructor.userId))
      : props.instructors;
        
    props.setSelectedInstructors(selectedInstructor);
  };

  return (
    <FormControl sx={{ m: 1, width: 250
    }}>
       <InputLabel>Instructors</InputLabel>
       <Select
           multiple
           value={selectedIds}
           onChange={handleChange}
           input={<OutlinedInput label="Instructors" />}
           renderValue={(selected) => (
               <Stack gap={1} direction="row" flexWrap="wrap">
                   {selected.map((value) => {
                   const matchingInstructor = props.instructors.find((instructor) => instructor.userId === value);
                   return (
                       <Chip
                           key={value}
                           label={matchingInstructor ? `${matchingInstructor.name}` : ""}
                           onDelete={() => handleDelete(value)}
                           deleteIcon={
                       <CancelIcon
                           onMouseDown={(event) => event.stopPropagation()}
                       />
             }
           />
         );
       })}
               </Stack>
           )}
       >
           {props.instructors.map((instructor) => (
               <MenuItem key={instructor.userId} value={instructor.userId}>
                   {instructor.name}
               </MenuItem>
           ))}
       </Select>
   </FormControl>
  );
      
      
}
  