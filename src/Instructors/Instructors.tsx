import StaticSidebar from '../Sidebar/Sidebar';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './Instructors.css';
import { useEffect, useState } from 'react'; // Import useState
import { setRef } from '@mui/material';

function Instructors() {
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
      field: 'phoneNum',
      headerName: 'Phone Number',
      type: 'string',
      width: 400,
      editable: false,
    },
    {
      field: 'rating',
        headerName: 'Rating',
        width: 400,
        type: 'string',
        editable: false,
    },
    ];

    interface Instructor {
        lastName: string;
        firstName: string;
        phoneNum: string;
        rating: string;
    }

    const fetchInstructors = async () => {
        try {
            const instructors = await fetch('https://localhost:5201/api/Instructors/GetAllInstructors')
                .then((response) => response.json());

            // Create a new array of rows based on the instructors data
            const mappedRows = instructors.map((instructor: Instructor, index: number) => ({
                id: index + 1,
                lastName: instructor.lastName,
                firstName: instructor.firstName,
                phoneNum: instructor.phoneNum,
                rating: instructor.rating
            }));

            setRows(mappedRows); // Update the state variable with the mapped rows
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInstructors(); // Call fetchInstructors when the component mounts
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className='instructors-page'>
            <StaticSidebar />
            <div className='instructors-content'>
                <div className='instructors-top-content'>
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
                        autoHeight
                        disableRowSelectionOnClick
                    />
                </div>
            </div>
        </div>
    )
}

export default Instructors;
