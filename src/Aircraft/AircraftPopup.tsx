import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Plane } from "../Calendar/Calendar";
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import './AircraftPopup.css'
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { env } from "../env";

export interface AircraftPopupProps {
    open: boolean;
    plane: Plane;
    onClose: () => void;
    openSquawk: () => void;
    openCreateReservation: () => void;
    openModify: () => void;
}

export enum SquawkType {
  planned = 1,
  unplanned = 2,
  hundredhr = 3,
  annual = 4
}

const Type1 = [{label: "Planned", value: 1}, {label: "Unplanned", value: 2}, {label: "100 Hour", value: 3}, {label: "Annual", value: 4}]

export interface Squawk {
  mxId: string;
  dateOpened: string;
  desc: string;
  type: number;
}

function AircraftPopup (props: AircraftPopupProps) {
  const [rows, setRows] = useState([]);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [currSquawk, setCurrSquawk] = useState<Squawk>();

  const processRowUpdate = (newRow: any, oldRow: any) => {
    newRow.type = Type1.find((object) => object.label == newRow.type)?.value;
    setCurrSquawk(newRow);
    if (newRow.description !== oldRow.description || newRow.type !== oldRow.type) {
        setOpenConfirmationDialog(true);
    }
};

  const handleConfirmationDialogClose = (confirmed: any) => {
    setOpenConfirmationDialog(false);

    if (confirmed) {
      updateSquawk();
    } else {
      window.location.reload();
    }
  };

  const getSquawks = async () => {
    try {
      const squawks = await fetch(`http://localhost:5201/api/squaks/get-all?planeId=${props.plane.planeId}`,
      {credentials: 'include'})
          .then((response) => response.json())
          .then((data) => data);
      const mappedRows = squawks.map((squawk: any, index: number) => {
          return {
            id: index,
            mxId: squawk.mxId,
            date_opened: squawk.dateOpened,
            description: squawk.description,
            type: Type1.find((object) => object.value == squawk.type)
          }
      });
      setRows(mappedRows)
    } catch (error) {
        console.log(error);
    }
  }
  
  const apiUrl = env.SKYCHART_API_URL;
  const [admin, setAdmin] = useState(false);
    useEffect(() => {
      async function isAdmin() {
        const isAdmin = await fetch(
          `${apiUrl}/api/user/get-current-is-admin`,
          {
            method: "GET",
            credentials: "include",
          }
        ).then((response) => response.json())
        .then((data) => data) as boolean;
        setAdmin(isAdmin);
        
      }
      isAdmin();
    }, []);

  const updateSquawk = async () => {
    console.log(currSquawk)
    try {
      const update = await fetch(`http://localhost:5201/api/squaks/update`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(currSquawk),
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((response) => response.json())
          .then((data) => data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = (event?: any, reason?: any) => {
    if (reason !== 'backdropClick') {
        props.onClose();
      } 
  };

  const columns: GridColDef[] = [
    {
      field: 'date_opened',
      headerName: 'Date Opened',
      type: 'string',
      editable: false,
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      editable: true,
      width: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'singleSelect',
      editable: true,
      width: 200,
      valueOptions: ["Planned", "Unplanned", "100 Hour", "Annual"]
    },
  ];

  useEffect(() => {
    if (props.plane.planeId != undefined) {
      getSquawks();
    }
  }, [props.plane.planeId]);


  const ConfirmationDialog = () => {
    return (
      <Dialog open={openConfirmationDialog} onClose={handleConfirmationDialogClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Pressing 'Yes' will save the changes to the squawk.</p>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleConfirmationDialogClose(true)}>Yes</Button>
          <Button onClick={() => handleConfirmationDialogClose(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
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
                <h1 className='h1'>{props.plane.tailNumber} {props.plane.nickName && `(${props.plane.nickName})`} {props.plane.model}</h1>
                <div className='spaceFiller'>
                <CloseIcon onClick={handleClose}/>
                </div>
            </div>

            <div className='DialogBoxAircraft'>
              <div className="generalInfo">
                <h2 className='h2'>General Information</h2>

                <div className="generalInfoColumn">
                  <p className='p'>Hourly Rate: {props.plane.hourlyRate}</p>
                  <p className='p'>Hobbs Hours: {props.plane.hobbsHours}</p>
                  <p className='p'>Tach Hours: {props.plane.tachHours}</p>
                  <p className='p'>Number of Engines: {props.plane.numEngines}</p>
                </div>

              </div>
              <div className="squawks">
                <h2 className='h2'>Squawks</h2>
                <ConfirmationDialog />
                <DataGrid
                    sx={{width: '100%', m: 2 }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 100,
                            },
                        },
                    }}
                    autoHeight
                    disableRowSelectionOnClick
                    processRowUpdate={processRowUpdate}
                />
              </div>
            </div>

            {/* Confirm and Cancel Buttons */}
            <div className='bottomBar'>
                <PrimaryButton text="Create Reservation" onClick={props.openCreateReservation} />
                <PrimaryButton text="Add Squawk" onClick= {props.openSquawk}/>
                {admin && <PrimaryButton text="Edit Nickname" onClick= {props.openModify}/>}
            </div>
        </Dialog>
    </div>
  );  
}

export default AircraftPopup;