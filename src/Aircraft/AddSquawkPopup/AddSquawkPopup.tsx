import { Dialog, TextField } from "@mui/material";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import { Plane } from "../../Calendar/Calendar";
import CloseIcon from '@mui/icons-material/Close';
import "./AddSquawkPopup.css"
import SquawkTypeDropdown from "../../Utils/DropDowns/SquawkTypeDropDown";
import { useState } from "react";
import { SquawkType } from "../AircraftPopup/AircraftPopup";
import GroundedDropDown from "../../Utils/DropDowns/GroundedDropDown";
import { makeApiCall } from "../../APICall";
import dayjs, { Dayjs } from 'dayjs';

export interface AddSqawkPopupProps {
    open: boolean;
    plane: Plane;
    onClose: () => void;
}

function AddSqauwkPopup (props: AddSqawkPopupProps) {

    const [squawkType, setSquawkType] = useState<SquawkType>(SquawkType.planned);
    const [grounded, setGrounded] = useState<boolean>(false);
    const [description, setDescription] = useState('');
    const [correctiveAction, setCorrectiveAction] = useState('');
    const [hobbsHours, setHobbsHours] = useState<number>(0);
    const [tachHours, setTachHours] = useState<number>(0);

    const [errormessage, setErrormessage] = useState('')

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
        setHobbsHours(0);
        setTachHours(0);
        setErrormessage("");
    }

    const createSquawk = async () => {

        const data = {
            mxId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            planeId: props.plane.planeId,
            type: squawkType,
            description: description,
            dateOpened: dayjs().format("MM/DD/YYYY h:mm:ssA"),
            tachHours: tachHours,
            hobbsHours: hobbsHours,
            grounding: grounded,
            closed: false,
            correctiveSteps: correctiveAction,
        }

        let responseData2 = null
        try {
            responseData2 = await makeApiCall("/api/squaks/create", data, "post")
            
            if (responseData2 === "Couldn't find UserId"){
                setErrormessage(responseData2)
                return
            }
            reset()
        } catch (error) {
            console.error(error)
        }

       handleClose()
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
                            type="number" inputProps={{ min: 0, max: 10000000 }}
                            onChange={(event) => {
                                var value = parseInt(event.target.value, 0);
                      
                                if (value > 10000000) value = 10000000;
                                if (value < 0) value = 0;
                      
                                setHobbsHours(value);
                              }}/>
                        <TextField id="TachHours"
                            label="Tach Hours" 
                            value={tachHours} 
                            type="number" inputProps={{ min: 0, max: 10000000 }}
                            onChange={(event) => {
                                var value = parseInt(event.target.value, 0);
                      
                                if (value > 10000000) value = 10000000;
                                if (value < 0) value = 0;
                      
                                setTachHours(value);
                              }}/>
                    </div>

                    <div className='error-message'>
                        {errormessage}
                    </div>
                </div>
                
                
                
                


                {/* Confirm and Cancel Buttons */}
                <div className='bottomBar'>
                    <PrimaryButton text="Add Squawk" onClick={createSquawk}/>
                </div>
            </Dialog>
        </div>
    )
}

export default AddSqauwkPopup