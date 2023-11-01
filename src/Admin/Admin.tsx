import PrimaryButton from "../Buttons/PrimaryButton";
import StaticSidebar from "../Sidebar/Sidebar";
import AddNewAircraft from "./AddNewAircraft";
import InviteNewUser from "./InviteNewUser";
import { DataGrid, GridCellEditStopParams, GridCellEditStopReasons, GridColDef, GridRenderCellParams, GridValueGetterParams, MuiEvent, useGridApiRef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { GridRowId } from '@mui/x-data-grid';
import './Admin.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function Admin() {

    const [open, setOpenAddAircraft] = React.useState(false);
    const [openInviteUser, setOpenInviteUser] = React.useState(false);
    const [pendingChanges, setPendingChanges] = useState({
        row: null,
        newValue: null,
        oldValue: null,
      });
      const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

      const handleCellEdit = (params: GridRenderCellParams, event: MuiEvent) => {
        const { id, field, value } = params;
        const oldRow = params.row;
        const newRow = { ...oldRow, [field]: value };
        
        // Check if the "accountType" field is being edited
        if (field === 'accountType') {
          // Store the pending changes
          setPendingChanges({
            row: newRow,
            newValue: value,
            oldValue: oldRow.accountType,
          });
      
          // Open the confirmation dialog
          setConfirmationDialogOpen(true);
        } 
      };



    const handleConfirmSave = () => {
        // Apply the change and close the confirmation dialog
        const { row, newValue } = pendingChanges;
        // Update the row with the new value
        const updatedRows = [...rows];
        const rowIndex = updatedRows.findIndex((r: { id: GridRowId }) => r.id === row?.id);
        if (rowIndex !== -1) {
            updatedRows[rowIndex].accountType = newValue;
            setRows(updatedRows);
        }
        const apiRef = useGridApiRef();

        console.log('confirmed');
        setConfirmationDialogOpen(false);
    };
      
      const handleConfirmCancel = () => {
        // Discard the change and close the confirmation dialog
        console.log('cancelled');
        setConfirmationDialogOpen(false);
      };
      
      
      

    const [rows, setRows] = useState([]); // Declare rows as a state variable

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
                <Dialog open={isConfirmationDialogOpen} onClose={handleConfirmCancel}>
                    <DialogTitle>Confirm Account Type Change</DialogTitle>
                    <DialogContent>
                        Are you sure you want to change the Account Type?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmCancel} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={handleConfirmSave} color="primary">
                        Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <DataGrid
                    sx={{ width: '100%', m: 2 }}
                    rows={rows}
                    columns={columns}
                    onCellEditStop={handleCellEdit}
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
    );
}

export default Admin;