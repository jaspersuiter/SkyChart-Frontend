import StaticSidebar from '../Sidebar/Sidebar';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './Instructors.css';

function Instructors() {

    const columns: GridColDef[] = [

        {
            field: 'fullName',
            headerName: 'Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 500,
            valueGetter: (params: GridValueGetterParams) =>
              `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
          field: 'phoneNum',
          headerName: 'Phone Number',
          type: 'string',
          width: 500,
          editable: false,
        },
        {
          field: 'rating',
            headerName: 'Rating',
            width: 550,
            type: 'string',
            editable: false,
        },
      ];


      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', phoneNum: 1234567890, rating: 'CFI' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', phoneNum: 1234567890, rating: 'CFII' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', phoneNum: 1234567890, rating: 'CFI & CFII' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', phoneNum: 123456789016, rating: 'CFI' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', phoneNum: 1234567890, rating: 'CFI' },
        { id: 6, lastName: 'Melisandre', firstName: null, phoneNum: 1234567890, rating: 'CFI' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', phoneNum: 1234567890, rating: 'CFI' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', phoneNum: 1234567890, rating: 'CFI' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', phoneNum: 1234567890, rating: 'CFI' },
        { id: 1, lastName: 'Snow', firstName: 'Jon', phoneNum: 1234567890, rating: 'CFI' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', phoneNum: 1234567890, rating: 'CFII' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', phoneNum: 1234567890, rating: 'CFI & CFII' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', phoneNum: 123456789016, rating: 'CFI' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', phoneNum: 1234567890, rating: 'CFI' },
        { id: 6, lastName: 'Melisandre', firstName: null, phoneNum: 1234567890, rating: 'CFI' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', phoneNum: 1234567890, rating: 'CFI' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', phoneNum: 1234567890, rating: 'CFI' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', phoneNum: 1234567890, rating: 'CFI' },
        { id: 1, lastName: 'Snow', firstName: 'Jon', phoneNum: 1234567890, rating: 'CFI' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', phoneNum: 1234567890, rating: 'CFII' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', phoneNum: 1234567890, rating: 'CFI & CFII' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', phoneNum: 123456789016, rating: 'CFI' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', phoneNum: 1234567890, rating: 'CFI' },
        { id: 6, lastName: 'Melisandre', firstName: null, phoneNum: 1234567890, rating: 'CFI' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', phoneNum: 1234567890, rating: 'CFI' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', phoneNum: 1234567890, rating: 'CFI' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', phoneNum: 1234567890, rating: 'CFI' },

      ];

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