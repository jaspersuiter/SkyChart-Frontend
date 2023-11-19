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

const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn"
];

export default function MultiSelect() {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        setSelectedNames(event.target.value as string[]);
        console.log("Updated string:", event.target.value);
      };
    return (
        <FormControl sx={{ m: 1, width: 500 }}>
            <InputLabel>Multiple Select</InputLabel>
            <Select
                multiple
                value={selectedNames}
                onChange={handleChange}
                input={<OutlinedInput label="Multiple Select" />}
                renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                onDelete={() =>
                                    setSelectedNames(
                                        selectedNames.filter((item) => item !== value)
                                    )
                                }
                                deleteIcon={
                                    <CancelIcon
                                        onMouseDown={(event) => event.stopPropagation()}
                                    />
                                }
                            />
                        ))}
                    </Stack>
                )}
            >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
  