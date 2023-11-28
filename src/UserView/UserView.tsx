import StaticSidebar from "../Utils/Sidebar/Sidebar";
import {
  DataGrid,
  GridCellModesModel,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import "./UserView.css";
import { Box, TextField } from "@mui/material";
import ViewUserDialog from "./ViewUserDialog/ViewUserDialog";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  phoneNum: string;
  email: string;
  type: string;
  username: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  preferredInstructor: string;
  preferredPlanes: string[];
  proficientPlaneModels: string[];
}

function UserView() {
  const [rows, setRows] = useState<User[]>([]); // Declare rows as a state variable of type User[]
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [airplaneModels, setAirplaneModels] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  const [cellModesModel, setCellModesModel] =
    React.useState<GridCellModesModel>({});

  const handleCellClick = React.useCallback(
    (params: GridCellParams, event: React.MouseEvent) => {
      setUser(params.row as User);
      setOpenEditUserDialog(true);
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
  ];

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const formattedPhoneNumber = (phoneNumber: string) => {
    const formatted =
      phoneNumber && phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    return formatted || phoneNumber;
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

      const mappedRows = users.map((user: any) => {
        return {
          id: user.id,
          lastName: user.lastName,
          firstName: user.firstName,
          phoneNum: formattedPhoneNumber(user.phoneNumber),
          email: user.email,
          type: user.type,
          username: user.username,
          address: user.address,
          emergencyContactName: user.emergencyContactName,
          emergencyContactPhone: formattedPhoneNumber(
            user.emergencyContactPhoneNumber
          ),
          preferredInstructor: user.preferredInstructor,
          preferredPlanes: user.preferredPlanes,
          proficientPlaneModels: user.proficientPlaneModels,
        };
      });
      console.log(mappedRows);

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

      setAirplaneModels(mappedPlanes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await fetch(
        "http://localhost:5201/api/user/get-current",
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => data);

      console.log(currentUser);
      setCurrentUser(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAirplaneModels();
    fetchCurrentUser();
  }, []);

  return (
    <div className="mainpage">
      <StaticSidebar />
      {currentUser.type === "instructor" ? (
        <div className="main-content">
          <div className="admin-subcontent-wrapper">
            <p className="admin-header">Current Users</p>
            <ViewUserDialog
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
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserView;
