import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import StaticSidebar from "../Utils/Sidebar/Sidebar";
import AddNewAircraft from "./AddNewAircraft/AddNewAircraft";
import InviteNewUser from "./InviteNewUser/InviteNewUser";
import {
  DataGrid,
  GridCellModesModel,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import "./Admin.css";
import { SelectChangeEvent } from "@mui/material";
import { Box, TextField } from "@mui/material";
import { env } from "../env";
import EditUserDialog from "./EditUserDialog/EditUserDialog";

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
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [airplaneModels, setAirplaneModels] = useState<string[]>([]);

  const [cellModesModel, setCellModesModel] =
    React.useState<GridCellModesModel>({});

  const handleCellClick = React.useCallback(
    (params: GridCellParams, event: React.MouseEvent) => {
      setOpenEditUserDialog(true);
      console.log("cell clicked", params, event);
    },
    []
  );

  const handleCellModesModelChange = React.useCallback(
    (newModel: GridCellModesModel) => {
      setCellModesModel(newModel);
    },
    []
  );

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
      console.log("admin", isAdmin);
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
      console.log("users", users);
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

      setAirplaneModels(mappedPlanes);
      console.log("planes", mappedPlanes);
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

  return (
    <div className="mainpage">
      <StaticSidebar />
      {admin ? (
        <div className="main-content">
          <div className="admin-subcontent-wrapper">
            <p className="admin-header">Current Users</p>
            <EditUserDialog
              user={user}
              openEditUserDialog={openEditUserDialog}
              airplaneModels={airplaneModels}
              setOpenEditUserDialog={setOpenEditUserDialog}
            />

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
