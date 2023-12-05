import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
} from "@mui/material";
import { Plane } from "../../Calendar/Calendar";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import "./AircraftPopup.css";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { env } from "../../env";
import SquawkInfo from "../AllSquawks/SquawkInfo";

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
  annual = 4,
}

const SquawkLabel = [
  { label: "Planned", value: 1 },
  { label: "Unplanned", value: 2 },
  { label: "100 Hour", value: 3 },
  { label: "Annual", value: 4 },
];

export interface Squawk {
  squawkId: string;
  dateOpened: string;
  desc: string;
  type: number;
}

function AircraftPopup(props: AircraftPopupProps) {
  // Squawk Data Retrieval
  const [rows, setRows] = useState([]);
  const getSquawks = async () => {
    try {
      const squawks = await fetch(
        `http://localhost:5201/api/squawks/get-from-plane?planeId=${props.plane.planeId}`,
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => data);
      const mappedRows = squawks.map((squawk: any, index: number) => {
        const date = new Date(squawk.dateOpened);
        return {
          id: index,
          squawkId: squawk.squawkId,
          date_opened: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
          description: squawk.description,
          type: SquawkLabel.find((object) => object.value == squawk.type),
        };
      });
      setRows(mappedRows);
    } catch (error) {
      console.log(error);
    }
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [currSquawk, setCurrSquawk] = useState("");
  const handleRowClick = (clicked: any) => {
    setCurrSquawk(clicked.row.squawkId);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [squawk, setSquawk] = useState({
    squawkId: "",
    type: 1,
    description: "",
    correctiveSteps: "",
    dateOpened: "",
    dateClosed: "",
    tachHours: 0,
    hobbsHours: 0,
    grounded: false
  });

  const apiUrl = env.SKYCHART_API_URL;
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    async function isAdmin() {
      const isAdmin = (await fetch(`${apiUrl}/api/user/get-current-is-admin`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data)) as boolean;
      setAdmin(isAdmin);
    }
    isAdmin();
  }, []);

  const handleClose = (event?: any, reason?: any) => {
    if (reason !== "backdropClick") {
      props.onClose();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "date_opened",
      headerName: "Date Opened",
      type: "string",
      editable: false,
      width: 120,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      editable: true,
      width: 475,
    },
    {
      field: "type",
      headerName: "Type",
      type: "singleSelect",
      editable: true,
      width: 100,
      valueOptions: ["Planned", "Unplanned", "100 Hour", "Annual"],
    },
  ];

  useEffect(() => {
    if (props.plane.planeId != undefined) {
      getSquawks();
    }
  }, [props.plane.planeId]);

  return (
    <div className="reservation-popup">
      <Dialog
        onClose={handleClose}
        open={props.open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              maxWidth: "65em",
              height: "40em",
              padding: "2em",
            },
          },
        }}
      >
        <div className="title-bar">
          <div className="space-filler" />
          <p className="aircraft-popup-header">{`${props.plane.nickName} [${props.plane.tailNumber}] - ${props.plane.model}`}</p>
          <div className="space-filler">
            <CloseIcon onClick={handleClose} />
          </div>
        </div>

        <div className="aircraft-popup-main-content">
          {/* Information Sidebar Frame */}
          <div className="info-frame">
            <p className="info-header">Information</p>

            <div className="info-column">
              <p className="p">
                Rate: <b>${props.plane.hourlyRate}/hr</b>
              </p>
              <p className="p">
                Hobbs Hours: <b>{props.plane.hobbsHours}</b>
              </p>
              <p className="p">
                Tach Hours: <b>{props.plane.tachHours}</b>
              </p>
              <p className="p">
                Engines: <b>{props.plane.numEngines}</b>
              </p>
            </div>
          </div>

          {/* Squawks Frame */}
          <div className="squawks-frame">
            <p className="info-header">Squawks</p>
            <DataGrid
              sx={{ width: "50em", m: 2 }}
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
              onRowClick={handleRowClick}
            />
          </div>
        </div>

        {/* Confirm and Cancel Buttons */}
        <div className="bottom-bar">
          <PrimaryButton
            text="Create Reservation"
            onClick={props.openCreateReservation}
          />
          <PrimaryButton text="Add Squawk" onClick={props.openSquawk} />
          {admin && (
            <PrimaryButton text="Edit Nickname" onClick={props.openModify} />
          )}
        </div>
      </Dialog>
      <SquawkInfo
        open={openPopup}
        onClose={handleClosePopup}
        squawkId={currSquawk}
      />
    </div>
  );
}

export default AircraftPopup;
