import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Drawer } from "@mui/material";
import { Plane } from "../../Calendar/Calendar";
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import './AircraftPopup.css'
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { env } from "../../env";

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

const SquawkLabel = [{label: "Planned", value: 1}, {label: "Unplanned", value: 2}, {label: "100 Hour", value: 3}, {label: "Annual", value: 4}]

export interface Squawk {
  mxId: string;
  dateOpened: string;
  desc: string;
  type: number;
}

function AircraftPopup (props: AircraftPopupProps) {
  // Squawk Data Retrieval
  const [rows, setRows] = useState([]);
  const getSquawks = async () => {
    try {
      const squawks = await fetch(`http://localhost:5201/api/squaks/get-all?planeId=${props.plane.planeId}`,
      {credentials: 'include'})
        .then((response) => response.json())
        .then((data) => data);
      const mappedRows = squawks.map((squawk: any, index: number) => {
        const date = new Date(squawk.dateOpened)
        return {
          id: index,
          mxId: squawk.mxId,
          date_opened: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
          description: squawk.description,
          type: SquawkLabel.find((object) => object.value == squawk.type)
        }
      });
      setRows(mappedRows)
    } catch (error) {
        console.log(error);
    }
  }


  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [currSquawk, setCurrSquawk] = useState<Squawk>();

  const processRowUpdate = (newRow: any, oldRow: any) => {
    newRow.type = SquawkLabel.find((object) => object.label == newRow.type)?.value;
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
      width: 120,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      editable: true,
      width: 475,
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'singleSelect',
      editable: true,
      width: 100,
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
                maxWidth: "65em",
                height: "40em",
                padding: "2em"
              },
            },
          }}>
            <div className='title-bar'>
              <div className='space-filler'/>
              <p className='aircraft-popup-header'>{`${props.plane.nickName} [${props.plane.tailNumber}] - ${props.plane.model}`}</p>
              <div className='space-filler'>
                <CloseIcon onClick={handleClose}/>
              </div>
            </div>

            <div className="aircraft-popup-main-content">

              {/* Information Sidebar Frame */}
              <div className="info-frame">
                <p className="info-header">Information</p>

                <div className="info-column">
                  <p className='p'>Rate: <b>${props.plane.hourlyRate}/hr</b></p>
                  <p className='p'>Hobbs Hours: <b>{props.plane.hobbsHours}</b></p>
                  <p className='p'>Tach Hours: <b>{props.plane.tachHours}</b></p>
                  <p className='p'>Engines: <b>{props.plane.numEngines}</b></p>
                </div>
              </div>

              {/* Squawks Frame */}
              <div className="squawks-frame">
                <p className="info-header">Squawks</p>
                <ConfirmationDialog />
                <DataGrid
                    sx={{width: "50em", m: 2 }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
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
            <div className='bottom-bar'>
              <PrimaryButton text="Create Reservation" onClick={props.openCreateReservation} />
              <PrimaryButton text="Add Squawk" onClick= {props.openSquawk}/>
              {admin && <PrimaryButton text="Edit Nickname" onClick= {props.openModify}/>}
            </div>
        </Dialog>
    </div>
  );  
}

export default AircraftPopup;