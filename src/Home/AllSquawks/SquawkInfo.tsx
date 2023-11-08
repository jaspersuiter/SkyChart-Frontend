import Dialog from '@mui/material/Dialog';
import './SquawkInfo.css';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface SquawkInfoProps {
    open: boolean;
    onClose: () => void;
    squawkId: string;
}

function SquawkInfo(props: SquawkInfoProps) {
    const {open, onClose } = props;

    const handleClose = () => {
        onClose();
    };

    const [squawk, setSquawk] = useState({
        mxId: "",
        type: 1,
        description: "",
        correctiveSteps: "",
        dateOpened: "",
        dateClosed: ""
    });
    
    const SquawkLabel = [{label: "Planned", value: 1}, {label: "Unplanned", value: 2}, {label: "100 Hour", value: 3}, {label: "Annual", value: 4}]

    const getSquawk = async () => {
        try {
            const squawkFetch = await fetch(`http://localhost:5201/api/squawks/get?squawkId=${props.squawkId}`,
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data);
            setSquawk(squawkFetch);
            console.log(squawkFetch)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSquawk();
    }, [props.squawkId]);

    return (
        <div>
            <Dialog onClose={handleClose} open={open}
              sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "30em",
                    maxHeight: "30em",
                    height: "30em",
                    padding: "2em"
                  },
                },
              }}>
                <div className='title-bar'>
                    <div className='space-filler'/>
                    <p className='squawk-popup-header'>Squawk Information</p>
                    <div className='space-filler'>
                        <CloseIcon onClick={handleClose}/>
                    </div>
                </div>
                <div className="squawk-info-body">
                    <p>Description: {squawk.description}</p>
                    <p>Corrective Steps: {squawk.correctiveSteps}</p>
                    <p>Date Opened: {squawk.dateOpened}</p>
                    <p>Date Closed: {squawk.dateClosed}</p>
                    <p>Type: {SquawkLabel.find(o => o.value === squawk.type)?.label}</p>
                </div>
            </Dialog>
        </div>
    );
}

export default SquawkInfo;