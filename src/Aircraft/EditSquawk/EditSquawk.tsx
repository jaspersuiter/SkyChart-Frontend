import { Checkbox, Dialog, FormControlLabel, FormGroup, TextField } from "@mui/material";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import CloseIcon from "@mui/icons-material/Close";
import "../AddSquawkPopup/AddSquawkPopup";
import SquawkTypeDropdown from "../../Utils/DropDowns/SquawkTypeDropDown";
import { useEffect, useState } from "react";
import { SquawkType } from "../AircraftPopup/AircraftPopup";
import GroundedDropDown from "../../Utils/DropDowns/GroundedDropDown";
import SquawkInfo from "../AllSquawks/SquawkInfo";
import { makeApiCall } from "../../APICall";
import dayjs from "dayjs";

export interface EditSquawkProps {
  open: boolean;
  squawkId: string;
  onClose: () => void;
}

function EditSquawk(props: EditSquawkProps) {
  const [squawk, setSquawk] = useState({
    squawkId: "",
    type: 1,
    description: "",
    correctiveSteps: "",
    dateOpened: "",
    dateClosed: "",
    tachHours: 0,
    hobbsHours: 0,
    grounded: false,
    closed: false
  });

  const [squawkType, setSquawkType] = useState<SquawkType>(squawk.type);
  const [grounded, setGrounded] = useState(squawk.grounded);
  const [description, setDescription] = useState(squawk.description);
  const [correctiveAction, setCorrectiveAction] = useState(squawk.correctiveSteps);
  const [hobbsHours, setHobbsHours] = useState(squawk.hobbsHours);
  const [tachHours, setTachHours] = useState(squawk.tachHours);
  const [checked, setChecked] = useState(squawk.closed);

  const [errormessage, setErrormessage] = useState("");

  const handleClose = (event?: any, reason?: any) => {
    if (reason !== "backdropClick") {
      props.onClose();
    }
  };

  const handleSquawkClosed = (event: any) => {
    setChecked(event.target.checked)
  }

  const update = () => {
    setSquawkType(squawk.type);
    setGrounded(squawk.grounded);
    setDescription(squawk.description);
    setCorrectiveAction(squawk.correctiveSteps);
    setHobbsHours(squawk.hobbsHours);
    setTachHours(squawk.tachHours);
    setChecked(squawk.closed);
  }

  const getSquawk = async () => {
    try {
      const squawkFetch = await fetch(
        `http://localhost:5201/api/squawks/get?squawkId=${props.squawkId}`,
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => data);
      setSquawk(squawkFetch);
      update();
    } catch (error) {
      console.log(error);
    }
  };

  const editSquawk = async () => {
    squawk.type = squawkType;
    squawk.grounded = grounded;
    squawk.description = description;
    squawk.correctiveSteps = correctiveAction;
    squawk.hobbsHours = hobbsHours;
    squawk.tachHours = tachHours;

    if (checked) {
        squawk.closed = true;
        squawk.dateClosed = dayjs().format("MM/DD/YYYY h:mm:ssA");
    }
    try {
        console.log(squawk);
        const responseData = await makeApiCall("/api/squawks/update", squawk, "post")
        console.log(responseData);
        props.onClose();
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    if (props.squawkId) {
      getSquawk();
    }
  }, [props.open, props.squawkId]);

  return (
    <div className="reservation-popup">
      <Dialog
        onClose={handleClose}
        open={props.open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              maxWidth: "50em",
              maxHeight: "38em",
              height: "38em",
              padding: "30px",
            },
          },
        }}
      >
        <div className="add-squawk-title-bar">
          <div className="spaceFiller" />
          <p className="add-squawk-header">Edit Squawk</p>
          <div className="spaceFiller">
            <CloseIcon onClick={handleClose} />
          </div>
        </div>

        <div className="DialogBoxSquawk">
          {/* Squawk Type and Grounded Dropdowns*/}
          <div className="dropDowns">
            <SquawkTypeDropdown
              SquawkType={squawkType}
              setSquawkTypeParent={setSquawkType}
            />
            <GroundedDropDown
              grounded={grounded}
              setGroundedParent={setGrounded}
            />
          </div>

          {/* Text Fields for Description and Corrective Action */}
          <div className="text-fields">
            <TextField
              id="Description"
              label="Description"
              value={description}
              multiline
              fullWidth
              minRows={4}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <TextField
              id="CorrectiveAction"
              label="Corrective Action"
              value={correctiveAction}
              multiline
              fullWidth
              minRows={4}
              onChange={(event) => {
                setCorrectiveAction(event.target.value);
              }}
            />
          </div>

          {/* Tach and Hobbs Hours */}
          <div className="dropDowns">
            <TextField
              id="HobbsHours"
              label="Hobbs Hours"
              value={hobbsHours}
              type="number"
              inputProps={{ min: 0, max: 10000000 }}
              onChange={(event) => {
                var value = parseInt(event.target.value, 0);

                if (value > 10000000) value = 10000000;
                if (value < 0) value = 0;

                setHobbsHours(value);
              }}
            />
            <TextField
              id="TachHours"
              label="Tach Hours"
              value={tachHours}
              type="number"
              inputProps={{ min: 0, max: 10000000 }}
              onChange={(event) => {
                var value = parseInt(event.target.value, 0);

                if (value > 10000000) value = 10000000;
                if (value < 0) value = 0;

                setTachHours(value);
              }}
            />
          </div>
          <FormGroup>
            <FormControlLabel control={
                <Checkbox
                    checked={checked}
                    onChange={handleSquawkClosed}
                />} label="Close Squawk?" 
            />
            
          </FormGroup>
          <div className="error-message">{errormessage}</div>
        </div>

        {/* Confirm and Cancel Buttons */}
        <div className="bottomBar">
          <PrimaryButton text="Confirm" onClick={editSquawk}/>
        </div>
      </Dialog>
    </div>
  );
}

export default EditSquawk;
