import CancelButton from '../Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../Buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthorizationContext } from '../AuthContext';
import { response } from 'express';
import "./Logout.css";

export interface UpcomingMaintenanceProps {
    open: boolean;
    onClose: () => void;
}

function UpcomingMaintenance(props: UpcomingMaintenanceProps) {
    const {open, onClose} = props;

    const handleClose = () => {
        onClose();
    };  

    return (
        <div>
            <Dialog onClose={handleClose} open={open}
              sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "30%",
                    maxWidth: "57.5vw",
                    height: "25%",
                    maxHeight: "95vh",
                    paddingBottom: "30px",
                    paddingLeft: "30px",
                    paddingRight: "30px"
                  },
                },
              }}>
                Hey!
            </Dialog>
        </div>
    );
}

export default UpcomingMaintenance;