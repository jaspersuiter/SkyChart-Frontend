import PrimaryButton from "../Buttons/PrimaryButton";
import StaticSidebar from "../Sidebar/Sidebar";
import AddNewAircraft from "./AddNewAircraft";
import InviteNewUser from "./InviteNewUser";
import { DataGrid, GridColDef, GridRowModel, GridValueGetterParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import './Admin.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
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
    const [userId, setUserId] = useState('');

    
    const updateUserType = () => {
        fetch(`http://localhost:5201/api/user/update-account-type?userId=${userId}`, {credentials: 'include', method: 'PUT'})
    }

    const processRowUpdate = (newRow: any, oldRow: any) => {
        setUserId(newRow.id);
        if (newRow.accountType !== oldRow.accountType) {
            setOpenConfirmationDialog(true);
        }
    };
      

      const handleConfirmationDialogClose = (confirmed: any) => {
        setOpenConfirmationDialog(false);
    
        if (confirmed) {
            updateUserType();
        } else {
            window.location.reload();
        }
      };
    
    const [searchQuery, setSearchQuery] = useState('');
      
    const columns: GridColDef[] = [
      {
        field: 'fullName',
        headerName: 'Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 400,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'string',
        width: 400,
        editable: false,
      },
    {
      field: 'phoneNum',
      headerName: 'Phone Number',
      type: 'string',
      width: 400,
      editable: false,
    },
    {
      field: 'accountType',
        headerName: 'Account Type',
        width: 400,
        type: 'singleSelect',
        editable: true,
        valueOptions: ['Instructor', 'Pilot'],
    },
    ];

    const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
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
  
    const fetchUsers = async () => {
        try {
            const users = await fetch('http://localhost:5201/api/user/get-all-users',
            {credentials: 'include'})
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
                }
            });

            setRows(mappedRows)
        } catch (error) {
            console.log(error);
        }
    }
    const apiUrl = env.SKYCHART_API_URL;
    const [admin, setAdmin] = React.useState(false);
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

    useEffect(() => {
        fetchUsers(); // Call fetchUsers when the component mounts
    }, []); // Empty dependency array means this effect runs once when the component mounts


    const ConfirmationDialog = () => {
        return (
          <Dialog open={openConfirmationDialog} onClose={handleConfirmationDialogClose}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
              <p>Pressing 'Yes' will save the changes to the account type.</p>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => handleConfirmationDialogClose(true)}>Yes</Button>
              <Button onClick={() => handleConfirmationDialogClose(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        );
      };

      
    return(

        <div className="mainpage">
            <StaticSidebar/>
            {admin ?(<div className="main-content">

                <div className="title">
                    <h1>Admin Page</h1>
                </div>
                
                <div className="subtitle">
                    <h2>Creation Tools</h2>

                    <div className="buttonrow">
                        <PrimaryButton text="Add New Aircraft" onClick={handleClickOpenAddAircraft}/>
                        <PrimaryButton text="Invite New User" onClick={handleClickOpenInviteUser} />
                    </div>
                </div>
                

                             
                <div className="subtitle">
                    <h2>Current Users</h2>
                    <ConfirmationDialog />
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Box className='box' sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                            <SearchIcon sx={{ mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Search..." variant="standard" 
                                value={searchQuery}
                                onChange={handleSearchChange}/>
                        </Box>
                    </div>
                    <DataGrid
                        sx={{ width: '100%', m: 2 }}
                        rows={filteredRows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 100,
                                },
                            },
                        }}
                        processRowUpdate={processRowUpdate}
                        autoHeight
                        disableRowSelectionOnClick
                    />
                </div>

                <AddNewAircraft 
                    open={open}
                    onClose={handleCloseAddAircraft}
                />

                <InviteNewUser
                    open={openInviteUser}
                    onClose={handleCloseInviteUser}
                />
            
            </div>): null}
        </div>
    );
}

export default Admin;