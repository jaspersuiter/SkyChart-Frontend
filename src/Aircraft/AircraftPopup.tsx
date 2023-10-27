import { Dialog } from "@mui/material";
import { Plane } from "../Calendar/Calendar";
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from "../Buttons/PrimaryButton";
import './AirscraftPopup.css'

export interface AircraftPopupProps {
    open: boolean;
    plane: Plane;
    onClose: () => void;
}

function AircraftPopup (props: AircraftPopupProps) {
    const {open, onClose } = props;


    const handleClose = (event?: any, reason?: any) => {
        if (reason !== 'backdropClick') {
            onClose();
          } 
      };

      return (
        <div className="reservation-popup">
            <Dialog onClose={handleClose} open={open}
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
                    <h1 className='h1'>{props.plane.tailNumber} {props.plane.nickName && `(${props.plane.nickName})`} {props.plane.model}</h1>
                    <div className='spaceFiller'>
                    <CloseIcon onClick={handleClose}/>
                    </div>
                </div>

                <div className='dialogBox'>
                

                </div>
                
                
                
                


                {/* Confirm and Cancel Buttons */}
                <div className='bottomBar'>
                    <PrimaryButton text="Create Reservation" />
                    <PrimaryButton text="Add Squawk" />
                </div>
            </Dialog>
        </div>
    );  
}

export default AircraftPopup;