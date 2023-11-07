import CancelButton from '../../Utils/Buttons/CancelButton';
import Dialog from '@mui/material/Dialog';
import SecondaryButton from '../../Utils/Buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthorizationContext } from '../../AuthContext';
import { response } from 'express';
import { Plane } from '../../Calendar/Calendar';
import React from 'react';

export interface UpcomingMaintenanceProps {
    open: boolean;
    onClose: () => void;
    planeId: string;
}

function UpcomingMaintenance(props: UpcomingMaintenanceProps) {
    const {open, onClose} = props;

    const handleClose = () => {
        onClose();
    };
    const [plane, setPlane] = React.useState<Plane>({planeId: '', tailNumber: '', model: '', nickName: '', hourlyRate: 0, numEngines: 0, tachHours: 0, hobbsHours: 0, grounded: false});

    const fetchPlane = async () => {
        try {
            const planeFetch = await fetch(`http://localhost:5201/api/plane/get?planeId=${props.planeId}`,
            {
                credentials: 'include'
            })
            .then((response) => response.json())
            .then((data) => data) as Plane;
            setPlane(planeFetch);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPlane(); // Call fetchInstructors when the component mounts
    }, [props.planeId]);

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
            
                <h2>{plane.tailNumber} - ({plane.nickName}) Maintenance Items</h2>
                
            </Dialog>
        </div>
    );
}

export default UpcomingMaintenance;