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
import { Plane } from "../../Calendar/Calendar";

export interface AircraftMultiSelectProps {
    planes: Array<Plane>;
    setSelectedPlanes: (event: any) => void;
}

export default function AircraftMultiSelect(props: AircraftMultiSelectProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        setSelectedIds(event.target.value as string[]);
        console.log(selectedIds)
        const ids = event.target.value as string[];
        const selectedPlanes = ids.length > 0
        ? props.planes.filter(plane => ids.includes(plane.planeId))
        : props.planes;
        console.log(selectedPlanes);
        props.setSelectedPlanes(selectedPlanes);
      };

      const handleDelete = (value: string) => {
        const ids = selectedIds.filter((item) => item !== value)
        setSelectedIds(ids);
        const selectedPlanes = ids.length > 0
        ? props.planes.filter(plane => ids.includes(plane.planeId))
        : props.planes;
        console.log(selectedPlanes);
        props.setSelectedPlanes(selectedPlanes);
      };
      
    return (
        <FormControl sx={{ m: 1, width: 250
         }}>
            <InputLabel>Aircraft</InputLabel>
            <Select
                multiple
                value={selectedIds}
                onChange={handleChange}
                input={<OutlinedInput label="Aircraft" />}
                renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                        {selected.map((value) => {
                        const matchingPlane = props.planes.find((plane) => plane.planeId === value);
                        return (
                            <Chip
                                key={value}
                                label={matchingPlane ? `${matchingPlane.tailNumber} (${matchingPlane.nickName})` : ""}
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
                {props.planes.map((plane) => (
                    <MenuItem key={plane.planeId} value={plane.planeId}>
                        {`${plane.tailNumber} (${plane.nickName})`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
  