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
import { ReservationType } from "./ReservationTypeDropDown";

export interface ReservationTypeMultiSelectProps {
    setSelectedTypes: (event: any) => void;
}

export interface DropDownType {
    type: ReservationType;
    display: string;
}
    

export default function ReservationTypeMultiselect(props: ReservationTypeMultiSelectProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const types: DropDownType[] = [
    {type: ReservationType.DualLesson, display: "Dual Lesson"},
    {type: ReservationType.StudentSolo, display: "Student Solo"},
    {type: ReservationType.Checkride, display: "Checkride"},
    {type: ReservationType.StandardReserved, display: "Standard Reserved"},
    {type: ReservationType.AircraftCheckout, display: "Aircraft Checkout"},
    {type: ReservationType.GroundSchool, display: "Ground School"},
    {type: ReservationType.Simulator, display: "Simulator"}
  ]

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedIds(event.target.value as string[]);

    const ids = event.target.value as string[];
    const SelectedType = ids.length > 0
      ? types.filter(type => ids.includes(type.type))
      : types;
       
    props.setSelectedTypes(SelectedType);
  };

  const handleDelete = (value: string) => {
    const ids = selectedIds.filter((item) => item !== value)
    setSelectedIds(ids);
    const selectedTypes = ids.length > 0
      ? types.filter(type => ids.includes(type.type))
      : types;
        
    props.setSelectedTypes(selectedTypes);
  };

  return (
    <FormControl sx={{ m: 1, width: 250
    }}>
       <InputLabel>Reservation Types</InputLabel>
       <Select
           multiple
           value={selectedIds}
           onChange={handleChange}
           input={<OutlinedInput label="Reservation Types" />}
           renderValue={(selected) => (
               <Stack gap={1} direction="row" flexWrap="wrap">
                   {selected.map((value) => {
                   const matchingType = types.find((type) => type.type === value);
                   return (
                       <Chip
                           key={value}
                           label={matchingType ? `${matchingType.display}` : ""}
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
           {types.map((type) => (
               <MenuItem key={type.type} value={type.type}>
                   {type.display}
               </MenuItem>
           ))}
       </Select>
   </FormControl>
  );
}