import PrimaryButton from "../Buttons/PrimaryButton";
import StaticSidebar from "../Sidebar/Sidebar";
import AddNewAircraft from "./AddNewAircraft";
import InviteNewUser from "./InviteNewUser";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import './Admin.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function Admin() {

    const [open, setOpenAddAircraft] = React.useState(false);
    const [openInviteUser, setOpenInviteUser] = React.useState(false);
    const [rows, setRows] = useState([]); // Declare rows as a state variable
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    
    const updateUserType = () => {
        //fetch('http://localhost:5201/api/user/update', {credentials: 'include', body: JSON.stringify({email: 'instructor@gmail.com'}), method: 'PUT'})
        console.log('updating user type');
    }

    const processRowUpdate = async (newRow: any, oldRow: any) => {
        if (newRow.accountType !== oldRow.accountType) {
          setOpenConfirmationDialog(true);
        }
      };

      const handleConfirmationDialogClose = (confirmed: any) => {
        setOpenConfirmationDialog(false);
    
        if (confirmed) {
            updateUserType();
            console.log('Saving changes to the database');
        } else {
            console.log('Reverting changes');
            setRows(rows);
        }
      };
    

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

    const fetchUsers = async () => {
        try {
            console.log('fetching users');
            const users = await fetch('http://localhost:5201/api/user/get-all-users',
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data);

            const mappedRows = users.map((user: any, index: number) => {
               
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
            <div className="main-content">
                <PrimaryButton text="Add New Aircraft" onClick={handleClickOpenAddAircraft}/>

                <AddNewAircraft 
                    open={open}
                    onClose={handleCloseAddAircraft}
                />

                <PrimaryButton text="Invite New User" onClick={handleClickOpenInviteUser} />

                <InviteNewUser
                    open={openInviteUser}
                    onClose={handleCloseInviteUser}
                />

                <ConfirmationDialog />
                <DataGrid
                    sx={{ width: '100%', m: 2 }}
                    rows={rows}
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
        </div>
    );
}

export default Admin;