import { Dialog } from "@mui/material";
import PrimaryButton from "../Buttons/PrimaryButton";
import { Plane } from "../Calendar/Calendar";
import CloseIcon from '@mui/icons-material/Close';
import "./AddSquawkPopup.css"

export interface AddSqawkPopupProps {
    open: boolean;
    plane: Plane;
    onClose: () => void;
}

function AddSqawkPopup (props: AddSqawkPopupProps) {

    const handleClose = (event?: any, reason?: any) => {
        if (reason !== 'backdropClick') {
            props.onClose();
          } 
      };

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

                <div className='DialogBoxAircraft'>
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