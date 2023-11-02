import { Dialog } from "@mui/material";
import { Plane } from "../Calendar/Calendar";
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from "../Buttons/PrimaryButton";
import './AircraftPopup.css'
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import dayjs from "dayjs";

export interface AircraftPopupProps {
    open: boolean;
    plane: Plane;
    onClose: () => void;
    openSquawk: () => void;
    openCreateReservation: () => void;
}

export enum SquawkType {
  planned = 1,
  unplanned = 2,
  hundredhr = 3,
  annual = 4,
}

function AircraftPopup (props: AircraftPopupProps) {
  const [rows, setRows] = useState([]);

  const getSquawks = async () => {
    try {
      const squawks = await fetch(`http://localhost:5201/api/squak/get-all?planeId=${props.plane.planeId}`,
      {credentials: 'include'})
          .then((response) => response.json())
          .then((data) => data);

      const mappedRows = squawks.map((user: any, index: number) => {
         
          return {
              id: index + 1,
              lastName: user.lastName,
              firstName: user.firstName,
              phoneNum: user.phoneNumber,
              email: user.email,
              accountType: user.type,
          }
      });

      setRows(mappedRows)
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
      valueOptions: ["Planned", "Unplanned", "100hr", "Annual"]
    },
  ];

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
                />
              </div>
            </div>

            {/* Confirm and Cancel Buttons */}
            <div className='bottomBar'>
                <PrimaryButton text="Create Reservation" onClick={props.openCreateReservation} />
                <PrimaryButton text="Add Squawk" onClick= {props.openSquawk}/>
            </div>
        </Dialog>
    </div>
  );  
}

export default AircraftPopup;