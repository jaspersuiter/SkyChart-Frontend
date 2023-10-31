import { Dialog, TextField } from "@mui/material";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Plane } from "../Calendar/Calendar";
import CloseIcon from '@mui/icons-material/Close';
import "./AddSquawkPopup.css"
import SquawkTypeDropdown from "../DropDowns/SquawkTypeDropDown";
import { useState } from "react";
import { SquawkType } from "./AircraftPopup";
import GroundedDropDown from "../DropDowns/GroundedDropDown";

export interface AddSqawkPopupProps {
    open: boolean;
    plane: Plane;
    onClose: () => void;
}

function AddSqawkPopup (props: AddSqawkPopupProps) {

    const [squawkType, setSquawkType] = useState<SquawkType>(SquawkType.planned);
    const [grounded, setGrounded] = useState<boolean>(false);
    const [description, setDescription] = useState<String>("");
    const [correctiveAction, setCorrectiveAction] = useState<String>("");
    const [hobbsHours, setHobbsHours] = useState<String>("");
    const [tachHours, setTachHours] = useState<String>("");

    const handleClose = (event?: any, reason?: any) => {
        if (reason !== 'backdropClick') {

            reset();
            props.onClose();
          } 
      };

    const reset = () => {
        setSquawkType(SquawkType.planned);
        setGrounded(false);
        setDescription("");
        setCorrectiveAction("");
        setHobbsHours("");
        setTachHours("");
    }

    return (
        <div className="reservation-popup">
            <Dialog onClose={handleClose} open={props.open}
            sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "57.5vw",
                    height: "100%",
                    maxHeight: "80vh",
                    padding: "30px"
                  },
                },
              }}>

                <div className='TitleBar'>
                    <div className='spaceFiller'/>
                    <h1 className='h1'>Add {props.plane.tailNumber} {props.plane.nickName && `(${props.plane.nickName})`} Squawk</h1>
                    <div className='spaceFiller'>
                    <CloseIcon onClick={handleClose}/>
                    </div>
                </div>

                <div className='DialogBoxSquawk'>
                    <div className="dropDowns">
                        <SquawkTypeDropdown SquawkType={squawkType} setSquawkTypeParent={setSquawkType}/>
                        <GroundedDropDown grounded={grounded} setGroundedParent={setGrounded}/>
                    </div>
                    <div className="dropDowns">
                        <TextField id="Description" 
                            label="Description" 
                            value={description} 
                            multiline
                            fullWidth 
                            minRows={4}
                            onChange={(event) => {setDescription(event.target.value)}}/>
                        <TextField id="CorrectiveAction"
                            label="Corrective Action" 
                            value={correctiveAction} 
                            multiline
                            fullWidth 
                            minRows={4}
                            onChange={(event) => {setCorrectiveAction(event.target.value)}}/>
                    </div>
                    
                    <div className="dropDowns"> 
                        <TextField id="HobbsHours" 
                            label="Hobbs Hours" 
                            value={hobbsHours} 
                            onChange={(event) => {setHobbsHours(event.target.value)}}/>
                        <TextField id="TachHours"
                            label="Tach Hours" 
                            value={tachHours} 
                            onChange={(event) => {setTachHours(event.target.value)}}/>
                    </div>
                </div>
                
                
                
                


                {/* Confirm and Cancel Buttons */}
                <div className='bottomBar'>
                    <PrimaryButton text="Add Squawk" />
                </div>
            </Dialog>
        </div>
    )
}

export default AddSqawkPopup