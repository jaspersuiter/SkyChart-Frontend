import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import StaticSidebar from "../Utils/Sidebar/Sidebar";
import AddNewAircraft from "./AddNewAircraft/AddNewAircraft";
import InviteNewUser from "./InviteNewUser/InviteNewUser";
import {
  DataGrid,
  GridCellModes,
  GridCellModesModel,
  GridCellParams,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import "./Admin.css";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box, TextField } from "@mui/material";
import { env } from "../env";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  phoneNum: string;
  email: string;
  accountType: string;
}

function Admin() {
  const [open, setOpenAddAircraft] = React.useState(false);
  const [openInviteUser, setOpenInviteUser] = React.useState(false);
  const [rows, setRows] = useState<User[]>([]); // Declare rows as a state variable of type User[]
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [doUpdateUserType, setDoUpdateUserType] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNum, setNewPhoneNum] = useState("");
  const [airplaneModels, setAirplaneModels] = useState<string[]>([]);
  const [approvedModel, setApprovedModel] = useState<string[]>([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [cellModesModel, setCellModesModel] =
    React.useState<GridCellModesModel>({});

  const handleCellClick = React.useCallback(
    (params: GridCellParams, event: React.MouseEvent) => {
      setOpenConfirmationDialog(true);
    },
    []
  );

  const handleCellModesModelChange = React.useCallback(
    (newModel: GridCellModesModel) => {
      setCellModesModel(newModel);
    },
    []
  );
  const updateUser = (doUpdateUserType: boolean) => {
    if (doUpdateUserType) {
      fetch(
        `http://localhost:5201/api/user/update-account-type?userId=${user.id}`,
        { credentials: "include", method: "PUT" }
      );
      setDoUpdateUserType(false);
    }
  };

  const handleConfirmationDialogClose = (confirmed: any) => {
    setOpenConfirmationDialog(false);

    if (confirmed) {
      updateUser(doUpdateUserType);
      fetchUsers();
    }
  };

  const handleChangeSelector = (
    event: SelectChangeEvent<typeof approvedModel>
  ) => {
    const {
      target: { value },
    } = event;
    setApprovedModel(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [searchQuery, setSearchQuery] = useState("");

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 250,
      editable: false,
    },
    {
      field: "phoneNum",
      headerName: "Phone",
      type: "string",
      width: 150,
      editable: false,
    },
    {
      field: "accountType",
      headerName: "Type",
      width: 150,
      type: "singleSelect",
      editable: false,
      valueOptions: ["instructor", "pilot"],
    },
  ];

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const handleClickOpenAddAircraft = () => {
    setOpenAddAircraft(true);
  };

  const handleCloseAddAircraft = () => {
    setOpenAddAircraft(false);
  };

  const handleClickOpenInviteUser = () => {
    setOpenInviteUser(true);
  };

  const handleCloseInviteUser = () => {
    setOpenInviteUser(false);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const isAdmin = async () => {
    try {
      const isAdmin = (await fetch(`${apiUrl}/api/user/get-current-is-admin`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data)) as boolean;

      setAdmin(isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await fetch(
        "http://localhost:5201/api/user/get-all-users",
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => data);

      const mappedRows = users.map((user: any, index: number) => {
        return {
          id: user.id,
          lastName: user.lastName,
          firstName: user.firstName,
          phoneNum: user.phoneNumber,
          email: user.email,
          accountType: user.type,
        };
      });

      setRows(mappedRows);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAirplaneModels = async () => {
    try {
      const planes = await fetch("http://localhost:5201/api/plane/get-all", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data);

      const planesModels = planes.map((plane: any) => {
        return {
          model: plane.model,
        };
      });

      const mappedPlanes = planesModels
        .filter((plane: any, index: number) => {
          return (
            planesModels.findIndex(
              (plane2: any) => plane2.model === plane.model
            ) === index
          );
        })
        .map((plane: any) => plane.model);

      console.log(mappedPlanes);
      setAirplaneModels(mappedPlanes);
    } catch (error) {
      console.log(error);
    }
  };

  const apiUrl = env.SKYCHART_API_URL;
  const [admin, setAdmin] = React.useState(false);

  useEffect(() => {
    isAdmin();
    fetchUsers();
    fetchAirplaneModels();
  }, []);

  const EditUserDialog = () => {
    return (
      <div className="edit-user-dialog">
        <Dialog
          open={openConfirmationDialog}
          onClose={handleConfirmationDialogClose}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "50%",
                maxWidth: "57.5vw",
                height: "50%",
                maxHeight: "90vh",
                padding: "30px",
              },
            },
          }}
        >
          <DialogTitle>{`Edit ${user.firstName || ""} ${
            user.lastName || ""
          }`}</DialogTitle>
          <DialogContent>
            <TextField
              id="email"
              label="Email"
              type="string"
              value={user.email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <TextField
              id="phoneNum"
              label="Phone Number"
              type="string"
              value={user.phoneNum}
              onChange={(e) => setNewPhoneNum(e.target.value)}
            />
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="plane-model-label">
                  Approved Plane Models
                </InputLabel>
                <Select
                  labelId="plane-model-label"
                  id="plane-model-checkbox"
                  multiple
                  value={approvedModel}
                  onChange={handleChangeSelector}
                  input={<OutlinedInput label="Approved Plane Models" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {airplaneModels.map((model) => (
                    <MenuItem key={model} value={model}>
                      <Checkbox checked={approvedModel.indexOf(model) > -1} />
                      <ListItemText primary={model} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {user.accountType === "pilot" ? (
              <PrimaryButton
                text="Make user an Instructor?"
                onClick={() => setDoUpdateUserType(true)}
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmationDialogClose(true)}>
              Confirm
            </Button>
            <Button onClick={() => handleConfirmationDialogClose(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div className="mainpage">
      <StaticSidebar />
      {admin ? (
        <div className="main-content">
          <div className="admin-subcontent-wrapper">
            <p className="admin-header">Current Users</p>
            <EditUserDialog />

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Box
                className="box"
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                }}
              >
                <SearchIcon sx={{ mr: 1, my: 0.5 }} />
                <TextField
                  id="input-with-sx"
                  label="Search..."
                  variant="standard"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Box>
            </div>

            <DataGrid
              sx={{ width: "100%", m: 2 }}
              rows={filteredRows}
              columns={columns}
              autoHeight
              hideFooter
              cellModesModel={cellModesModel}
              onCellModesModelChange={handleCellModesModelChange}
              onCellClick={handleCellClick}
              onRowSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = rows.filter((row) =>
                  selectedIDs.has(row.id.toString())
                );
                setUser(selectedRowData[0]);
              }}
            />
          </div>

          <div className="admin-subcontent-wrapper">
            <div className="buttonrow">
              <PrimaryButton
                text="Add New Aircraft"
                onClick={handleClickOpenAddAircraft}
              />
              <PrimaryButton
                text="Invite New User"
                onClick={handleClickOpenInviteUser}
              />
            </div>
          </div>

          <AddNewAircraft open={open} onClose={handleCloseAddAircraft} />

          <InviteNewUser
            open={openInviteUser}
            onClose={handleCloseInviteUser}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Admin;
