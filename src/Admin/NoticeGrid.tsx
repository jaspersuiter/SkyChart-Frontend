import { Button, Dialog, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import "./NoticeGrid.css";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowProps,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import SecondaryButton from "../Utils/Buttons/SecondaryButton";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

interface DeleteConfirmationProps {
  open: boolean;
  noticeId: string;
  onClose: () => void;
}

function DeleteConfirmation(props: DeleteConfirmationProps) {
  const { open, noticeId, onClose } = props;
  const handleClose = () => {
    onClose();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5201/api/notice/delete?noticeId=${noticeId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noticeId: noticeId }),
        }
      );

      if (response.ok) {
        console.log("notice deleted");
      } else {
        console.log("notice not deleted");
      }
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "30%",
            maxWidth: "57.5vw",
            height: "25%",
            maxHeight: "95vh",
            paddingBottom: "30px",
            paddingLeft: "30px",
            paddingRight: "30px",
          },
        },
      }}
    >
      <div>
        <h1>Are you sure you want to delete this notice?</h1>
        <div className="FlexRowItem">
          <PrimaryButton text="Yes" onClick={handleDelete} />
          <SecondaryButton text="No" onClick={handleClose} />
        </div>
      </div>
    </Dialog>
  );
}

interface CreateNoticeProps {
  open: boolean;
  onClose: () => void;
}

function CreateNotice(props: CreateNoticeProps) {
  const { open, onClose } = props;
  const [description, setDescription] = useState("");
  const datePosted = getDate();
  const handleClose = () => {
    onClose();
    setDescription("");
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:5201/api/notice/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          datePosted: datePosted,
          description: description,
        }),
      });

      if (response.ok) {
        console.log("notice created");
      } else {
        console.log("notice not created");
      }
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "30%",
            maxWidth: "57.5vw",
            height: "30%",
            maxHeight: "95vh",
            paddingBottom: "30px",
            paddingLeft: "30px",
            paddingRight: "30px",
          },
        },
      }}
    >
      <h1>What would you like your notice to say?</h1>
      <TextField
        id="descrpition"
        label="Description"
        type="string"
        required
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
      />
      <div className="FlexRowItem">
        <PrimaryButton text="Create" onClick={handleCreate} />
        <SecondaryButton text="Cancel" onClick={handleClose} />
      </div>
    </Dialog>
  );
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const [openCreateConfirmation, setOpenCreateConfirmation] =
    React.useState(false);

  const handleCloseCreateConfirmation = () => {
    setOpenCreateConfirmation(false);
  };

  const handleClick = () => {
    setOpenCreateConfirmation(true);
  };

  return (
    <div>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Notice
        </Button>
      </GridToolbarContainer>

      <CreateNotice
        open={openCreateConfirmation}
        onClose={handleCloseCreateConfirmation}
      />
    </div>
  );
}

function parseDate(date: string) {
  const [datePart, timePart] = date.split(" ");
  const [year, month, day] = datePart.split("-");
  return `${month}/${day}/${year}`;
}

function NoticeGrid() {
  const [OpenDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false);
  const [noticeId, setNoticeId] = React.useState("");

  const setCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const fetchNotices = async () => {
    try {
      const notices = await fetch(
        "http://localhost:5201/api/notice/get-all-notices",
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => data);

      const mappedRows = notices.map((notice: any) => {
        return {
          id: notice.noticeId,
          date: parseDate(notice.datePosted),
          description: notice.description,
        };
      });
      console.log("rows", mappedRows);

      setRows(mappedRows);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchNotices();
  }, []);

  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setNoticeId(String(id));
    setOpenDeleteConfirmation(true);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date posted",
      type: "string",
      width: 100,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 575,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        hideFooter
      />

      <DeleteConfirmation
        open={OpenDeleteConfirmation}
        onClose={setCloseDeleteConfirmation}
        noticeId={noticeId}
      />
    </div>
  );
}

export default NoticeGrid;
