import Dialog from "@mui/material/Dialog";
import "./SquawkInfo.css";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PrimaryButton from "../../Utils/Buttons/PrimaryButton";
import EditSquawk from "../EditSquawk/EditSquawk";

export interface SquawkInfoProps {
  open: boolean;
  onClose: () => void;
  squawkId: string;
}

function SquawkInfo(props: SquawkInfoProps) {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

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

  const SquawkLabel = [
    { label: "Planned", value: 1 },
    { label: "Unplanned", value: 2 },
    { label: "100 Hour", value: 3 },
    { label: "Annual", value: 4 },
  ];

  const getSquawk = async () => {
    try {
      const squawkFetch = await fetch(
        `http://localhost:5201/api/squawks/get?squawkId=${props.squawkId}`,
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => data);
      setSquawk(squawkFetch);
    } catch (error) {
      console.log(error);
    }
  };
  
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    async function isAdmin() {
      const isAdmin = (await fetch(`http://localhost:5201/api/user/get-current-is-admin`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data)) as boolean;
      setAdmin(isAdmin);
    }
    isAdmin();
  }, []);

  // Edit squawk dialog
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickEditSquawk = () => {
    setOpenEdit(true);
  }

  const handleCloseEditSquawk = () => {
    setOpenEdit(false);
  }

  useEffect(() => {
    if (props.squawkId) {
      getSquawk();
    }
  }, [props.squawkId, openEdit]);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "30em",
              maxHeight: "35em",
              height: "35em",
              padding: "2em",
            },
          },
        }}
      >
        <div className="title-bar">
          <div className="space-filler" />
          <p className="squawk-popup-header">Squawk Information</p>
          <div className="space-filler">
            <CloseIcon onClick={handleClose} />
          </div>
        </div>
        <div className="squawk-info-body">
          <p>Description: {squawk.description}</p>
          <p>Corrective Steps: {squawk.correctiveSteps}</p>
          <p>Date Opened: {squawk.dateOpened}</p>
          <p>Date Closed: {squawk.dateClosed}</p>
          <p>Grounded: {squawk.grounded ? ("True") : ("False")}</p>
          <p>Type: {SquawkLabel.find((o) => o.value === squawk.type)?.label}</p>
          <p>Tach Hours: {squawk.tachHours}</p>
          <p>Hobbs Hours: {squawk.hobbsHours}</p>
        </div>
        <div className="squawk-info-button">
            {admin ? (<PrimaryButton text="Edit Squawk" onClick={handleClickEditSquawk}/>) : (<p></p>)}
        </div>
        <EditSquawk open={openEdit} onClose={handleCloseEditSquawk} squawkId={squawk.squawkId} />
      </Dialog>
    </div>
  );
}

export default SquawkInfo;
